import React, { useState } from 'react'
import {
  MapPin, Users, AlertTriangle, Target, Leaf, FileText, TrendingDown,
  ChevronRight, Building2, Thermometer, Droplets, Wind, Flame, Info,
  CheckCircle, Clock, DollarSign, BarChart3, Globe, TreePine, Zap
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

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

function StatCard({ icon: Icon, label, value, subtext, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
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
  const Icon = HAZARD_ICONS[hazard.hazard] || AlertTriangle
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
            <h4 className="font-semibold text-gray-800">{hazard.hazard || 'Unknown Hazard'}</h4>
            <p className="text-xs text-gray-500">{hazard.timeframe || 'Timeframe not specified'}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${probColors[hazard.currentProbability] || 'bg-gray-100 text-gray-600'}`}>
          {hazard.currentProbability || 'Unknown'}
        </span>
      </div>

      {hazard.vulnerableGroups && (
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-1">Vulnerable Groups</p>
          <div className="flex flex-wrap gap-1">
            {hazard.vulnerableGroups.split('|').slice(0, 3).map((g, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{g}</span>
            ))}
          </div>
        </div>
      )}

      {hazard.impacts && (
        <p className="text-sm text-gray-600 line-clamp-3">{hazard.impacts}</p>
      )}

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-gray-500">Population exposed: {hazard.populationExposed || 'N/A'}</span>
        <div className="flex items-center space-x-2">
          {hazard.futureIntensity === 'Increasing' && (
            <span className="text-red-600">↑ Intensity</span>
          )}
          {hazard.futureFrequency === 'Increasing' && (
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
            {target.targetType || 'Target'}
          </span>
          {target.sector && (
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {target.sector}
            </span>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[target.status] || 'bg-gray-100 text-gray-600'}`}>
          {target.status || 'Status unknown'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500">Baseline Year</p>
          <p className="font-semibold text-gray-800">{target.baselineYear || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Target Year</p>
          <p className="font-semibold text-gray-800">{target.targetYear || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Reduction</p>
          <p className="font-semibold text-green-600">
            {target.reductionPercent ? `-${target.reductionPercent}%` : 'N/A'}
          </p>
        </div>
      </div>

      {target.baselineEmissions && (
        <div className="text-xs text-gray-500">
          Baseline: {target.baselineEmissions.toLocaleString()} tCO2e
          {target.targetEmissions && ` → Target: ${target.targetEmissions.toLocaleString()} tCO2e`}
        </div>
      )}
    </div>
  )
}

function ActionCard({ action }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
          {action.sector || 'General'}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
          {action.status || 'Unknown'}
        </span>
      </div>

      {action.description && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{action.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        {action.emissionsSaved && (
          <span className="text-green-600 font-medium">
            -{action.emissionsSaved.toLocaleString()} tCO2e saved
          </span>
        )}
        {action.financeStatus && (
          <span>{action.financeStatus}</span>
        )}
      </div>

      {action.cobenefits && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">Co-benefits: {action.cobenefits.split('|').slice(0, 2).join(', ')}</p>
        </div>
      )}
    </div>
  )
}

function UKCityDashboard() {
  const { selectedEntity, isUKCity } = useOrganization()
  const [activeTab, setActiveTab] = useState('overview')

  if (!isUKCity || !selectedEntity) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UK city</h3>
        <p className="text-gray-500">Choose "UK Cities" from the category dropdown</p>
      </div>
    )
  }

  const city = selectedEntity
  const profile = city.profile || {}
  const hazards = city.hazards || []
  const emissions = city.emissions || {}
  const targets = city.targets || []
  const actions = city.actions || []
  const plans = city.plans || []

  const formatNumber = (num) => num?.toLocaleString() || 'N/A'

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{city.name}</h1>
              <p className="text-white/80">{city.orgType} • CDP Region: {city.cdpRegion}</p>
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
                    ? 'bg-indigo-100 text-indigo-700'
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
                  <span className="ml-1 px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
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
                color="blue"
              />
              <StatCard
                icon={Building2}
                label="Area"
                value={profile.areaKm2 ? `${formatNumber(profile.areaKm2)} km²` : 'N/A'}
                color="purple"
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
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {hazards.slice(0, 3).map((hazard, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">{hazard.hazard}</span>
                      </div>
                      <span className="text-sm text-gray-500">{hazard.currentProbability}</span>
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
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {targets.slice(0, 3).map((target, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">{target.targetType}</span>
                        <span className="text-green-600 font-semibold">
                          {target.reductionPercent ? `-${target.reductionPercent}%` : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        By {target.targetYear || 'N/A'} (baseline: {target.baselineYear || 'N/A'})
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
                <Info className="w-4 h-4 mr-2 text-blue-500" />
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
              <h3 className="font-semibold text-gray-800 mb-4">Emissions Inventory</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Inventory Year</p>
                  <p className="font-semibold text-gray-800">{emissions.inventoryYear || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Protocol</p>
                  <p className="font-semibold text-gray-800 text-sm">{emissions.protocol || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Boundary</p>
                  <p className="font-semibold text-gray-800 text-sm">{emissions.boundary || 'N/A'}</p>
                </div>
              </div>

              {emissions.scopes && emissions.scopes.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600">Emissions by Scope</h4>
                  {emissions.scopes.map((scope, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{scope.scope}</span>
                      <span className="font-semibold text-gray-800">
                        {scope.emissions?.toLocaleString()} tCO2e
                      </span>
                    </div>
                  ))}
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
              Mitigation Actions ({actions.length})
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
                <p className="text-gray-500">No mitigation actions reported</p>
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
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {plan.planType || 'Climate Plan'}
                      </span>
                      {plan.yearAdopted && (
                        <span className="text-sm text-gray-500">Adopted: {plan.yearAdopted}</span>
                      )}
                    </div>
                    {plan.planName && (
                      <p className="font-medium text-gray-800 mb-2">{plan.planName}</p>
                    )}
                    {plan.sectors && (
                      <p className="text-sm text-gray-600">Sectors: {plan.sectors}</p>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                      {plan.emissionsTarget && <span>Target: {plan.emissionsTarget}</span>}
                    </div>
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
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 mt-0.5 text-gray-400" />
          <div>
            <span className="font-medium">Data Source:</span> CDP 2025 Full Cities Public Data
            <br />
            <span className="text-gray-500">
              CDP Number: {city.cdpNumber} • Questions: Q1-Q9
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UKCityDashboard
