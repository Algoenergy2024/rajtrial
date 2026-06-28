import React, { useState } from 'react'
import {
  Globe, TrendingUp, Target, Factory, Users, BarChart3
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { japanCitiesFull } from '../data/japanCitiesFull'

function JapanCityComparison() {
  const { isJapanCity, japanCountries, selectedCountry, setSelectedCountry } = useOrganization()
  const [sortBy, setSortBy] = useState('name')

  if (!isJapanCity) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select Japan Cities category</h3>
        <p className="text-gray-500">Switch to Japan Cities to view comparison</p>
      </div>
    )
  }

  const filteredCities = selectedCountry === 'all'
    ? japanCitiesFull
    : japanCitiesFull.filter(c => c.country === selectedCountry)

  const cityData = filteredCities.map(city => {
    const popField = city.q1_0?.find(q => q['Population^'])
    const population = parseInt(popField?.['Population^']?.replace(/,/g, '') || '0')

    return {
      id: city.id,
      name: city.name,
      country: city.country,
      population,
      hazards: city.q2_2?.length || 0,
      targets: city.q6_1_1?.length || 0,
      mitigationActions: city.q9_1?.length || 0,
      adaptationActions: city.q9_2?.length || 0,
      plans: city.q8_1_1?.length || 0,
    }
  })

  const sortedCities = [...cityData].sort((a, b) => {
    switch (sortBy) {
      case 'population': return b.population - a.population
      case 'hazards': return b.hazards - a.hazards
      case 'targets': return b.targets - a.targets
      case 'actions': return (b.mitigationActions + b.adaptationActions) - (a.mitigationActions + a.adaptationActions)
      default: return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Japan City Comparison</h1>
            <p className="text-white/80">Compare CDP reporting metrics across Japan cities</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Country:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Countries</option>
              {japanCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="name">City Name</option>
              <option value="population">Population</option>
              <option value="hazards">Climate Hazards</option>
              <option value="targets">Emission Targets</option>
              <option value="actions">Climate Actions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-pink-50 px-5 py-3 border-b border-pink-100">
          <h2 className="font-semibold text-pink-800 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            City Metrics Comparison ({sortedCities.length} cities)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">City</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Country</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Population</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Hazards</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Targets</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Mitigation</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Adaptation</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Plans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedCities.map((city, idx) => (
                <tr key={city.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-800">{city.name}</td>
                  <td className="px-4 py-3 text-gray-600">{city.country}</td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {city.population > 0 ? city.population.toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      city.hazards > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {city.hazards}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      city.targets > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {city.targets}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      city.mitigationActions > 0 ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {city.mitigationActions}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      city.adaptationActions > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {city.adaptationActions}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      city.plans > 0 ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {city.plans}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default JapanCityComparison
