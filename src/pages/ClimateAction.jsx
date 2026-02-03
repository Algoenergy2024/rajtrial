import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {
  Leaf, Zap, Car, Sun, TrendingDown, AlertCircle, CheckCircle2, Target
} from 'lucide-react'
import { impactDimensions, emissionsData, timelineData } from '../data/esgData'

const climateDimension = impactDimensions.find(d => d.id === 'climate')

const initiativesData = [
  {
    id: 'green_bonds',
    title: 'Green Bond Issuance',
    value: '€600M',
    description: 'Financing for sustainable projects and green initiatives',
    status: 'active',
    icon: Leaf,
    color: '#10B981'
  },
  {
    id: 'ev_policy',
    title: 'Electric Vehicle Policy',
    value: '100%',
    description: 'All company vehicles to be electric from Oct 2023',
    status: 'active',
    icon: Car,
    color: '#3B82F6'
  },
  {
    id: 'solar',
    title: 'Solar Installation',
    value: '189.6 kW',
    description: '468 solar panels installed across facilities',
    status: 'active',
    icon: Sun,
    color: '#F59E0B'
  },
  {
    id: 'energy',
    title: 'Energy Reduction',
    value: '-18%',
    description: 'Electricity consumption reduction at Berchem facility',
    status: 'active',
    icon: Zap,
    color: '#8B5CF6'
  }
]

const scope3Categories = [
  { name: 'Financed Emissions', status: 'In Progress', completion: 25 },
  { name: 'Business Travel', status: 'Measured', completion: 100 },
  { name: 'Employee Commuting', status: 'Estimated', completion: 60 },
  { name: 'Supply Chain', status: 'Not Measured', completion: 0 }
]

const emissionsBySource = [
  { name: 'Electricity', value: 55 },
  { name: 'Natural Gas', value: 20 },
  { name: 'Vehicle Fleet', value: 15 },
  { name: 'Other', value: 10 }
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']

function ClimateAction() {
  const emissionsChartData = timelineData.map(d => ({
    year: d.year,
    'Scope 1': d.scope1,
    'Scope 2': d.scope2,
    projected: d.projected
  }))

  const totalCurrentEmissions = emissionsData.scope1.current + emissionsData.scope2.current
  const totalPreviousEmissions = emissionsData.scope1.previous + emissionsData.scope2.previous
  const reductionPercentage = ((totalPreviousEmissions - totalCurrentEmissions) / totalPreviousEmissions * 100).toFixed(1)

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
              Tracking environmental impact and carbon reduction initiatives
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{climateDimension.score}/10</div>
            <span className="text-green-200">{climateDimension.assessment}</span>
          </div>
        </div>
      </div>

      {/* Key Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {initiativesData.map(initiative => {
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

      {/* Emissions Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scope 1 & 2 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scope 1 Emissions</h3>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-blue-600">{emissionsData.scope1.current.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{emissionsData.scope1.unit}</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                -{((emissionsData.scope1.previous - emissionsData.scope1.current) / emissionsData.scope1.previous * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Sources:</p>
            {emissionsData.scope1.sources.map((source, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                {source}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scope 2 Emissions</h3>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-green-600">{emissionsData.scope2.current.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{emissionsData.scope2.unit}</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                -{((emissionsData.scope2.previous - emissionsData.scope2.current) / emissionsData.scope2.previous * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">Sources:</p>
            {emissionsData.scope2.sources.map((source, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                {source}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scope 3 Progress</h3>
          <div className="flex items-center mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm text-yellow-700">Partially Quantified</span>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emissions Trajectory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={emissionsChartData}>
              <defs>
                <linearGradient id="scope1Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="scope2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="Scope 1"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#scope1Gradient)"
              />
              <Area
                type="monotone"
                dataKey="Scope 2"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#scope2Gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions by Source */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emissions by Source</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emissionsBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {emissionsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reduction Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-800">Total Emissions Reduction</h3>
            <p className="text-sm text-green-600 mt-1">Year-over-year improvement in Scope 1 & 2 emissions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-700">{reductionPercentage}%</p>
              <p className="text-xs text-green-600">Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-700">{totalCurrentEmissions.toLocaleString()}</p>
              <p className="text-xs text-green-600">tCO2e Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClimateAction
