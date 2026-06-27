import React, { useState } from 'react'
import { ChevronDown, Building2, Shield, Globe, Check, MapPin } from 'lucide-react'
import { useOrganization, CATEGORIES } from '../context/OrganizationContext'

const CATEGORY_INFO = {
  [CATEGORIES.BELGIAN_BANKS]: {
    label: 'Belgian Banks',
    icon: Building2,
    color: 'blue'
  },
  [CATEGORIES.BELGIAN_INSURANCE]: {
    label: 'Belgian Insurance',
    icon: Shield,
    color: 'purple'
  },
  [CATEGORIES.EUROPEAN_CITIES]: {
    label: 'European Cities',
    icon: Globe,
    color: 'green'
  }
}

function OrganizationSelector() {
  const {
    category,
    setCategory,
    selectedEntity,
    setSelectedId,
    currentEntities,
    isCity,
    europeanCountries,
    selectedCountry,
    setSelectedCountry
  } = useOrganization()

  const [isOpen, setIsOpen] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const categoryInfo = CATEGORY_INFO[category]
  const CategoryIcon = categoryInfo.icon

  const getColorClasses = (color, variant = 'bg') => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50', selected: 'bg-blue-50 text-blue-700' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50', selected: 'bg-purple-50 text-purple-700' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50', selected: 'bg-green-50 text-green-700' }
    }
    return colors[color][variant]
  }

  const getEntityLabel = (entity) => {
    if (isCity) {
      return `${entity.country} • Pop: ${entity.population?.toLocaleString() || 'N/A'}`
    }
    return `${entity.type === 'bank' ? 'Bank' : 'Insurance'} • ${entity.headquarters || 'Belgium'}`
  }

  const getEntityScore = (entity) => {
    if (isCity) {
      return entity.emissions?.total ? `${(entity.emissions.total / 1000000).toFixed(1)}M tCO2` : 'CDP Data'
    }
    return entity.esgScore ? `ESG: ${entity.esgScore}/10` : 'Data pending'
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Category Selector */}
      <div className="relative">
        <button
          onClick={() => setShowCategoryPicker(!showCategoryPicker)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 ${getColorClasses(categoryInfo.color, 'hover')} transition-colors`}
        >
          <CategoryIcon className={`w-4 h-4 ${getColorClasses(categoryInfo.color, 'text')}`} />
          <span className="text-sm font-medium text-gray-700">{categoryInfo.label}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {showCategoryPicker && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowCategoryPicker(false)} />
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
              {Object.entries(CATEGORY_INFO).map(([key, info]) => {
                const Icon = info.icon
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setCategory(key)
                      setShowCategoryPicker(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                      category === key ? getColorClasses(info.color, 'selected') : 'hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${getColorClasses(info.color, 'text')}`} />
                    <span className="font-medium">{info.label}</span>
                    {category === key && <Check className={`w-4 h-4 ml-auto ${getColorClasses(info.color, 'text')}`} />}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Country Filter for Cities */}
      {isCity && (
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Countries ({currentEntities?.length || 0})</option>
          {(europeanCountries || []).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      )}

      {/* Entity Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-colors min-w-[300px]"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(categoryInfo.color, 'bg')}`}>
            {isCity ? (
              <MapPin className={`w-5 h-5 ${getColorClasses(categoryInfo.color, 'text')}`} />
            ) : (
              <CategoryIcon className={`w-5 h-5 ${getColorClasses(categoryInfo.color, 'text')}`} />
            )}
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-800 truncate">{selectedEntity?.name || 'Select...'}</p>
            <p className="text-xs text-gray-500 truncate">
              {selectedEntity ? getEntityLabel(selectedEntity) : 'Choose an entity'}
            </p>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-[400px] overflow-y-auto">
              <div className="p-2">
                {(currentEntities || []).filter(e => e?.id).map(entity => (
                  <button
                    key={entity.id}
                    onClick={() => {
                      setSelectedId(entity.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedEntity?.id === entity.id
                        ? getColorClasses(categoryInfo.color, 'selected')
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(categoryInfo.color, 'bg')}`}>
                      {isCity ? (
                        <MapPin className={`w-4 h-4 ${getColorClasses(categoryInfo.color, 'text')}`} />
                      ) : (
                        <CategoryIcon className={`w-4 h-4 ${getColorClasses(categoryInfo.color, 'text')}`} />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-medium truncate">{entity.name}</p>
                      <p className="text-xs text-gray-500 truncate">{getEntityScore(entity)}</p>
                    </div>
                    {selectedEntity?.id === entity.id && (
                      <Check className={`w-4 h-4 flex-shrink-0 ${getColorClasses(categoryInfo.color, 'text')}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrganizationSelector
