import React, { useState } from 'react'
import {
  Globe, MapPin, Users, AlertTriangle, Target, Factory,
  ArrowRight, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function LatamCitiesDashboard() {
  const { setSelectedId, selectedCountry, setSelectedCountry, allLatamCities, latamCountries } = useOrganization()
  const [sortBy, setSortBy] = useState('name')

  const latamCities = allLatamCities || []
  const countries = latamCountries || []

  // Filter by country if selected
  const filteredCities = selectedCountry === 'all'
    ? latamCities
    : latamCities.filter(c => c.country === selectedCountry)

  // Helper to get emissions from q3_1_3 data
  const getCityEmissions = (city) => {
    const sectors = city.q3_1_3 || []
    let scope1 = 0, scope2 = 0, scope3 = 0
    sectors.forEach(sector => {
      scope1 += parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
      scope2 += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
      scope3 += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
    })
    return { scope1, scope2, scope3, total: scope1 + scope2 + scope3 }
  }

  // Calculate emissions totals
  const totalEmissions = filteredCities.reduce((acc, city) => {
    const e = getCityEmissions(city)
    return {
      scope1: acc.scope1 + e.scope1,
      scope2: acc.scope2 + e.scope2,
      scope3: acc.scope3 + e.scope3,
      total: acc.total + e.total
    }
  }, { scope1: 0, scope2: 0, scope3: 0, total: 0 })

  const citiesWithEmissions = filteredCities.filter(c => (c.q3_1_3?.length || 0) > 0).length

  const getPopulation = (city) => city.profile?.population || 0

  // Compute aggregates
  const stats = {
    totalCities: latamCities.length,
    filteredCount: filteredCities.length,
    countries: countries.length,
    totalPopulation: filteredCities.reduce((sum, c) => sum + getPopulation(c), 0),
    emissions: totalEmissions,
    citiesWithEmissions,
    withHazards: filteredCities.filter(c => (c.q2_2?.length || 0) > 0).length,
    totalHazards: filteredCities.reduce((sum, c) => sum + (c.q2_2?.length || 0), 0),
    withTargets: filteredCities.filter(c => (c.q6_1_1?.length || 0) > 0).length,
    byCountry: countries.map(country => ({
      country,
      count: latamCities.filter(c => c.country === country).length,
      population: latamCities.filter(c => c.country === country).reduce((s, c) => s + getPopulation(c), 0)
    })).sort((a, b) => b.count - a.count)
  }

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K'
    return num?.toLocaleString() || '0'
  }

  // Sort cities
  const sortedCities = [...filteredCities].sort((a, b) => {
    switch (sortBy) {
      case 'population':
        return getPopulation(b) - getPopulation(a)
      case 'name':
        return a.name.localeCompare(b.name)
      case 'hazards':
        return (b.q2_2?.length || 0) - (a.q2_2?.length || 0)
      default:
        return 0
    }
  })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Latin America CDP Region</h1>
            <p className="text-white/80">{stats.totalCities} cities across {stats.countries} countries</p>
          </div>
        </div>
        <p className="text-white/70 text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          CDP 2025 city climate disclosures - Latin America region
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            Cities Reporting
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.filteredCount}</p>
        </div>
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
            Report Hazards
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.withHazards}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Have Targets
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.withTargets}</p>
        </div>
      </div>

      {/* Emissions Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Factory className="w-5 h-5 text-emerald-600" />
          <h2 className="font-semibold text-gray-800">Total Emissions (tCO2e)</h2>
          <span className="text-xs text-gray-500 ml-2">from {stats.citiesWithEmissions} reporting cities</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-sm text-emerald-600 font-medium mb-1">Scope 1 (Direct)</p>
            <p className="text-2xl font-bold text-emerald-700">{formatNumber(stats.emissions.scope1)}</p>
          </div>
          <div className="bg-teal-50 rounded-xl p-4">
            <p className="text-sm text-teal-600 font-medium mb-1">Scope 2 (Grid)</p>
            <p className="text-2xl font-bold text-teal-700">{formatNumber(stats.emissions.scope2)}</p>
          </div>
          <div className="bg-cyan-50 rounded-xl p-4">
            <p className="text-sm text-cyan-600 font-medium mb-1">Scope 3 (Outside)</p>
            <p className="text-2xl font-bold text-cyan-700">{formatNumber(stats.emissions.scope3)}</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.emissions.total)}</p>
          </div>
        </div>
      </div>

      {/* Country/Region Breakdown */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Cities by Country</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCountry('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCountry === 'all'
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
            }`}
          >
            All ({stats.totalCities})
          </button>
          {stats.byCountry.map(({ country, count }) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCountry === country
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {country} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Cities List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">
            {selectedCountry === 'all' ? 'All Latin America Cities' : `Cities in ${selectedCountry}`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="population">Population</option>
              <option value="name">Name</option>
              <option value="hazards">Hazards</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
          {sortedCities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedId(city.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{city.name}</p>
                  <p className="text-sm text-gray-500">{city.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="font-medium text-gray-800">{formatNumber(getPopulation(city))}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium text-gray-800">{city.orgType || 'City'}</p>
                </div>
                <div className="text-right w-24">
                  {(city.q2_2?.length || 0) > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                      <AlertTriangle className="w-3 h-3" />
                      {city.q2_2.length} hazards
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">No hazards</span>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-700">
          Latin America CDP region includes cities from Argentina, Brazil, Chile, Colombia, Costa Rica, Cuba, Ecuador, Guatemala, Honduras, Mexico, Peru, Uruguay, and Venezuela reporting through the CDP program.
        </p>
      </div>
    </div>
  )
}

export default LatamCitiesDashboard
