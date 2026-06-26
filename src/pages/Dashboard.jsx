import React from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info,
  Building2, Leaf, Users, Shield, Target, Award, ExternalLink
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { entityTypes } from '../data/belgianEntities'

const ScoreGauge = ({ score, maxScore, color }) => {
  if (score === null) {
    return (
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="text-center">
          <Info className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <span className="text-sm text-gray-500">Data Pending</span>
        </div>
      </div>
    )
  }

  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getScoreColor = (score) => {
    if (score >= 8) return '#10B981'
    if (score >= 6) return '#F59E0B'
    if (score >= 4) return '#3B82F6'
    return '#EF4444'
  }

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r="45"
          stroke={color || getScoreColor(score)}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score.toFixed(1)}</span>
        <span className="text-sm text-gray-500">/ {maxScore}</span>
      </div>
    </div>
  )
}

const DimensionCard = ({ title, score, icon: Icon, color, evidence }) => {
  const getAssessment = (score) => {
    if (score === null) return { label: 'Pending', class: 'bg-gray-100 text-gray-600' }
    if (score >= 8) return { label: 'Strong', class: 'bg-green-100 text-green-700' }
    if (score >= 6) return { label: 'Moderate', class: 'bg-yellow-100 text-yellow-700' }
    if (score >= 4) return { label: 'Emerging', class: 'bg-blue-100 text-blue-700' }
    return { label: 'Needs Work', class: 'bg-red-100 text-red-700' }
  }

  const assessment = getAssessment(score)

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 metric-card border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${assessment.class}`}>
              {assessment.label}
            </span>
          </div>
        </div>
        <div className="text-right">
          {score !== null ? (
            <>
              <span className="text-2xl font-bold" style={{ color }}>
                {score.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">/10</span>
            </>
          ) : (
            <span className="text-gray-400 text-sm">N/A</span>
          )}
        </div>
      </div>

      {score !== null && (
        <div className="mb-3">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${score * 10}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>
      )}

      {evidence && evidence.length > 0 && (
        <ul className="space-y-1">
          {evidence.slice(0, 2).map((item, idx) => (
            <li key={idx} className="text-xs text-gray-600 flex items-start">
              <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const MetricCard = ({ icon: Icon, label, value, color, subtext }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
      </div>
    </div>
  </div>
)

const DataPendingBanner = ({ orgName }) => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
    <div className="flex items-start space-x-3">
      <Info className="w-6 h-6 text-yellow-600 mt-0.5" />
      <div>
        <h4 className="font-medium text-yellow-800">Limited Data Available for {orgName}</h4>
        <p className="text-sm text-yellow-700 mt-1">
          Some metrics are pending detailed research. Upload the organization's sustainability report
          to populate complete ESG data, or check the Sector Comparison page for available metrics.
        </p>
      </div>
    </div>
  </div>
)

function Dashboard() {
  const { selectedOrg } = useOrganization()

  const hasDetailedData = selectedOrg.id === 'crelan' // Currently only Crelan has full detailed data
  const hasBasicData = selectedOrg.esgScore !== null

  // Build evidence arrays from available data
  const getClimateEvidence = () => {
    const evidence = []
    if (selectedOrg.climate?.greenBonds) {
      evidence.push(`€${(selectedOrg.climate.greenBonds / 1000000).toFixed(0)}M green bond issuance`)
    }
    if (selectedOrg.climate?.cdpScore) {
      evidence.push(`CDP Climate Score: ${selectedOrg.climate.cdpScore}`)
    }
    if (selectedOrg.climate?.netZeroTarget) {
      evidence.push(`Net-zero target: ${selectedOrg.climate.netZeroTarget}`)
    }
    if (selectedOrg.climate?.sbtiValidated) {
      evidence.push('SBTi validated targets')
    }
    return evidence
  }

  const getGovernanceEvidence = () => {
    const evidence = []
    if (selectedOrg.governance?.boardFemalePercentage !== null) {
      evidence.push(`${selectedOrg.governance.boardFemalePercentage}% female board representation`)
    }
    if (selectedOrg.governance?.esgCommittee) {
      evidence.push('Dedicated ESG committee in place')
    }
    if (selectedOrg.ratings?.msci) {
      evidence.push(`MSCI ESG Rating: ${selectedOrg.ratings.msci}`)
    }
    return evidence
  }

  const getSocialEvidence = () => {
    const evidence = []
    if (selectedOrg.social?.communityInvestment) {
      evidence.push(`€${selectedOrg.social.communityInvestment.toLocaleString()} community investment`)
    }
    if (selectedOrg.employees) {
      evidence.push(`${selectedOrg.employees.toLocaleString()} employees`)
    }
    if (selectedOrg.isCooperative) {
      evidence.push('Cooperative ownership structure')
    }
    return evidence
  }

  const getRiskEvidence = () => {
    const evidence = []
    if (selectedOrg.ratings?.sustainalytics) {
      evidence.push(`Sustainalytics: ${selectedOrg.ratings.sustainalytics}`)
    }
    if (selectedOrg.compliance?.csrdReady) {
      evidence.push('CSRD reporting ready')
    }
    return evidence
  }

  // Format large numbers
  const formatAssets = (value) => {
    if (!value) return 'N/A'
    if (value >= 1e12) return `€${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `€${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `€${(value / 1e6).toFixed(0)}M`
    return `€${value.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Data Pending Banner */}
      {!hasDetailedData && !hasBasicData && (
        <DataPendingBanner orgName={selectedOrg.name} />
      )}

      {/* Company Overview */}
      <div className={`rounded-2xl p-6 text-white ${
        selectedOrg.type === entityTypes.BANK
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
          : 'bg-gradient-to-r from-purple-600 to-pink-600'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-2xl font-bold">{selectedOrg.name}</h2>
              {selectedOrg.isCooperative && (
                <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">Cooperative</span>
              )}
            </div>
            <p className="text-white/80 mt-1">{selectedOrg.description}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <span className="text-white/60 text-sm">Total Assets</span>
                <p className="text-xl font-semibold">{formatAssets(selectedOrg.totalAssets)}</p>
              </div>
              <div>
                <span className="text-white/60 text-sm">Employees</span>
                <p className="text-xl font-semibold">{selectedOrg.employees?.toLocaleString() || 'N/A'}</p>
              </div>
              <div>
                <span className="text-white/60 text-sm">Headquarters</span>
                <p className="text-xl font-semibold">{selectedOrg.headquarters || 'Belgium'}</p>
              </div>
              <div>
                <span className="text-white/60 text-sm">Type</span>
                <p className="text-xl font-semibold">
                  {selectedOrg.type === entityTypes.BANK ? 'Bank' : 'Insurance'}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-6">
            <ScoreGauge score={selectedOrg.esgScore} maxScore={10} />
            <div>
              <p className="text-sm text-white/60">Overall ESG Score</p>
              {selectedOrg.esgScore !== null && (
                <div className="flex items-center space-x-2 mt-1">
                  {selectedOrg.esgScore >= 7 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {selectedOrg.esgScore >= 8 ? 'Leader' :
                     selectedOrg.esgScore >= 6 ? 'Above Average' : 'Developing'}
                  </span>
                </div>
              )}
              {selectedOrg.dataSource && (
                <p className="text-xs text-white/50 mt-2 max-w-xs">
                  Source: {selectedOrg.dataSource}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Summary (if available) */}
      {(selectedOrg.ratings?.msci || selectedOrg.ratings?.sustainalytics || selectedOrg.ratings?.cdp) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedOrg.ratings?.msci && (
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">MSCI ESG Rating</p>
                <p className="text-xl font-bold text-gray-800">{selectedOrg.ratings.msci}</p>
              </div>
            </div>
          )}
          {selectedOrg.ratings?.sustainalytics && (
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sustainalytics</p>
                <p className="text-lg font-bold text-gray-800">{selectedOrg.ratings.sustainalytics}</p>
              </div>
            </div>
          )}
          {selectedOrg.ratings?.cdp && (
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">CDP Climate</p>
                <p className="text-xl font-bold text-gray-800">{selectedOrg.ratings.cdp}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Impact Dimensions Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ESG Dimension Scores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DimensionCard
            title="Climate Action"
            score={selectedOrg.scores?.climate}
            icon={Leaf}
            color="#10B981"
            evidence={getClimateEvidence()}
          />
          <DimensionCard
            title="Governance"
            score={selectedOrg.scores?.governance}
            icon={Building2}
            color="#3B82F6"
            evidence={getGovernanceEvidence()}
          />
          <DimensionCard
            title="Social Impact"
            score={selectedOrg.scores?.social}
            icon={Users}
            color="#8B5CF6"
            evidence={getSocialEvidence()}
          />
          <DimensionCard
            title="Risk Management"
            score={selectedOrg.scores?.risk}
            icon={Shield}
            color="#F59E0B"
            evidence={getRiskEvidence()}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Leaf}
          label="Green Bonds"
          value={selectedOrg.climate?.greenBonds
            ? `€${(selectedOrg.climate.greenBonds / 1000000).toFixed(0)}M`
            : 'N/A'}
          color="#10B981"
        />
        <MetricCard
          icon={TrendingDown}
          label="Net Zero Target"
          value={selectedOrg.climate?.netZeroTarget || 'N/A'}
          color="#3B82F6"
        />
        <MetricCard
          icon={Users}
          label="Board Diversity"
          value={selectedOrg.governance?.boardFemalePercentage !== null
            ? `${selectedOrg.governance.boardFemalePercentage}%`
            : 'N/A'}
          color="#8B5CF6"
          subtext="Female representation"
        />
        <MetricCard
          icon={Target}
          label="SFDR Art 8/9"
          value={selectedOrg.compliance?.sfdrArticle8_9Percentage !== null
            ? `${selectedOrg.compliance.sfdrArticle8_9Percentage}%`
            : 'N/A'}
          color="#F59E0B"
          subtext="Fund compliance"
        />
      </div>

      {/* Emissions Data (if available) */}
      {(selectedOrg.emissions?.scope1?.value || selectedOrg.emissions?.scope2?.value) && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Emissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-600 font-medium">Scope 1</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">
                {selectedOrg.emissions.scope1?.value?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-xs text-blue-500">tCO2e</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-green-600 font-medium">Scope 2</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {selectedOrg.emissions.scope2?.value?.toLocaleString() || 'N/A'}
              </p>
              <p className="text-xs text-green-500">tCO2e</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-purple-600 font-medium">Scope 3</p>
              <p className="text-lg font-bold text-purple-700 mt-1">
                {selectedOrg.emissions.scope3?.value?.toLocaleString() || selectedOrg.emissions.scope3?.status || 'In Progress'}
              </p>
              {selectedOrg.emissions.scope3?.note && (
                <p className="text-xs text-purple-500">{selectedOrg.emissions.scope3.note}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action for Missing Data */}
      {!hasDetailedData && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Want More Detailed Data?</h4>
              <p className="text-sm text-gray-600 mt-1">
                Upload {selectedOrg.name}'s sustainability report to populate complete ESG metrics,
                including detailed emissions data, social initiatives, governance structure, and CSRD compliance status.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF sustainability reports, annual reports, ESG disclosures
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
