import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  Leaf, Zap, Car, Sun, TrendingDown, AlertCircle, CheckCircle2, Target, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']

function ClimateAction() {
  const { selectedEntity: selectedOrg, isCity } = useOrganization()

  if (isCity || !selectedOrg) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a financial entity</h3>
        <p className="text-gray-500">Switch to Belgian Banks or Insurance to view climate data</p>
      </div>
    )
  }

  const hasClimateData = selectedOrg?.scores?.climate !== null

  // Build initiatives from available data
  const initiatives = []

  if (selectedOrg.climate?.greenBonds) {
    initiatives.push({
      id: 'green_bonds',
      title: 'Green Bond Issuance',
      value: `€${(selectedOrg.climate.greenBonds / 1000000).toFixed(0)}M`,
      description: 'Financing for sustainable projects and green initiatives',
      icon: Leaf,
      color: '#10B981'
    })
  }

  if (selectedOrg.climate?.evFleetPercentage) {
    initiatives.push({
      id: 'ev_policy',
      title: 'Electric Vehicle Policy',
      value: `${selectedOrg.climate.evFleetPercentage}%`,
      description: 'Company vehicle fleet electrification',
      icon: Car,
      color: '#3B82F6'
    })
  }

  if (selectedOrg.climate?.renewableEnergy) {
    const isPercentage = selectedOrg.climate.renewableEnergy <= 100
    initiatives.push({
      id: 'renewable',
      title: isPercentage ? 'Renewable Energy' : 'Solar Capacity',
      value: isPercentage ? `${selectedOrg.climate.renewableEnergy}%` : `${selectedOrg.climate.renewableEnergy} kW`,
      description: isPercentage ? 'Electricity from renewable sources' : 'Solar panel installation capacity',
      icon: Sun,
      color: '#F59E0B'
    })
  }

  if (selectedOrg.climate?.emissionsReductionTarget) {
    initiatives.push({
      id: 'target',
      title: 'Emissions Target',
      value: `-${selectedOrg.climate.emissionsReductionTarget.value}%`,
      description: `By ${selectedOrg.climate.emissionsReductionTarget.year}${selectedOrg.climate.emissionsReductionTarget.baseline ? ` vs ${selectedOrg.climate.emissionsReductionTarget.baseline}` : ''}`,
      icon: Target,
      color: '#8B5CF6'
    })
  }

  // Scope 3 categories status
  const scope3Categories = [
    {
      name: 'Financed Emissions',
      status: selectedOrg.emissions?.scope3?.status === 'calculated' ? 'Calculated' : 'In Progress',
      completion: selectedOrg.emissions?.scope3?.status === 'calculated' ? 100 : 25
    },
    { name: 'Business Travel', status: 'Measured', completion: 100 },
    { name: 'Employee Commuting', status: 'Estimated', completion: 60 },
    { name: 'Supply Chain', status: 'In Progress', completion: 30 }
  ]

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Climate Action</h2>
            </div>
            <p className="mt-2 text-green-100">
              {selectedOrg.name}'s environmental impact and carbon reduction initiatives
            </p>
          </div>
          <div className="text-right">
            {selectedOrg.scores?.climate !== null ? (
              <>
                <div className="text-4xl font-bold">{selectedOrg.scores.climate.toFixed(1)}/10</div>
                <span className="text-green-200">
                  {selectedOrg.scores.climate >= 8 ? 'Strong' :
                   selectedOrg.scores.climate >= 6 ? 'Moderate' : 'Developing'}
                </span>
              </>
            ) : (
              <span className="text-green-200">Data Pending</span>
            )}
          </div>
        </div>
      </div>

      {/* CDP Score Banner (if available) */}
      {selectedOrg.climate?.cdpScore && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-green-700">{selectedOrg.climate.cdpScore}</span>
            </div>
            <div>
              <p className="font-medium text-green-800">CDP Climate Score: {selectedOrg.climate.cdpScore}</p>
              <p className="text-sm text-green-700">
                {selectedOrg.climate.cdpScore === 'A' ? 'Leadership level - implementing best practices' :
                 selectedOrg.climate.cdpScore === 'A-' ? 'Leadership level' :
                 'Taking coordinated action on climate issues'}
              </p>
            </div>
            {selectedOrg.climate.sbtiValidated && (
              <div className="ml-auto px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                SBTi Validated
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Initiatives */}
      {initiatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {initiatives.map(initiative => {
            const Icon = initiative.icon
            return (
              <div key={initiative.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 metric-card">
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${initiative.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: initiative.color }} />
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Active
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">{initiative.title}</h3>
                  <p className="text-2xl font-bold mt-1" style={{ color: initiative.color }}>
                    {initiative.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{initiative.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <Info className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h4 className="font-medium text-yellow-800">Climate Initiative Data Pending</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Upload {selectedOrg.name}'s sustainability report to view detailed climate initiatives.
          </p>
        </div>
      )}

      {/* Emissions Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scope 1 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scope 1 Emissions</h3>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {selectedOrg.emissions?.scope1?.value?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">tCO2e</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Typical Sources:</p>
            {['Company vehicles', 'Natural gas heating', 'Refrigerants'].map((source, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                {source}
              </div>
            ))}
          </div>
        </div>

        {/* Scope 2 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scope 2 Emissions</h3>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {selectedOrg.emissions?.scope2?.value?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">tCO2e</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Typical Sources:</p>
            {['Purchased electricity', 'District heating'].map((source, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                {source}
              </div>
            ))}
          </div>
        </div>

        {/* Scope 3 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scope 3 Progress</h3>
          <div className="flex items-center mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm text-yellow-700">
              {selectedOrg.emissions?.scope3?.status === 'calculated' ? 'Calculated' : 'Partially Quantified'}
            </span>
          </div>
          <div className="space-y-3">
            {scope3Categories.map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{cat.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    cat.completion === 100 ? 'bg-green-100 text-green-700' :
                    cat.completion > 0 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {cat.status}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      cat.completion === 100 ? 'bg-green-500' :
                      cat.completion > 0 ? 'bg-yellow-500' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${cat.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Net Zero Commitment */}
      {selectedOrg.climate?.netZeroTarget && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800">Net Zero Commitment</h3>
              <p className="text-sm text-green-600 mt-1">
                {selectedOrg.name} has committed to achieving net-zero emissions
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-700">{selectedOrg.climate.netZeroTarget}</p>
              <p className="text-xs text-green-600">Target Year</p>
            </div>
          </div>
          {selectedOrg.climate.sbtiValidated && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-green-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>Targets validated by Science Based Targets initiative (SBTi)</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ClimateAction
