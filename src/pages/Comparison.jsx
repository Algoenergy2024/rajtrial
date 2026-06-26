import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts'
import {
  Building2, Shield, TrendingUp, Users, Leaf, Filter,
  ArrowUpDown, ChevronDown, ChevronUp, AlertCircle, CheckCircle,
  Award, Target
} from 'lucide-react'
import { entities, getBanks, getInsurers, entityTypes } from '../data/belgianEntities'

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#84CC16']

const ScoreBadge = ({ score, size = 'md' }) => {
  if (score === null) return (
    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">N/A</span>
  )

  const getColor = (s) => {
    if (s >= 8) return 'bg-green-100 text-green-700'
    if (s >= 6) return 'bg-yellow-100 text-yellow-700'
    if (s >= 4) return 'bg-orange-100 text-orange-700'
    return 'bg-red-100 text-red-700'
  }

  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-lg font-bold' : 'px-2 py-1 text-sm font-medium'

  return (
    <span className={`${sizeClasses} rounded-full ${getColor(score)}`}>
      {score.toFixed(1)}
    </span>
  )
}

const EntityCard = ({ entity, rank, isSelected, onSelect }) => {
  const hasData = entity.esgScore !== null

  return (
    <div
      onClick={() => onSelect(entity.id)}
      className={`bg-white rounded-xl shadow-sm p-5 border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {rank && hasData && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              rank === 1 ? 'bg-yellow-100 text-yellow-700' :
              rank === 2 ? 'bg-gray-200 text-gray-700' :
              rank === 3 ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {rank}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-800">{entity.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              entity.type === entityTypes.BANK ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {entity.type === entityTypes.BANK ? 'Bank' : 'Insurance'}
            </span>
          </div>
        </div>
        <ScoreBadge score={entity.esgScore} size="lg" />
      </div>

      {hasData ? (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Climate</p>
            <p className="font-semibold text-green-600">{entity.scores.climate?.toFixed(1) || 'N/A'}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Governance</p>
            <p className="font-semibold text-blue-600">{entity.scores.governance?.toFixed(1) || 'N/A'}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Social</p>
            <p className="font-semibold text-purple-600">{entity.scores.social?.toFixed(1) || 'N/A'}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Risk</p>
            <p className="font-semibold text-orange-600">{entity.scores.risk?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
          <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Data pending research</p>
        </div>
      )}

      {entity.isCooperative && (
        <div className="mt-3 flex items-center text-xs text-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Cooperative
        </div>
      )}
    </div>
  )
}

const ComparisonTable = ({ selectedEntities }) => {
  const selected = entities.filter(e => selectedEntities.includes(e.id))

  if (selected.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Select entities above to compare</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Metric</th>
              {selected.map(entity => (
                <th key={entity.id} className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                  {entity.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Overall ESG Score</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center">
                  <ScoreBadge score={entity.esgScore} />
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Climate Score</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center">
                  <ScoreBadge score={entity.scores.climate} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Governance Score</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center">
                  <ScoreBadge score={entity.scores.governance} />
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Social Score</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center">
                  <ScoreBadge score={entity.scores.social} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Scope 1 Emissions (tCO2e)</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  {entity.emissions.scope1.value?.toLocaleString() || 'N/A'}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Scope 2 Emissions (tCO2e)</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  {entity.emissions.scope2.value?.toLocaleString() || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Green Bonds (€)</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  {entity.climate.greenBonds
                    ? `€${(entity.climate.greenBonds / 1000000).toFixed(0)}M`
                    : 'N/A'}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Board Female %</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  {entity.governance.boardFemalePercentage !== null
                    ? `${entity.governance.boardFemalePercentage}%`
                    : 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">SFDR Art 8/9 Compliance</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  {entity.compliance.sfdrArticle8_9Percentage !== null
                    ? `${entity.compliance.sfdrArticle8_9Percentage}%`
                    : 'N/A'}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-700">Total Assets</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  €{(entity.totalAssets / 1000000000).toFixed(1)}B
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Employees</td>
              {selected.map(entity => (
                <td key={entity.id} className="px-4 py-3 text-center font-medium">
                  {entity.employees?.toLocaleString() || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Comparison() {
  const [filter, setFilter] = useState('all')
  const [selectedEntities, setSelectedEntities] = useState(['crelan'])
  const [sortBy, setSortBy] = useState('esgScore')

  const filteredEntities = filter === 'all'
    ? entities
    : filter === 'banks'
    ? getBanks()
    : getInsurers()

  const sortedEntities = [...filteredEntities].sort((a, b) => {
    if (a.esgScore === null && b.esgScore === null) return 0
    if (a.esgScore === null) return 1
    if (b.esgScore === null) return -1
    return b.esgScore - a.esgScore
  })

  const toggleEntity = (id) => {
    setSelectedEntities(prev =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    )
  }

  const entitiesWithScores = sortedEntities.filter(e => e.esgScore !== null)
  const entitiesWithoutScores = sortedEntities.filter(e => e.esgScore === null)

  // Prepare radar chart data
  const radarData = entities
    .filter(e => selectedEntities.includes(e.id) && e.esgScore !== null)
    .map(entity => ({
      name: entity.name,
      Climate: entity.scores.climate || 0,
      Governance: entity.scores.governance || 0,
      Social: entity.scores.social || 0,
      Risk: entity.scores.risk || 0
    }))

  // Prepare bar chart data for emissions comparison
  const emissionsData = entities
    .filter(e => selectedEntities.includes(e.id) && e.emissions.scope1.value !== null)
    .map(entity => ({
      name: entity.name,
      'Scope 1': entity.emissions.scope1.value,
      'Scope 2': entity.emissions.scope2.value || 0
    }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Belgian Financial Sector Comparison</h2>
            </div>
            <p className="mt-2 text-indigo-100">
              Compare ESG performance across Belgian banks and insurance companies
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{entities.length}</div>
            <span className="text-indigo-200">Entities Tracked</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Banks</p>
              <p className="text-2xl font-bold text-gray-800">{getBanks().length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurers</p>
              <p className="text-2xl font-bold text-gray-800">{getInsurers().length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">With ESG Data</p>
              <p className="text-2xl font-bold text-gray-800">
                {entities.filter(e => e.esgScore !== null).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Research</p>
              <p className="text-2xl font-bold text-gray-800">
                {entities.filter(e => e.esgScore === null).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">Filter:</span>
        {[
          { key: 'all', label: 'All Entities' },
          { key: 'banks', label: 'Banks Only' },
          { key: 'insurers', label: 'Insurers Only' }
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === f.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Entity Selection Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Select Entities to Compare
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({selectedEntities.length} selected)
          </span>
        </h3>

        {entitiesWithScores.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-3">Entities with ESG Data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
              {entitiesWithScores.map((entity, idx) => (
                <EntityCard
                  key={entity.id}
                  entity={entity}
                  rank={idx + 1}
                  isSelected={selectedEntities.includes(entity.id)}
                  onSelect={toggleEntity}
                />
              ))}
            </div>
          </>
        )}

        {entitiesWithoutScores.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-3">Pending Research:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {entitiesWithoutScores.map(entity => (
                <EntityCard
                  key={entity.id}
                  entity={entity}
                  isSelected={selectedEntities.includes(entity.id)}
                  onSelect={toggleEntity}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Comparison Charts */}
      {selectedEntities.length > 0 && radarData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">ESG Dimension Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={[
                { dimension: 'Climate', ...Object.fromEntries(radarData.map(e => [e.name, e.Climate])) },
                { dimension: 'Governance', ...Object.fromEntries(radarData.map(e => [e.name, e.Governance])) },
                { dimension: 'Social', ...Object.fromEntries(radarData.map(e => [e.name, e.Social])) },
                { dimension: 'Risk', ...Object.fromEntries(radarData.map(e => [e.name, e.Risk])) }
              ]}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                {radarData.map((entity, idx) => (
                  <Radar
                    key={entity.name}
                    name={entity.name}
                    dataKey={entity.name}
                    stroke={COLORS[idx % COLORS.length]}
                    fill={COLORS[idx % COLORS.length]}
                    fillOpacity={0.2}
                  />
                ))}
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Emissions Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Emissions Comparison</h3>
            {emissionsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Scope 1" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Scope 2" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[350px] flex items-center justify-center">
                <p className="text-gray-500">No emissions data available for selected entities</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Comparison</h3>
        <ComparisonTable selectedEntities={selectedEntities} />
      </div>

      {/* CDP Integration Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Leaf className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">CDP Integration Planned</h4>
            <p className="text-sm text-blue-700 mt-1">
              Future release will include CDP (Carbon Disclosure Project) API integration for verified
              climate data, Scope 3 emissions details, and standardized environmental scoring across all entities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comparison
