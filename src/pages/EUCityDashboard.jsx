import React, { useState } from 'react'
import {
  MapPin, Users, AlertTriangle, Target, Leaf, FileText, TrendingDown,
  Building2, Thermometer, Droplets, Wind, Flame, Info,
  CheckCircle, Clock, BarChart3, Globe, Zap, Factory
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'hazards', label: 'Climate Hazards', icon: AlertTriangle },
  { id: 'emissions', label: 'Emissions', icon: Factory },
  { id: 'targets', label: 'Targets', icon: Target },
  { id: 'actions', label: 'Actions', icon: TrendingDown },
  { id: 'plans', label: 'Plans', icon: FileText },
]

const HAZARD_ICONS = {
  'Extreme heat': Thermometer,
  'River flooding': Droplets,
  'Urban flooding': Droplets,
  'Drought': Flame,
  'Storm': Wind,
  'Coastal flooding': Droplets,
  'Heavy precipitation': Droplets,
}

function StatCard({ icon: Icon, label, value, subtext, color = 'green' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    teal: 'bg-teal-50 text-teal-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  )
}

function HazardCard({ hazard }) {
  const hazardType = hazard['Climate-related hazards^'] || 'Unknown Hazard'
  const Icon = HAZARD_ICONS[hazardType] || AlertTriangle
  const probability = hazard['Current probability of hazard^'] || 'Unknown'
  const timeframe = hazard['Timeframe of expected future changes'] || ''
  const impacts = hazard['Describe the impacts on vulnerable populations and sectors'] || ''

  const probColors = {
    'High': 'bg-red-100 text-red-700',
    'Medium High': 'bg-orange-100 text-orange-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Medium Low': 'bg-blue-100 text-blue-700',
    'Low': 'bg-green-100 text-green-700'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-orange-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{hazardType}</h4>
            <p className="text-xs text-gray-500">{timeframe}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${probColors[probability] || 'bg-gray-100 text-gray-600'}`}>
          {probability}
        </span>
      </div>
      {impacts && (
        <p className="text-sm text-gray-600 line-clamp-3">{impacts}</p>
      )}
    </div>
  )
}

function TargetCard({ target }) {
  const targetType = target['Target type^'] || 'Emissions Target'
  const targetYear = target['Target year^'] || ''
  const reduction = target['Percentage of emissions reduction (including offsets and carbon dioxide removal)^'] || ''
  const baselineYear = target['Base year^'] || ''
  const isNetZero = target['Is this target a net zero target?'] === 'Yes'

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{targetType}</h4>
            <p className="text-xs text-gray-500">Target Year: {targetYear}</p>
          </div>
        </div>
        {isNetZero && (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Net Zero</span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Reduction</span>
          <span className="font-medium text-green-600">{reduction ? `${reduction}%` : 'N/A'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Baseline Year</span>
          <span className="font-medium text-gray-700">{baselineYear || 'N/A'}</span>
        </div>
      </div>
    </div>
  )
}

function ActionCard({ action }) {
  const actionName = action['Action^'] || action['Primary emissions sector addressed and action type^'] || action['Select a reference ID for the action'] || 'Climate Action'
  const sector = action['Primary emissions sector addressed and action type^'] || action['Sectors adaptation action applies to'] || ''
  const status = action['Status of action in the reporting year'] || ''
  const description = action['Action description and web link to further information^^'] || ''

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 line-clamp-2">{actionName}</h4>
          {sector && <p className="text-xs text-gray-500 line-clamp-1">{sector}</p>}
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{description}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {status && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
            {status}
          </span>
        )}
      </div>
    </div>
  )
}

function EUCityDashboard() {
  const { selectedId } = useOrganization()
  const [activeTab, setActiveTab] = useState('overview')

  const city = euCitiesFull.find(c => c.id === selectedId) || euCitiesFull[0]

  if (!city) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Select a city to view details</p>
      </div>
    )
  }

  const profile = city.profile || {}
  const population = profile.population || 0
  const area = profile.areaKm2 || 0

  const hazards = city.q2_2 || []
  const targets = city.q6_1_1 || []
  const mitigationActions = city.q9_2 || []
  const adaptationActions = city.q9_1 || []
  const plans = city.q8_1_1 || []

  const getCityEmissions = () => {
    const sectors = city.q3_1_3 || []
    let scope1 = 0, scope2 = 0, scope3 = 0
    sectors.forEach(sector => {
      scope1 += parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
      scope2 += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
      scope3 += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{city.name}</h1>
            <p className="text-white/80">{city.country} • {city.orgType}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-white/70 text-sm">
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Pop: {formatNumber(population)}
          </span>
          {area > 0 && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {formatNumber(area)} km²
            </span>
          )}
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            CDP {city.cdpRegion}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <div className="flex flex-wrap gap-2">
          {TABS.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Population" value={formatNumber(population)} color="green" />
            <StatCard icon={AlertTriangle} label="Climate Hazards" value={hazards.length} color="orange" />
            <StatCard icon={Target} label="Emissions Targets" value={targets.length} color="teal" />
            <StatCard icon={Zap} label="Climate Actions" value={mitigationActions.length + adaptationActions.length} color="blue" />
          </div>

          {emissions.total > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Factory className="w-5 h-5 text-purple-600" />
                Emissions Summary (tCO2e)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-purple-600 font-medium mb-1">Scope 1</p>
                  <p className="text-xl font-bold text-purple-700">{formatNumber(emissions.scope1)}</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-sm text-indigo-600 font-medium mb-1">Scope 2</p>
                  <p className="text-xl font-bold text-indigo-700">{formatNumber(emissions.scope2)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">Scope 3</p>
                  <p className="text-xl font-bold text-blue-700">{formatNumber(emissions.scope3)}</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">Total</p>
                  <p className="text-xl font-bold text-gray-800">{formatNumber(emissions.total)}</p>
                </div>
              </div>
            </div>
          )}

          {hazards.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Top Climate Hazards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hazards.slice(0, 4).map((h, i) => (
                  <HazardCard key={i} hazard={h} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'hazards' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">All Climate Hazards ({hazards.length})</h3>
          {hazards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hazards reported</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hazards.map((h, i) => (
                <HazardCard key={i} hazard={h} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'emissions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Emissions by Scope</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-purple-600 font-medium mb-1">Scope 1 (Direct)</p>
                <p className="text-2xl font-bold text-purple-700">{formatNumber(emissions.scope1)}</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="text-sm text-indigo-600 font-medium mb-1">Scope 2 (Grid)</p>
                <p className="text-2xl font-bold text-indigo-700">{formatNumber(emissions.scope2)}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-600 font-medium mb-1">Scope 3 (Outside)</p>
                <p className="text-2xl font-bold text-blue-700">{formatNumber(emissions.scope3)}</p>
              </div>
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-sm text-gray-600 font-medium mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(emissions.total)}</p>
              </div>
            </div>
          </div>

          {city.q3_1_3?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Emissions by Sector</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Sector</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Scope 1</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Scope 2</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Scope 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.q3_1_3.map((sector, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{sector.row_name || sector['Sector^'] || 'Unknown'}</td>
                        <td className="py-3 px-4 text-right text-purple-600">
                          {formatNumber(parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0)}
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-600">
                          {formatNumber(parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0)}
                        </td>
                        <td className="py-3 px-4 text-right text-blue-600">
                          {formatNumber(parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'targets' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Emissions Targets ({targets.length})</h3>
          {targets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No targets reported</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {targets.map((t, i) => (
                <TargetCard key={i} target={t} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="space-y-6">
          {mitigationActions.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Mitigation Actions ({mitigationActions.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mitigationActions.map((a, i) => (
                  <ActionCard key={i} action={a} />
                ))}
              </div>
            </div>
          )}

          {adaptationActions.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Adaptation Actions ({adaptationActions.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adaptationActions.map((a, i) => (
                  <ActionCard key={i} action={a} />
                ))}
              </div>
            </div>
          )}

          {mitigationActions.length === 0 && adaptationActions.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <p className="text-gray-500 text-center py-8">No actions reported</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Climate Plans ({plans.length})</h3>
          {plans.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No plans reported</p>
          ) : (
            <div className="space-y-4">
              {plans.map((plan, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{plan['Climate action plan type^'] || plan['Type of climate action plan^'] || 'Climate Plan'}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 text-gray-700">{plan['Plan status/progress towards plan'] || plan['Stage of implementation^'] || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Year Adopted:</span>
                      <span className="ml-2 text-gray-700">{plan['Year of formal approval of plan^'] || plan['Year of adoption^'] || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">End Year:</span>
                      <span className="ml-2 text-gray-700">{plan['End year of plan'] || plan['Year of implementation^'] || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EUCityDashboard
