import React from 'react'
import {
  Globe, MapPin, TrendingUp, Target, Users, Building2, Zap, Factory
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { japanCitiesFull } from '../data/japanCitiesFull'
import { useNavigate } from 'react-router-dom'

function JapanCitiesDashboard() {
  const { setSelectedId, japanCountries, selectedCountry, setSelectedCountry } = useOrganization()
  const navigate = useNavigate()

  const filteredCities = selectedCountry === 'all'
    ? japanCitiesFull
    : japanCitiesFull.filter(c => c.country === selectedCountry)

  const totalPopulation = filteredCities.reduce((sum, city) => {
    const pop = city.q1_0?.find(q => q['Population^'])
    return sum + (parseInt(pop?.['Population^']?.replace(/,/g, '')) || 0)
  }, 0)

  const citiesWithTargets = filteredCities.filter(city =>
    city.q6_1_1 && city.q6_1_1.length > 0
  ).length

  const citiesWithInventory = filteredCities.filter(city =>
    city.q3_1 && city.q3_1.length > 0
  ).length

  const handleCityClick = (cityId) => {
    setSelectedId(cityId)
    navigate('/japan-dashboard')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Japan Cities Dashboard</h1>
              <p className="text-white/80">CDP 2025 Full Cities Public Data - Japan Region</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{filteredCities.length}</p>
            <p className="text-white/80">Reporting Cities</p>
          </div>
        </div>
      </div>

      {/* Country Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600">Filter by Country:</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Countries ({japanCitiesFull.length})</option>
            {japanCountries.map(country => (
              <option key={country} value={country}>
                {country} ({japanCitiesFull.filter(c => c.country === country).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            Total Cities
          </div>
          <p className="text-3xl font-bold text-pink-600">{filteredCities.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Users className="w-4 h-4" />
            Total Population
          </div>
          <p className="text-3xl font-bold text-rose-600">{(totalPopulation / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            With Targets
          </div>
          <p className="text-3xl font-bold text-green-600">{citiesWithTargets}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Factory className="w-4 h-4" />
            With Inventory
          </div>
          <p className="text-3xl font-bold text-blue-600">{citiesWithInventory}</p>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-pink-50 px-5 py-3 border-b border-pink-100">
          <h2 className="font-semibold text-pink-800 flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            Reporting Cities ({filteredCities.length})
          </h2>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCities.map((city) => {
            const population = city.q1_0?.find(q => q['Population^'])?.['Population^'] || 'N/A'
            const hasTargets = city.q6_1_1 && city.q6_1_1.length > 0
            const hasInventory = city.q3_1 && city.q3_1.length > 0

            return (
              <button
                key={city.id}
                onClick={() => handleCityClick(city.id)}
                className="text-left bg-gray-50 hover:bg-pink-50 rounded-lg border border-gray-200 hover:border-pink-300 p-4 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{city.name}</h3>
                    <p className="text-sm text-gray-500">{city.country}</p>
                  </div>
                  <MapPin className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Pop: {population}</span>
                </div>
                <div className="flex gap-2">
                  {hasTargets && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      Targets
                    </span>
                  )}
                  {hasInventory && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                      Inventory
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default JapanCitiesDashboard
