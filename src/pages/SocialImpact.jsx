import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
  Users, Heart, GraduationCap, Award, Building, Briefcase,
  TrendingUp, Star, CheckCircle
} from 'lucide-react'
import { impactDimensions } from '../data/esgData'

const socialDimension = impactDimensions.find(d => d.id === 'social')

const socialMetrics = [
  {
    id: 'foundation',
    title: 'Foundation Grants',
    value: '€86,200',
    subtitle: '27 projects supported',
    description: 'Community investment through Crelan Foundation',
    icon: Heart,
    color: '#EC4899'
  },
  {
    id: 'education',
    title: 'University Chairs',
    value: '2',
    subtitle: 'Sustainable agriculture focus',
    description: 'Academic partnerships for research and education',
    icon: GraduationCap,
    color: '#8B5CF6'
  },
  {
    id: 'employer',
    title: 'Top Employer',
    value: '8 Years',
    subtitle: 'Consecutive certification',
    description: 'Recognized excellence in employee experience',
    icon: Award,
    color: '#F59E0B'
  },
  {
    id: 'employees',
    title: 'Total Workforce',
    value: '3,200',
    subtitle: 'Across 3 entities',
    description: 'Crelan, AXA Bank, Europabank integration',
    icon: Users,
    color: '#3B82F6'
  }
]

const projectsData = [
  { category: 'Agriculture', projects: 8, funding: 28000 },
  { category: 'Education', projects: 6, funding: 22000 },
  { category: 'Environment', projects: 5, funding: 18000 },
  { category: 'Social Welfare', projects: 4, funding: 12000 },
  { category: 'Culture', projects: 4, funding: 6200 }
]

const employeeMetrics = [
  { label: 'Training Hours/Employee', value: '32', trend: '+12%' },
  { label: 'Employee Satisfaction', value: '78%', trend: '+5%' },
  { label: 'Internal Mobility', value: '15%', trend: '+3%' },
  { label: 'Voluntary Turnover', value: '8%', trend: '-2%' }
]

const diversityData = [
  {
    metric: 'Board Female Representation',
    current: 25,
    target: 33,
    targetYear: 2027,
    status: 'in_progress'
  },
  {
    metric: 'Management Committee Female',
    current: 0,
    target: 25,
    targetYear: 2027,
    status: 'critical'
  },
  {
    metric: 'Overall Female Workforce',
    current: 52,
    target: 50,
    targetYear: 2024,
    status: 'achieved'
  },
  {
    metric: 'Under 30 Employees',
    current: 18,
    target: 20,
    targetYear: 2025,
    status: 'in_progress'
  }
]

function SocialImpact() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Social Impact</h2>
            </div>
            <p className="mt-2 text-purple-100">
              Community investment, employee wellbeing, and social responsibility
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{socialDimension.score}/10</div>
            <span className="text-purple-200">{socialDimension.assessment}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialMetrics.map(metric => {
          const Icon = metric.icon
          return (
            <div key={metric.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 metric-card">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${metric.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
              <h3 className="text-sm text-gray-500">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
              <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Community Projects */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Project Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={projectsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis dataKey="category" type="category" stroke="#9ca3af" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'funding' ? `€${value.toLocaleString()}` : value,
                  name === 'funding' ? 'Funding' : 'Projects'
                ]}
              />
              <Bar dataKey="projects" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Projects" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Employee Wellbeing Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {employeeMetrics.map((metric, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">{metric.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                  <span className={`text-sm font-medium ${
                    metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Top Employer 2023</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              8th consecutive year of certification for excellent workplace practices
            </p>
          </div>
        </div>
      </div>

      {/* Diversity & Inclusion */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Diversity & Inclusion Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {diversityData.map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  item.status === 'achieved' ? 'bg-green-100 text-green-700' :
                  item.status === 'critical' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status === 'achieved' ? 'Achieved' :
                   item.status === 'critical' ? 'Needs Focus' : 'In Progress'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.metric}</p>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">{item.current}%</span>
                <span className="text-sm text-gray-500 mb-1">/ {item.target}% target</span>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.status === 'achieved' ? 'bg-green-500' :
                      item.status === 'critical' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Target: {item.targetYear}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence List */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Impact Evidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialDimension.evidence.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SocialImpact
