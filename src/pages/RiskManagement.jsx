import React from 'react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip
} from 'recharts'
import {
  AlertTriangle, Shield, TrendingUp, Cloud, Building,
  AlertCircle, CheckCircle, Target, Activity, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

const getSeverityColor = (severity) => {
  const colors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  }
  return colors[severity] || 'bg-gray-100 text-gray-700'
}

function RiskManagement() {
  const { selectedEntity: selectedOrg, isCity } = useOrganization()

  if (isCity || !selectedOrg) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a financial entity</h3>
        <p className="text-gray-500">Switch to Belgian Banks or Insurance to view risk data</p>
      </div>
    )
  }

  const hasRiskData = selectedOrg?.scores?.risk !== null

  // Build risk categories based on available data
  const riskCategories = [
    {
      id: 'physical',
      name: 'Physical Climate Risks',
      description: 'Flood, drought, and extreme weather exposure',
      severity: 'medium',
      likelihood: 'medium',
      status: 'assessed',
      mitigations: [
        'Property-level risk mapping',
        'Insurance requirements review',
        'Portfolio exposure analysis'
      ]
    },
    {
      id: 'transition',
      name: 'Transition Risks',
      description: 'Energy price shocks, regulatory changes, stranded assets',
      severity: selectedOrg.climate?.sbtiValidated ? 'medium' : 'high',
      likelihood: 'high',
      status: selectedOrg.climate?.sbtiValidated ? 'managed' : 'in_progress',
      mitigations: selectedOrg.climate?.sbtiValidated
        ? ['SBTi validated targets', 'Scenario analysis framework', 'Green lending incentives']
        : ['Scenario analysis in development', 'Sector exposure monitoring', 'Transition plan development']
    },
    {
      id: 'regulatory',
      name: 'Regulatory Compliance',
      description: 'CSRD, SFDR, Taxonomy alignment requirements',
      severity: 'high',
      likelihood: 'certain',
      status: selectedOrg.compliance?.csrdReady ? 'managed' : 'in_progress',
      mitigations: selectedOrg.compliance?.csrdReady
        ? ['CSRD reporting ready', 'Data architecture in place', 'Third-party verification']
        : ['CSRD preparation ongoing', 'Data enhancement project', 'External advisory engaged']
    },
    {
      id: 'reputational',
      name: 'Reputational Risk',
      description: 'Greenwashing allegations, stakeholder expectations',
      severity: 'medium',
      likelihood: 'low',
      status: 'monitored',
      mitigations: [
        'Transparent reporting practices',
        'Third-party verification',
        'Stakeholder engagement'
      ]
    }
  ]

  // Radar chart data
  const radarData = [
    { subject: 'Physical Risks', A: hasRiskData ? 65 : 50, fullMark: 100 },
    { subject: 'Transition Risks', A: selectedOrg.climate?.sbtiValidated ? 75 : 45, fullMark: 100 },
    { subject: 'Regulatory', A: selectedOrg.compliance?.csrdReady ? 80 : 50, fullMark: 100 },
    { subject: 'Data Quality', A: hasRiskData ? 60 : 40, fullMark: 100 },
    { subject: 'Governance', A: selectedOrg.scores?.governance ? selectedOrg.scores.governance * 10 : 50, fullMark: 100 },
    { subject: 'Disclosure', A: selectedOrg.ratings?.cdp ? 85 : 50, fullMark: 100 }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'managed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'assessed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in_progress':
        return <Activity className="w-4 h-4 text-yellow-500" />
      case 'monitored':
        return <Target className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Risk Management</h2>
            </div>
            <p className="mt-2 text-orange-100">
              {selectedOrg.name}'s climate and environmental risk assessment
            </p>
          </div>
          <div className="text-right">
            {selectedOrg.scores?.risk !== null ? (
              <>
                <div className="text-4xl font-bold">{selectedOrg.scores.risk.toFixed(1)}/10</div>
                <span className="text-orange-200">
                  {selectedOrg.scores.risk >= 8 ? 'Strong' :
                   selectedOrg.scores.risk >= 6 ? 'Moderate' : 'Emerging'}
                </span>
              </>
            ) : (
              <span className="text-orange-200">Data Pending</span>
            )}
          </div>
        </div>
      </div>

      {/* Status Banners */}
      {selectedOrg.climate?.sbtiValidated && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">SBTi Validated Targets</p>
              <p className="text-sm text-green-700">
                Climate targets have been validated by the Science Based Targets initiative
              </p>
            </div>
          </div>
        </div>
      )}

      {!hasRiskData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Info className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Risk Assessment Data Limited</p>
              <p className="text-sm text-yellow-700">
                Detailed risk metrics pending. Upload sustainability report for complete assessment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Risk Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {riskCategories.map(risk => (
          <div key={risk.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  {risk.id === 'physical' && <Cloud className="w-5 h-5 text-orange-600" />}
                  {risk.id === 'transition' && <TrendingUp className="w-5 h-5 text-orange-600" />}
                  {risk.id === 'regulatory' && <Shield className="w-5 h-5 text-orange-600" />}
                  {risk.id === 'reputational' && <Building className="w-5 h-5 text-orange-600" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{risk.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(risk.status)}
                    <span className="text-xs text-gray-500 capitalize">{risk.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{risk.description}</p>

            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">Severity:</span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(risk.severity)}`}>
                  {risk.severity}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">Likelihood:</span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(risk.likelihood)}`}>
                  {risk.likelihood}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs font-medium text-gray-500 mb-2">Mitigations:</p>
              <ul className="space-y-1">
                {risk.mitigations.map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Radar */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Readiness Assessment</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
            <Radar
              name="Readiness %"
              dataKey="A"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.3}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-sm text-gray-500">
          Higher values indicate better preparedness and lower risk exposure
        </div>
      </div>

      {/* Ratings Summary */}
      {(selectedOrg.ratings?.sustainalytics || selectedOrg.ratings?.cdp) && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">External Risk Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedOrg.ratings?.sustainalytics && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Sustainalytics Risk Rating</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{selectedOrg.ratings.sustainalytics}</p>
                <p className="text-xs text-gray-500 mt-1">ESG Risk Assessment</p>
              </div>
            )}
            {selectedOrg.ratings?.cdp && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">CDP Climate Score</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{selectedOrg.ratings.cdp}</p>
                <p className="text-xs text-gray-500 mt-1">Climate Disclosure Rating</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RiskManagement
