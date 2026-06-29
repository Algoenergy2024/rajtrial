import React, { useState } from 'react'
import {
  Globe, MapPin, Users, AlertTriangle, Target, Factory,
  FileText, Zap, Shield, TrendingDown, ChevronRight, Building2
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaCityDashboard() {
  const { selectedId, isNorthAmericaCity } = useOrganization()
  const [activeTab, setActiveTab] = useState('overview')

  const city = northAmericaCitiesFull.find(c => c.id === selectedId) || northAmericaCitiesFull[0]

  if (!isNorthAmericaCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a North America city</h3>
        <p className="text-gray-500">Use the dropdown above to select a city</p>
      </div>
    )
  }

  const population = city.profile?.population || 0
  const populationYear = city.profile?.populationYear || ''

  const getCityEmissions = () => {
    const sectors = city.q3_1_3 || []
    let scope1 = 0, scope2 = 0, scope3 = 0
    sectors.forEach(sector => {
      scope1 += parseFloat(sector['Direct emissions (metric tonnes CO2e)^^']) || 0
      scope2 += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^^']) || 0
      scope3 += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)^']) || 0
    })
    return { scope1, scope2, scope3, total: scope1 + scope2 + scope3 }
  }

  const emissions = getCityEmissions()

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K'
    return num?.toLocaleString() || '0'
  }

  const stats = {
    hazards: city.q2_2?.length || 0,
    targets: city.q6_1_1?.length || 0,
    mitigationActions: city.q9_1?.length || 0,
    adaptationActions: city.q9_2?.length || 0,
    plans: city.q8_1_1?.length || 0,
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'hazards', label: 'Hazards', icon: AlertTriangle, count: stats.hazards },
    { id: 'targets', label: 'Targets', icon: Target, count: stats.targets },
    { id: 'actions', label: 'Actions', icon: Zap, count: stats.mitigationActions + stats.adaptationActions },
  ]

  const StatCard = ({ icon: Icon, label, value, color = 'sky' }) => (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    </div>
  )

  const HazardCard = ({ hazard }) => {
    const type = hazard['Climate hazards^'] || hazard.row_name || 'Unknown'
    const probability = hazard['Current probability of hazard^'] || ''
    const magnitude = hazard['Current magnitude of hazard^'] || ''
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">{type}</span>
        <div className="mt-3 space-y-1 text-sm">
          {probability && <p className="text-gray-600">Probability: <span className="font-medium">{probability}</span></p>}
          {magnitude && <p className="text-gray-600">Magnitude: <span className="font-medium">{magnitude}</span></p>}
        </div>
      </div>
    )
  }

  const TargetCard = ({ target }) => {
    const type = target['Target type^'] || target['Sector^'] || 'Emission Target'
    const reduction = target['Percentage of reduction target^'] || target['Percentage reduction target^'] || ''
    const targetYear = target['Target year^'] || ''
    const status = target['Status of target^'] || ''
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs font-medium">{type}</span>
          {status && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{status}</span>}
        </div>
        <div className="space-y-1 text-sm">
          {reduction && (
            <div className="flex items-center text-green-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="font-medium">{reduction}% reduction</span>
            </div>
          )}
          {targetYear && <p className="text-gray-600">Target year: {targetYear}</p>}
        </div>
      </div>
    )
  }

  const ActionCard = ({ action, type }) => {
    const sector = action['Sector^'] || action.row_name || 'General'
    const status = action['Status of action in reporting year^'] || ''
    const description = action['Action description^'] || ''
    const colorClass = type === 'mitigation' ? 'sky' : 'blue'
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-2">
          <span className={`px-2 py-1 bg-${colorClass}-100 text-${colorClass}-700 rounded text-xs font-medium`}>{sector}</span>
          {status && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{status}</span>}
        </div>
        {description && <p className="text-sm text-gray-700 line-clamp-3">{description}</p>}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <MapPin className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{city.name}</h1>
            <p className="text-white/80">{city.country} • {city.orgType || 'City'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Population: {formatNumber(population)}{populationYear && ` (${populationYear})`}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={AlertTriangle} label="Climate Hazards" value={stats.hazards} color="red" />
                <StatCard icon={Target} label="Emission Targets" value={stats.targets} color="green" />
                <StatCard icon={Zap} label="Climate Actions" value={stats.mitigationActions + stats.adaptationActions} color="sky" />
                <StatCard icon={FileText} label="Action Plans" value={stats.plans} color="blue" />
              </div>

              {/* Emissions */}
              {emissions.total > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Factory className="w-5 h-5 text-sky-600" />
                    Emissions Inventory (tCO2e)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-sky-50 rounded-xl p-4">
                      <p className="text-sm text-sky-600 font-medium mb-1">Scope 1</p>
                      <p className="text-xl font-bold text-sky-700">{formatNumber(emissions.scope1)}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-blue-600 font-medium mb-1">Scope 2</p>
                      <p className="text-xl font-bold text-blue-700">{formatNumber(emissions.scope2)}</p>
                    </div>
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <p className="text-sm text-cyan-600 font-medium mb-1">Scope 3</p>
                      <p className="text-xl font-bold text-cyan-700">{formatNumber(emissions.scope3)}</p>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4">
                      <p className="text-sm text-gray-600 font-medium mb-1">Total</p>
                      <p className="text-xl font-bold text-gray-800">{formatNumber(emissions.total)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hazards Tab */}
          {activeTab === 'hazards' && (
            <div>
              {stats.hazards > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(city.q2_2 || []).map((hazard, idx) => (
                    <HazardCard key={idx} hazard={hazard} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No climate hazards reported</p>
              )}
            </div>
          )}

          {/* Targets Tab */}
          {activeTab === 'targets' && (
            <div>
              {stats.targets > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(city.q6_1_1 || []).map((target, idx) => (
                    <TargetCard key={idx} target={target} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No emission reduction targets reported</p>
              )}
            </div>
          )}

          {/* Actions Tab */}
          {activeTab === 'actions' && (
            <div className="space-y-6">
              {stats.mitigationActions > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-sky-600" />
                    Mitigation Actions ({stats.mitigationActions})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(city.q9_1 || []).slice(0, 6).map((action, idx) => (
                      <ActionCard key={idx} action={action} type="mitigation" />
                    ))}
                  </div>
                </div>
              )}
              {stats.adaptationActions > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    Adaptation Actions ({stats.adaptationActions})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(city.q9_2 || []).slice(0, 6).map((action, idx) => (
                      <ActionCard key={idx} action={action} type="adaptation" />
                    ))}
                  </div>
                </div>
              )}
              {stats.mitigationActions === 0 && stats.adaptationActions === 0 && (
                <p className="text-gray-500 text-center py-8">No climate actions reported</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NorthAmericaCityDashboard
