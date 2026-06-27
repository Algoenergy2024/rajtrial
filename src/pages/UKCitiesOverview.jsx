import React, { useState } from 'react'
import {
  Flag, MapPin, Users, AlertTriangle, Target, Zap, FileText,
  ArrowRight, Info, CheckCircle, ClipboardList, Factory
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { ukCitiesFull } from '../data/ukCitiesFull'

function UKCitiesOverview() {
  const { setSelectedId } = useOrganization()
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')

  const cities = ukCitiesFull

  // Helper to calculate emissions from q3_1_3 data or emissions.scopes
  const getCityEmissions = (city) => {
    let scope1 = 0, scope2 = 0, scope3 = 0

    // First try q3_1_3 sector data (detailed breakdown)
    const sectors = city.q3_1_3 || []
    if (sectors.length > 0) {
      sectors.forEach(sector => {
        scope1 += parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
        scope2 += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
        scope3 += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
      })
    }
    // Fall back to emissions.scopes array
    else if (city.emissions?.scopes) {
      city.emissions.scopes.forEach(s => {
        const val = parseFloat(s.emissions) || 0
        if (s.scope?.toLowerCase().includes('scope 1')) {
          scope1 += val
        } else if (s.scope?.toLowerCase().includes('scope 2')) {
          scope2 += val
        } else if (s.scope?.toLowerCase().includes('scope 3')) {
          scope3 += val
        }
      })
    }

    return { scope1, scope2, scope3, total: scope1 + scope2 + scope3 }
  }

  // Compute aggregates
  const totalEmissions = cities.reduce((acc, city) => {
    const e = getCityEmissions(city)
    return {
      scope1: acc.scope1 + e.scope1,
      scope2: acc.scope2 + e.scope2,
      scope3: acc.scope3 + e.scope3,
      total: acc.total + e.total
    }
  }, { scope1: 0, scope2: 0, scope3: 0, total: 0 })

  const citiesWithEmissions = cities.filter(c => (c.q3_1_3?.length || 0) > 0 || c.emissions?.scopes?.length > 0).length

  const stats = {
    count: cities.length,
    totalPopulation: cities.reduce((sum, c) => {
      const pop = c.q1_2?.population || c.profile?.population || 0
      return sum + pop
    }, 0),
    emissions: totalEmissions,
    citiesWithEmissions,
    withHazards: cities.filter(c => (c.q2_2?.length || 0) > 0 || (c.hazards?.length || 0) > 0).length,
    totalHazards: cities.reduce((sum, c) => sum + (c.q2_2?.length || c.hazards?.length || 0), 0),
    withTargets: cities.filter(c => (c.q6_1_1?.length || 0) > 0 || (c.targets?.length || 0) > 0).length,
    withActions: cities.filter(c => (c.q9_1?.length || 0) > 0 || (c.q9_2?.length || 0) > 0 || (c.actions?.length || 0) > 0).length,
    withPlans: cities.filter(c => (c.q8_1_1?.length || 0) > 0 || (c.plans?.length || 0) > 0).length,
    totalActions: cities.reduce((sum, c) => {
      return sum + (c.q9_1?.length || 0) + (c.q9_2?.length || 0) + (c.actions?.length || 0)
    }, 0),
    byOrgType: cities.reduce((acc, c) => {
      const type = c.orgType || 'Unknown'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
  }

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K'
    return num?.toLocaleString() || '0'
  }

  const getPopulation = (city) => city.q1_2?.population || city.profile?.population || 0
  const getHazardCount = (city) => city.q2_2?.length || city.hazards?.length || 0
  const getTargetCount = (city) => city.q6_1_1?.length || city.targets?.length || 0
  const getActionCount = (city) => (city.q9_1?.length || 0) + (city.q9_2?.length || 0) + (city.actions?.length || 0)

  // Filter cities
  const filteredCities = filterBy === 'all'
    ? cities
    : cities.filter(c => c.orgType === filterBy)

  // Sort cities
  const sortedCities = [...filteredCities].sort((a, b) => {
    switch (sortBy) {
      case 'population':
        return getPopulation(b) - getPopulation(a)
      case 'name':
        return a.name.localeCompare(b.name)
      case 'hazards':
        return getHazardCount(b) - getHazardCount(a)
      case 'actions':
        return getActionCount(b) - getActionCount(a)
      default:
        return 0
    }
  })

  const orgTypes = Object.entries(stats.byOrgType).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Flag className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">UK Cities & Authorities</h1>
            <p className="text-white/80">{stats.count} entities with full CDP Q1-Q11 data</p>
          </div>
        </div>
        <p className="text-white/70 text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          CDP 2025 comprehensive city questionnaire responses
        </p>
      </div>

      {/* Emissions Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Factory className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-gray-800">Total Emissions (tCO2e)</h2>
          <span className="text-xs text-gray-500 ml-2">from {stats.citiesWithEmissions} reporting entities</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-600 font-medium mb-1">Scope 1 (Direct)</p>
            <p className="text-2xl font-bold text-purple-700">{formatNumber(stats.emissions.scope1)}</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-sm text-indigo-600 font-medium mb-1">Scope 2 (Grid)</p>
            <p className="text-2xl font-bold text-indigo-700">{formatNumber(stats.emissions.scope2)}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-600 font-medium mb-1">Scope 3 (Outside)</p>
            <p className="text-2xl font-bold text-blue-700">{formatNumber(stats.emissions.scope3)}</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.emissions.total)}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Users className="w-4 h-4" />
            Total Population
          </div>
          <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.totalPopulation)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Hazards Reported
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.totalHazards}</p>
          <p className="text-xs text-gray-500">{stats.withHazards} entities reporting</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            With Targets
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.withTargets}</p>
          <p className="text-xs text-gray-500">of {stats.count} entities</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Zap className="w-4 h-4" />
            Climate Actions
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.totalActions}</p>
          <p className="text-xs text-gray-500">{stats.withActions} entities reporting</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">With Climate Plans</p>
          <p className="text-xl font-bold text-gray-800">{stats.withPlans}/{stats.count}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Cities</p>
          <p className="text-xl font-bold text-gray-800">{stats.byOrgType['City'] || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Counties</p>
          <p className="text-xl font-bold text-gray-800">{stats.byOrgType['County'] || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Other Authorities</p>
          <p className="text-xl font-bold text-gray-800">
            {stats.count - (stats.byOrgType['City'] || 0) - (stats.byOrgType['County'] || 0)}
          </p>
        </div>
      </div>

      {/* Filter by Org Type */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Filter by Organization Type</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterBy('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterBy === 'all'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
            }`}
          >
            All ({stats.count})
          </button>
          {orgTypes.map(([type, count]) => (
            <button
              key={type}
              onClick={() => setFilterBy(type)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterBy === type
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {type} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Cities List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">
            {filterBy === 'all' ? 'All UK Entities' : filterBy}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="population">Population</option>
              <option value="name">Name</option>
              <option value="hazards">Hazards</option>
              <option value="actions">Actions</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
          {sortedCities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedId(city.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-indigo-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{city.name}</p>
                  <p className="text-sm text-gray-500">{city.orgType || 'Authority'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right w-20">
                  <p className="text-xs text-gray-500">Population</p>
                  <p className="font-medium text-gray-800 text-sm">{formatNumber(getPopulation(city))}</p>
                </div>
                <div className="text-right w-16">
                  {getHazardCount(city) > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                      {getHazardCount(city)} haz
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </div>
                <div className="text-right w-16">
                  {getTargetCount(city) > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {getTargetCount(city)} tgt
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </div>
                <div className="text-right w-16">
                  {getActionCount(city) > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {getActionCount(city)} act
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          Full CDP questionnaire data (Q1-Q11). Reporting completeness varies by entity. Click any row to view detailed CDP responses.
        </p>
      </div>
    </div>
  )
}

export default UKCitiesOverview
