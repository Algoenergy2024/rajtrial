import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import {
  AlertTriangle, Shield, TrendingUp, Cloud, Thermometer, Building,
  AlertCircle, CheckCircle, Target, Activity
} from 'lucide-react'
import { impactDimensions, criticalGaps } from '../data/esgData'

const riskDimension = impactDimensions.find(d => d.id === 'risk')

const riskCategories = [
  {
    id: 'physical',
    name: 'Physical Climate Risks',
    description: 'Flood, drought, and extreme weather exposure on mortgaged properties',
    severity: 'medium',
    likelihood: 'medium',
    status: 'assessed',
    mitigations: [
      'Property-level risk mapping initiated',
      'Insurance requirements reviewed',
      'Portfolio exposure analysis ongoing'
    ]
  },
  {
    id: 'transition',
    name: 'Transition Risks',
    description: 'Energy price shocks, regulatory changes, and stranded assets',
    severity: 'high',
    likelihood: 'high',
    status: 'in_progress',
    mitigations: [
      'Scenario analysis framework developed',
      'Sector-specific exposure monitoring',
      'Green lending incentives active'
    ]
  },
  {
    id: 'regulatory',
    name: 'Regulatory Compliance',
    description: 'CSRD, SFDR, Taxonomy alignment requirements',
    severity: 'high',
    likelihood: 'certain',
    status: 'in_progress',
    mitigations: [
      'CSRD preparation project launched',
      'Data architecture enhancement',
      'External advisory engaged'
    ]
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
      'Stakeholder communication plan'
    ]
  }
]

const riskMatrixData = [
  { category: 'Physical', impact: 6, likelihood: 5 },
  { category: 'Transition', impact: 8, likelihood: 7 },
  { category: 'Regulatory', impact: 7, likelihood: 9 },
  { category: 'Reputational', impact: 5, likelihood: 3 },
  { category: 'Operational', impact: 4, likelihood: 4 }
]

const radarData = [
  { subject: 'Physical Risks', A: 65, fullMark: 100 },
  { subject: 'Transition Risks', A: 45, fullMark: 100 },
  { subject: 'Regulatory', A: 70, fullMark: 100 },
  { subject: 'Data Quality', A: 50, fullMark: 100 },
  { subject: 'Governance', A: 85, fullMark: 100 },
  { subject: 'Portfolio Diversification', A: 40, fullMark: 100 }
]

const portfolioExposure = [
  { sector: 'Residential Mortgages', exposure: 72.5, risk: 'medium' },
  { sector: 'Commercial Property', exposure: 12.3, risk: 'high' },
  { sector: 'Agricultural Lending', exposure: 8.2, risk: 'medium' },
  { sector: 'Consumer Loans', exposure: 4.5, risk: 'low' },
  { sector: 'Green Financing', exposure: 2.5, risk: 'low' }
]

const getSeverityColor = (severity) => {
  const colors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
    certain: 'bg-red-100 text-red-700'
  }
  return colors[severity] || 'bg-gray-100 text-gray-700'
}

const getStatusIcon = (status) => {
  switch (status) {
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

function RiskManagement() {
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
              Climate and environmental risk assessment and mitigation
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{riskDimension.score}/10</div>
            <span className="text-orange-200">{riskDimension.assessment}</span>
          </div>
        </div>
      </div>

      {/* Risk Status Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">First Climate Risk Assessment Completed in 2023</p>
            <p className="text-sm text-yellow-700">
              Framework established with quantitative + qualitative approach. ECB compliance achieved.
            </p>
          </div>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Radar */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Readiness Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Radar
                name="Readiness"
                dataKey="A"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.3}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Exposure */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Concentration Risk</h3>
          <div className="space-y-4">
            {portfolioExposure.map((sector, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{sector.sector}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(sector.risk)}`}>
                      {sector.risk} risk
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{sector.exposure}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      sector.risk === 'high' ? 'bg-red-500' :
                      sector.risk === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${sector.exposure}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> 72.5% concentration in residential mortgages presents transition risk exposure
            </p>
          </div>
        </div>
      </div>

      {/* Related Critical Gaps */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk-Related Gaps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalGaps.filter(g => g.category === 'Portfolio' || g.id === 'scope3').map(gap => (
            <div key={gap.id} className={`p-4 rounded-lg border ${
              gap.severity === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
            }`}>
              <div className="flex items-start space-x-3">
                <AlertTriangle className={`w-5 h-5 ${
                  gap.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <div>
                  <h4 className="font-medium text-gray-800">{gap.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{gap.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RiskManagement
