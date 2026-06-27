import React, { useState } from 'react'
import { ChevronDown, Building2, Shield, MapPin, Check, Search } from 'lucide-react'
import { useOrganization, CATEGORIES } from '../context/OrganizationContext'

function EntitySelector() {
  const {
    category,
    selectedEntity,
    setSelectedId,
    currentEntities,
    isCity,
    isEuropeanCity,
    europeanCountries,
    selectedCountry,
    setSelectedCountry
  } = useOrganization()

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getAccentColor = () => {
    switch (category) {
      case CATEGORIES.BELGIAN_BANKS: return 'blue'
      case CATEGORIES.BELGIAN_INSURANCE: return 'purple'
      case CATEGORIES.EUROPEAN_CITIES: return 'green'
      case CATEGORIES.UK_CITIES: return 'indigo'
      default: return 'blue'
    }
  }

  const color = getAccentColor()

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-500' },
    green: { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-500' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-500' },
  }

  const getEntitySubtext = (entity) => {
    if (isCity) {
      const pop = entity.q1_2?.population || entity.population
      return pop ? `Pop: ${pop.toLocaleString()}` : entity.orgType || ''
    }
    return entity.headquarters || 'Belgium'
  }

  const filteredEntities = (currentEntities || []).filter(e => {
    if (!e?.id) return false
    if (!searchQuery) return true
    return e.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const Icon = isCity ? MapPin : (category === CATEGORIES.BELGIAN_INSURANCE ? Shield : Building2)

  return (
    <div className="flex items-center gap-3">
      {/* Country Filter for European Cities */}
      {isEuropeanCity && (
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Countries</option>
          {(europeanCountries || []).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      )}

      {/* Entity Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 h-10 pl-3 pr-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors min-w-[280px]`}
        >
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${colorClasses[color].bg}`}>
            <Icon className={`w-4 h-4 ${colorClasses[color].text}`} />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="font-medium text-gray-800 truncate text-sm">
              {selectedEntity?.name || 'Select entity...'}
            </p>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => { setIsOpen(false); setSearchQuery('') }} />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
              {/* Search */}
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    autoFocus
                  />
                </div>
              </div>

              {/* List */}
              <div className="max-h-[300px] overflow-y-auto p-1">
                {filteredEntities.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No results found</p>
                ) : (
                  filteredEntities.map(entity => (
                    <button
                      key={entity.id}
                      onClick={() => {
                        setSelectedId(entity.id)
                        setIsOpen(false)
                        setSearchQuery('')
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        selectedEntity?.id === entity.id
                          ? `${colorClasses[color].bg} ${colorClasses[color].text}`
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-medium text-sm truncate">{entity.name}</p>
                        <p className="text-xs text-gray-500 truncate">{getEntitySubtext(entity)}</p>
                      </div>
                      {selectedEntity?.id === entity.id && (
                        <Check className={`w-4 h-4 flex-shrink-0 ${colorClasses[color].text}`} />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EntitySelector
