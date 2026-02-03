import React from 'react'
import {
  Building2, Users, Target, Shield, CheckCircle, AlertTriangle,
  TrendingUp, FileText, Calendar
} from 'lucide-react'
import { impactDimensions, companyProfile } from '../data/esgData'

const governanceDimension = impactDimensions.find(d => d.id === 'governance')

const governanceStructure = [
  {
    level: 'Board of Directors',
    description: 'Strategic oversight and ESG policy approval',
    members: 12,
    diversity: '25% female',
    meetings: 'Monthly'
  },
  {
    level: 'Management Committee',
    description: 'Executive implementation of ESG strategy',
    members: 6,
    diversity: '0% female',
    meetings: 'Weekly'
  },
  {
    level: 'ESG Office',
    description: 'Dedicated sustainability coordination team',
    members: 4,
    diversity: '50% female',
    meetings: 'Daily operations'
  }
]

const keyPositions = [
  {
    role: 'Chief Cooperative Bank Officer',
    responsibility: 'ESG strategic direction and stakeholder engagement',
    status: 'Filled',
    since: 'Sept 2023'
  },
  {
    role: 'ESG Manager',
    responsibility: 'Day-to-day ESG operations and reporting',
    status: 'Filled',
    since: 'Sept 2023'
  },
  {
    role: 'Chief Risk Officer',
    responsibility: 'Climate and environmental risk integration',
    status: 'Filled',
    since: '2021'
  }
]

const policyFramework = [
  { name: 'Environmental Policy', status: 'active', lastReview: '2023' },
  { name: 'Social Responsibility Policy', status: 'active', lastReview: '2023' },
  { name: 'Ethics & Conduct Code', status: 'active', lastReview: '2022' },
  { name: 'Supplier Due Diligence', status: 'in_development', lastReview: 'N/A' },
  { name: 'Human Rights Policy', status: 'in_development', lastReview: 'N/A' },
  { name: 'Climate Transition Plan', status: 'in_development', lastReview: 'N/A' }
]

const shareholderEngagement = {
  totalShareholders: 284000,
  engagementMethods: [
    'Annual General Meeting',
    'Quarterly newsletters',
    'Regional cooperative meetings',
    'Digital feedback platform'
  ],
  recentInitiatives: [
    'ESG survey sent to all shareholders',
    'Sustainability webinars launched',
    'Cooperative values communication campaign'
  ]
}

function Governance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Governance</h2>
            </div>
            <p className="mt-2 text-blue-100">
              ESG governance structure, accountability, and stakeholder engagement
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{governanceDimension.score}/10</div>
            <span className="text-blue-200">{governanceDimension.assessment}</span>
          </div>
        </div>
      </div>

      {/* Governance Structure */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Governance Structure</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {governanceStructure.map((level, idx) => (
            <div key={idx} className="p-5 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">{level.level}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">{level.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Members</span>
                  <span className="font-medium text-gray-800">{level.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Diversity</span>
                  <span className={`font-medium ${
                    level.diversity.includes('0%') ? 'text-red-600' : 'text-gray-800'
                  }`}>{level.diversity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Meetings</span>
                  <span className="font-medium text-gray-800">{level.meetings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Positions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key ESG Positions</h3>
          <div className="space-y-4">
            {keyPositions.map((position, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{position.role}</h4>
                    <p className="text-sm text-gray-500 mt-1">{position.responsibility}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    {position.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  Since {position.since}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Framework */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Policy Framework</h3>
          <div className="space-y-3">
            {policyFramework.map((policy, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  {policy.status === 'active' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  <span className="text-gray-700">{policy.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    policy.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {policy.status === 'active' ? 'Active' : 'In Development'}
                  </span>
                  {policy.lastReview !== 'N/A' && (
                    <span className="text-xs text-gray-500">Rev. {policy.lastReview}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shareholder Engagement */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cooperative Shareholder Engagement</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800">
              {shareholderEngagement.totalShareholders.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Cooperative Shareholders</p>
          </div>

          <div className="p-4">
            <h4 className="font-medium text-gray-800 mb-3">Engagement Methods</h4>
            <ul className="space-y-2">
              {shareholderEngagement.engagementMethods.map((method, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {method}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h4 className="font-medium text-gray-800 mb-3">2023 Initiatives</h4>
            <ul className="space-y-2">
              {shareholderEngagement.recentInitiatives.map((initiative, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                  {initiative}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Evidence */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Governance Strengths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {governanceDimension.evidence.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Governance
