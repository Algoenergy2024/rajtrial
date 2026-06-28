import React, { useState } from 'react'
import {
  MapPin, Users, AlertTriangle, Target, Leaf, FileText, TrendingDown,
  ChevronRight, Building2, Thermometer, Droplets, Wind, Flame, Info,
  CheckCircle, Clock, DollarSign, BarChart3, Globe, TreePine, Zap
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'hazards', label: 'Climate Hazards', icon: AlertTriangle },
  { id: 'emissions', label: 'Emissions', icon: Leaf },
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
}

function StatCard({ icon: Icon, label, value, subtext, color = 'amber' }) {
  const colors = {
    amber: 'bg-amber-50 text-amber-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    teal: 'bg-teal-50 text-teal-600'
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
  const Icon = HAZARD_ICONS[hazard['Climate hazards^']] || AlertTriangle
  const probColors = {
    'High': 'bg-red-100 text-red-700',
    'Medium High': 'bg-orange-100 text-orange-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Medium Low': 'bg-blue-100 text-blue-700',
    'Low': 'bg-green-100 text-green-700'
  }

  const hazardName = hazard['Climate hazards^'] || hazard.row_name || 'Unknown Hazard'
  const probability = hazard['Current probability of hazard^'] || 'Unknown'
  const timeframe = hazard['Anticipated timescale^'] || 'Timeframe not specified'
  const vulnerableGroups = hazard['Please list the groups most vulnerable to this hazard^'] || ''
  const impacts = hazard['Please describe the impacts experienced in the most recent event^'] || ''
  const populationExposed = hazard['Approximate population exposed to this hazard^'] || 'N/A'
  const futureIntensity = hazard['Anticipated future change in hazard intensity^'] || ''
  const futureFrequency = hazard['Anticipated future change in hazard frequency^'] || ''

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-amber-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{hazardName}</h4>
            <p className="text-xs text-gray-500">{timeframe}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${probColors[probability] || 'bg-gray-100 text-gray-600'}`}>
          {probability}
        </span>
      </div>

      {vulnerableGroups && (
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-1">Vulnerable Groups</p>
          <div className="flex flex-wrap gap-1">
            {vulnerableGroups.split('|').slice(0, 3).map((g, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{g.trim()}</span>
            ))}
          </div>
        </div>
      )}

      {impacts && (
        <p className="text-sm text-gray-600 line-clamp-3">{impacts}</p>
      )}

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-gray-500">Population exposed: {populationExposed}</span>
        <div className="flex items-center space-x-2">
          {futureIntensity === 'Increasing' && (
            <span className="text-red-600">↑ Intensity</span>
          )}
          {futureFrequency === 'Increasing' && (
            <span className="text-red-600">↑ Frequency</span>
          )}
        </div>
      </div>
    </div>
  )
}

function TargetCard({ target }) {
  const statusColors = {
    'Achieved': 'bg-green-100 text-green-700',
    'On track': 'bg-blue-100 text-blue-700',
    'Underway': 'bg-yellow-100 text-yellow-700',
    'Not started': 'bg-gray-100 text-gray-600'
  }

  const targetType = target['Emission reduction target type^'] || target.row_name || 'Target'
  const status = target['Status of target in reporting year^'] || 'Unknown'
  const baselineYear = target['Baseline year^'] || 'N/A'
  const targetYear = target['Target year^'] || 'N/A'
  const reductionPercent = target['Percentage of reduction target (from base year)^'] || ''
  const sector = target['Sector^'] || target.row_name || ''

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
            {targetType}
          </span>
          {sector && (
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {sector}
            </span>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500">Baseline Year</p>
          <p className="font-semibold text-gray-800">{baselineYear}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Target Year</p>
          <p className="font-semibold text-gray-800">{targetYear}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Reduction</p>
          <p className="font-semibold text-green-600">
            {reductionPercent ? `-${reductionPercent}%` : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

function ActionCard({ action }) {
  const sector = action['Sector^'] || action.row_name || 'General'
  const status = action['Status of action in reporting year^'] || 'Unknown'
  const description = action['Action description^'] || ''
  const emissionsSaved = action['Total annual emissions reduced/avoided (metric tonnes CO2e)^'] || ''
  const financeStatus = action['Current financing status^'] || ''
  const cobenefits = action['Co-benefit area^'] || ''

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
          {sector}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
          {status}
        </span>
      </div>

      {description && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        {emissionsSaved && (
          <span className="text-green-600 font-medium">
            -{parseFloat(emissionsSaved).toLocaleString()} tCO2e saved
          </span>
        )}
        {financeStatus && (
          <span>{financeStatus}</span>
        )}
      </div>

      {cobenefits && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">Co-benefits: {cobenefits.split('|').slice(0, 2).join(', ')}</p>
        </div>
      )}
    </div>
  )
}

function UKWWCityDashboard() {
  const { selectedEntity, isUKWWCity, selectedId } = useOrganization()
  const [activeTab, setActiveTab] = useState('overview')

  const ukwwCities = euCitiesFull.filter(c => UKWW_COUNTRIES.includes(c.country))
  const city = ukwwCities.find(c => c.id === selectedId) || selectedEntity

  if (!isUKWWCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UKWW city</h3>
        <p className="text-gray-500">Choose "UKWW" from the category dropdown</p>
      </div>
    )
  }

  const profile = city.profile || {}
  const hazards = city.q2_2 || []
  const targets = city.q6_1_1 || []
  const mitigationActions = city.q9_1 || []
  const adaptationActions = city.q9_2 || []
  const actions = [...mitigationActions, ...adaptationActions]
  const plans = city.q5_1 || []
  const sectors = city.q3_1_3 || []

  const formatNumber = (num) => num?.toLocaleString() || 'N/A'

  const getCityEmissions = () => {
    let scope1 = 0, scope2 = 0, scope3 = 0
    sectors.forEach(sector => {
      scope1 += parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
      scope2 += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
      scope3 += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
    })
    return { scope1, scope2, scope3, total: scope1 + scope2 + scope3 }
  }

  const emissions = getCityEmissions()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{city.name}</h1>
              <p className="text-white/80">{city.orgType} • {city.country}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{formatNumber(profile.population)}</p>
            <p className="text-white/80">Population ({profile.populationYear || 'N/A'})</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'hazards' && hazards.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs">
                    {hazards.length}
                  </span>
                )}
                {tab.id === 'targets' && targets.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded-full text-xs">
                    {targets.length}
                  </span>
                )}
                {tab.id === 'actions' && actions.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-teal-100 text-teal-600 rounded-full text-xs">
                    {actions.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <StatCard
                icon={Users}
                label="Population"
                value={formatNumber(profile.population)}
                subtext={`Year: ${profile.populationYear || 'N/A'}`}
                color="amber"
              />
              <StatCard
                icon={Building2}
                label="Area"
                value={profile.areaKm2 ? `${formatNumber(profile.areaKm2)} km²` : 'N/A'}
                color="orange"
              />
              <StatCard
                icon={AlertTriangle}
                label="Climate Hazards"
                value={hazards.length}
                subtext="Identified risks"
                color="orange"
              />
              <StatCard
                icon={Target}
                label="Targets"
                value={targets.length}
                subtext="Emission reduction"
                color="purple"
              />
              <StatCard
                icon={TrendingDown}
                label="Actions"
                value={actions.length}
                subtext="Mitigation measures"
                color="teal"
              />
              <StatCard
                icon={FileText}
                label="Plans"
                value={plans.length}
                subtext="Climate strategies"
                color="green"
              />
            </div>

            {/* Quick Overview Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Hazards */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                    Top Climate Hazards
                  </h3>
                  <button
                    onClick={() => setActiveTab('hazards')}
                    className="text-sm text-amber-600 hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {hazards.slice(0, 3).map((hazard, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">{hazard['Climate hazards^'] || hazard.row_name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{hazard['Current probability of hazard^']}</span>
                    </div>
                  ))}
                  {hazards.length === 0 && (
                    <p className="text-gray-500 text-sm">No hazard data reported</p>
                  )}
                </div>
              </div>

              {/* Key Targets */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-purple-500" />
                    Emission Targets
                  </h3>
                  <button
                    onClick={() => setActiveTab('targets')}
                    className="text-sm text-amber-600 hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {targets.slice(0, 3).map((target, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">{target['Emission reduction target type^'] || target.row_name}</span>
                        <span className="text-green-600 font-semibold">
                          {target['Percentage of reduction target (from base year)^'] ? `-${target['Percentage of reduction target (from base year)^']}%` : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        By {target['Target year^'] || 'N/A'} (baseline: {target['Baseline year^'] || 'N/A'})
                      </p>
                    </div>
                  ))}
                  {targets.length === 0 && (
                    <p className="text-gray-500 text-sm">No targets reported</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Info className="w-4 h-4 mr-2 text-amber-500" />
                Jurisdiction Profile
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Admin Boundary</p>
                  <p className="font-medium text-gray-800">{profile.adminBoundary || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ecosystem Coverage</p>
                  <p className="font-medium text-gray-800">{profile.ecosystemPercentage || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CRF Reporting Level</p>
                  <p className="font-medium text-gray-800">{profile.crfLevel || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Projected Population ({profile.projectedYear || 'N/A'})</p>
                  <p className="font-medium text-gray-800">{formatNumber(profile.projectedPopulation)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hazards Tab */}
        {activeTab === 'hazards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Climate Hazards ({hazards.length})
              </h3>
            </div>
            {hazards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hazards.map((hazard, idx) => (
                  <HazardCard key={idx} hazard={hazard} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No climate hazard data reported</p>
              </div>
            )}
          </div>
        )}

        {/* Emissions Tab */}
        {activeTab === 'emissions' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Emissions Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-xs text-amber-600 mb-1">Scope 1 (Direct)</p>
                  <p className="text-xl font-bold text-amber-700">{formatNumber(Math.round(emissions.scope1))}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-xs text-orange-600 mb-1">Scope 2 (Grid)</p>
                  <p className="text-xl font-bold text-orange-700">{formatNumber(Math.round(emissions.scope2))}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-xs text-yellow-600 mb-1">Scope 3 (Outside)</p>
                  <p className="text-xl font-bold text-yellow-700">{formatNumber(Math.round(emissions.scope3))}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Total</p>
                  <p className="text-xl font-bold text-gray-800">{formatNumber(Math.round(emissions.total))}</p>
                </div>
              </div>

              {sectors.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium text-gray-600">Sector</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Scope 1</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Scope 2</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Scope 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectors.map((sector, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 px-3 font-medium text-gray-800">{sector.row_name || 'Unknown'}</td>
                          <td className="py-2 px-3 text-right text-gray-600">
                            {formatNumber(Math.round(parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0))}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-600">
                            {formatNumber(Math.round(parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0))}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-600">
                            {formatNumber(Math.round(parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No detailed emissions data available</p>
              )}
            </div>
          </div>
        )}

        {/* Targets Tab */}
        {activeTab === 'targets' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Emission Reduction Targets ({targets.length})
            </h3>
            {targets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targets.map((target, idx) => (
                  <TargetCard key={idx} target={target} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No targets reported</p>
              </div>
            )}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Climate Actions ({actions.length})
            </h3>
            {actions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {actions.map((action, idx) => (
                  <ActionCard key={idx} action={action} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <TrendingDown className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No climate actions reported</p>
              </div>
            )}
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Climate Action Plans ({plans.length})
            </h3>
            {plans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                        {plan['Climate action plan type^'] || plan.row_name || 'Climate Plan'}
                      </span>
                      {plan['Year of adoption^'] && (
                        <span className="text-sm text-gray-500">Adopted: {plan['Year of adoption^']}</span>
                      )}
                    </div>
                    {plan['Name of plan^'] && (
                      <p className="font-medium text-gray-800 mb-2">{plan['Name of plan^']}</p>
                    )}
                    {plan['Sectors covered by action plan^'] && (
                      <p className="text-sm text-gray-600">Sectors: {plan['Sectors covered by action plan^']}</p>
                    )}
                    {plan['Does plan include an emissions target?^'] && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span>Emissions target: {plan['Does plan include an emissions target?^']}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No climate plans reported</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Data Source Footer */}
      <div className="bg-amber-50 rounded-lg p-4 text-sm text-amber-700">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 mt-0.5 text-amber-600" />
          <div>
            <span className="font-medium">Data Source:</span> CDP 2025 Full Cities Public Data (UKWW Region)
            <br />
            <span className="text-amber-600">
              CDP Number: {city.cdpNumber} • Country: {city.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UKWWCityDashboard
