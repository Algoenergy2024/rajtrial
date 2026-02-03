import React from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Building2, Leaf, Users, Shield, Target
} from 'lucide-react'
import {
  companyProfile, impactDimensions, overallImpactScore,
  criticalGaps, timelineData, emissionsData
} from '../data/esgData'

const ScoreGauge = ({ score, maxScore }) => {
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
          stroke={getScoreColor(score)}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score}</span>
        <span className="text-sm text-gray-500">/ {maxScore}</span>
      </div>
    </div>
  )
}

const DimensionCard = ({ dimension }) => {
  const getAssessmentClass = (assessment) => {
    const classes = {
      'Strong': 'score-strong',
      'Moderate-Strong': 'bg-green-50 text-green-700 border border-green-200',
      'Moderate': 'score-moderate',
      'Emerging': 'score-emerging',
      'Weak': 'score-weak'
    }
    return classes[assessment] || 'bg-gray-100 text-gray-700'
  }

  const icons = {
    governance: Building2,
    climate: Leaf,
    social: Users,
    customer: Target,
    risk: Shield
  }
  const Icon = icons[dimension.id] || Shield

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 metric-card border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${dimension.color}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: dimension.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{dimension.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getAssessmentClass(dimension.assessment)}`}>
              {dimension.assessment}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold" style={{ color: dimension.color }}>
            {dimension.score}
          </span>
          <span className="text-gray-400 text-sm">/10</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${dimension.score * 10}%`,
              backgroundColor: dimension.color
            }}
          />
        </div>
      </div>

      <ul className="space-y-1">
        {dimension.evidence.slice(0, 2).map((item, idx) => (
          <li key={idx} className="text-xs text-gray-600 flex items-start">
            <CheckCircle className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const GapCard = ({ gap }) => {
  const severityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-blue-200 bg-blue-50'
  }

  const severityIcons = {
    high: <AlertTriangle className="w-4 h-4 text-red-500" />,
    medium: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    low: <AlertTriangle className="w-4 h-4 text-blue-500" />
  }

  return (
    <div className={`p-4 rounded-lg border ${severityColors[gap.severity]}`}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">{severityIcons[gap.severity]}</div>
        <div>
          <h4 className="font-medium text-gray-800 text-sm">{gap.title}</h4>
          <p className="text-xs text-gray-600 mt-1">{gap.description}</p>
          <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-white rounded-full text-gray-500">
            {gap.category}
          </span>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const emissionsChartData = timelineData.map(d => ({
    year: d.year,
    'Scope 1': d.scope1,
    'Scope 2': d.scope2,
    total: d.scope1 + d.scope2
  }))

  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{companyProfile.name}</h2>
            <p className="text-green-100 mt-1">{companyProfile.sector}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div>
                <span className="text-green-200 text-sm">Total Assets</span>
                <p className="text-xl font-semibold">€{(companyProfile.totalAssets / 1e9).toFixed(1)}B</p>
              </div>
              <div>
                <span className="text-green-200 text-sm">Total Lending</span>
                <p className="text-xl font-semibold">€{(companyProfile.totalLending / 1e9).toFixed(2)}B</p>
              </div>
              <div>
                <span className="text-green-200 text-sm">Employees</span>
                <p className="text-xl font-semibold">{companyProfile.employees.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-green-200 text-sm">Shareholders</span>
                <p className="text-xl font-semibold">{companyProfile.shareholders.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center space-x-6">
            <ScoreGauge score={overallImpactScore.score} maxScore={overallImpactScore.maxScore} />
            <div>
              <p className="text-sm text-green-200">Overall Impact Score</p>
              <div className="flex items-center space-x-2 mt-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">
                  +{(overallImpactScore.score - overallImpactScore.previousScore).toFixed(1)} vs last year
                </span>
              </div>
              <p className="text-xs text-green-200 mt-2 max-w-xs">
                {overallImpactScore.assessment}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Dimensions Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Assessment by Dimension</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {impactDimensions.map(dimension => (
            <DimensionCard key={dimension.id} dimension={dimension} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESG Score Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ESG Score Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
              <YAxis domain={[0, 10]} stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#scoreGradient)"
                dot={{ fill: '#10B981', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Emissions (tCO2e)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={emissionsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="Scope 1" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Scope 2" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Critical Gaps */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Critical Gaps & Limitations</h3>
          <span className="text-sm text-gray-500">{criticalGaps.length} issues identified</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalGaps.map(gap => (
            <GapCard key={gap.id} gap={gap} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Green Bonds</p>
              <p className="text-xl font-bold text-gray-800">€600M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Emissions Reduction</p>
              <p className="text-xl font-bold text-gray-800">-18%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">SFDR Compliance</p>
              <p className="text-xl font-bold text-gray-800">81%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ECO Loans</p>
              <p className="text-xl font-bold text-gray-800">€5.8M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
