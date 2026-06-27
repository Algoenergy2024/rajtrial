import React, { useState, useMemo } from 'react'
import {
  TrendingUp, MapPin, Factory, AlertTriangle, Target, Users,
  Plus, X, ChevronDown, BarChart3, ArrowUpRight, Globe
} from 'lucide-react'
import { euCitiesFull } from '../data/euCitiesFull'

function EUCityComparison() {
  const [selectedCities, setSelectedCities] = useState([])
  const [showSelector, setShowSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const cities = euCitiesFull

  const getCityEmissions = (city) => {
    let scope1 = 0, scope2 = 0, scope3 = 0
    const sectors = city.q3_1_3 || []
    if (sectors.length > 0) {
      sectors.forEach(sector => {
        scope1 += parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
        scope2 += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
        scope3 += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
      })
    }
    return { scope1, scope2, scope3, total: scope1 + scope2 + scope3 }
  }

  const getPopulation = (city) => city.q1_2?.[0]?.population || city.q1_2?.[0]?.['Population^'] || 0
  const getHazardCount = (city) => city.q2_2?.length || 0
  const getTargetCount = (city) => city.q6_1_1?.length || 0
  const getActionCount = (city) => (city.q9_1?.length || 0) + (city.q9_2?.length || 0)

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K'
    return num?.toLocaleString() || '0'
  }

  const filteredCities = cities
    .filter(c => !selectedCities.find(s => s.id === c.id))
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))

  const addCity = (city) => {
    if (selectedCities.length < 5) {
      setSelectedCities([...selectedCities, city])
    }
    setShowSelector(false)
    setSearchTerm('')
  }

  const removeCity = (cityId) => {
    setSelectedCities(selectedCities.filter(c => c.id !== cityId))
  }

  const comparisonData = useMemo(() => {
    return selectedCities.map(city => ({
      city,
      population: getPopulation(city),
      emissions: getCityEmissions(city),
      hazards: getHazardCount(city),
      targets: getTargetCount(city),
      actions: getActionCount(city)
    }))
  }, [selectedCities])

  const getMaxValue = (key) => {
    if (comparisonData.length === 0) return 0
    if (key === 'emissions') {
      return Math.max(...comparisonData.map(d => d.emissions.total))
    }
    return Math.max(...comparisonData.map(d => d[key]))
  }

  const getBarWidth = (value, maxValue) => {
    if (!maxValue) return 0
    return (value / maxValue) * 100
  }

  const colors = [
    { bg: 'bg-green-100', bar: 'bg-green-500', text: 'text-green-700', border: 'border-green-200' },
    { bg: 'bg-emerald-100', bar: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200' },
    { bg: 'bg-teal-100', bar: 'bg-teal-500', text: 'text-teal-700', border: 'border-teal-200' },
    { bg: 'bg-cyan-100', bar: 'bg-cyan-500', text: 'text-cyan-700', border: 'border-cyan-200' },
    { bg: 'bg-sky-100', bar: 'bg-sky-500', text: 'text-sky-700', border: 'border-sky-200' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">EU City Comparison</h1>
            <p className="text-white/80">Compare emissions, hazards, and climate actions across cities</p>
          </div>
        </div>
        <p className="text-white/70 text-sm">
          Select up to 5 cities to compare their CDP data side by side
        </p>
      </div>

      {/* City Selector */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Selected Cities ({selectedCities.length}/5)</h2>
          {selectedCities.length < 5 && (
            <div className="relative">
              <button
                onClick={() => setShowSelector(!showSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add City
                <ChevronDown className={`w-4 h-4 transition-transform ${showSelector ? 'rotate-180' : ''}`} />
              </button>

              {showSelector && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                  <div className="p-3 border-b border-gray-100">
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredCities.slice(0, 20).map(city => (
                      <button
                        key={city.id}
                        onClick={() => addCity(city)}
                        className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-3"
                      >
                        <Globe className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{city.name}</p>
                          <p className="text-xs text-gray-500">{city.country}</p>
                        </div>
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <p className="px-4 py-3 text-sm text-gray-500">No cities found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {selectedCities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No cities selected. Add cities to start comparing.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedCities.map((city, idx) => (
              <div
                key={city.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${colors[idx].bg} ${colors[idx].border} border`}
              >
                <Globe className={`w-4 h-4 ${colors[idx].text}`} />
                <span className={`font-medium ${colors[idx].text}`}>{city.name}</span>
                <span className={`text-xs ${colors[idx].text} opacity-70`}>({city.country})</span>
                <button
                  onClick={() => removeCity(city.id)}
                  className="p-0.5 rounded hover:bg-white/50 transition-colors"
                >
                  <X className={`w-4 h-4 ${colors[idx].text}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCities.length > 0 && (
        <>
          {/* Population Comparison */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Population</h3>
            </div>
            <div className="space-y-3">
              {comparisonData.map((data, idx) => (
                <div key={data.city.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700 truncate">{data.city.name}</div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${colors[idx].bar} transition-all duration-500 flex items-center justify-end pr-2`}
                      style={{ width: `${getBarWidth(data.population, getMaxValue('population'))}%` }}
                    >
                      {data.population > 0 && (
                        <span className="text-xs font-medium text-white">{formatNumber(data.population)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emissions Comparison */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Factory className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Total Emissions (tCO2e)</h3>
            </div>
            <div className="space-y-3">
              {comparisonData.map((data, idx) => (
                <div key={data.city.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700 truncate">{data.city.name}</div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${colors[idx].bar} transition-all duration-500 flex items-center justify-end pr-2`}
                      style={{ width: `${getBarWidth(data.emissions.total, getMaxValue('emissions'))}%` }}
                    >
                      {data.emissions.total > 0 && (
                        <span className="text-xs font-medium text-white">{formatNumber(data.emissions.total)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scope breakdown */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 font-medium mb-3">Scope 1 (Direct)</p>
                <div className="space-y-2">
                  {comparisonData.map((data, idx) => (
                    <div key={data.city.id} className="flex items-center justify-between">
                      <span className={`text-xs ${colors[idx].text}`}>{data.city.name}</span>
                      <span className="text-sm font-medium text-purple-700">{formatNumber(data.emissions.scope1)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-600 font-medium mb-3">Scope 2 (Grid)</p>
                <div className="space-y-2">
                  {comparisonData.map((data, idx) => (
                    <div key={data.city.id} className="flex items-center justify-between">
                      <span className={`text-xs ${colors[idx].text}`}>{data.city.name}</span>
                      <span className="text-sm font-medium text-indigo-700">{formatNumber(data.emissions.scope2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium mb-3">Scope 3 (Outside)</p>
                <div className="space-y-2">
                  {comparisonData.map((data, idx) => (
                    <div key={data.city.id} className="flex items-center justify-between">
                      <span className={`text-xs ${colors[idx].text}`}>{data.city.name}</span>
                      <span className="text-sm font-medium text-blue-700">{formatNumber(data.emissions.scope3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hazards & Targets Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-gray-800">Climate Hazards</h3>
              </div>
              <div className="space-y-3">
                {comparisonData.map((data, idx) => (
                  <div key={data.city.id} className="flex items-center gap-4">
                    <div className="w-28 text-sm font-medium text-gray-700 truncate">{data.city.name}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${colors[idx].bar} transition-all duration-500 flex items-center justify-end pr-2`}
                        style={{ width: `${getBarWidth(data.hazards, getMaxValue('hazards'))}%` }}
                      >
                        {data.hazards > 0 && (
                          <span className="text-xs font-medium text-white">{data.hazards}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">Emissions Targets</h3>
              </div>
              <div className="space-y-3">
                {comparisonData.map((data, idx) => (
                  <div key={data.city.id} className="flex items-center gap-4">
                    <div className="w-28 text-sm font-medium text-gray-700 truncate">{data.city.name}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${colors[idx].bar} transition-all duration-500 flex items-center justify-end pr-2`}
                        style={{ width: `${getBarWidth(data.targets, getMaxValue('targets'))}%` }}
                      >
                        {data.targets > 0 && (
                          <span className="text-xs font-medium text-white">{data.targets}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Comparison Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">City</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Country</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Population</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Emissions</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Hazards</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Targets</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonData.map((data, idx) => (
                    <tr key={data.city.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors[idx].bar}`}></div>
                          <span className="font-medium text-gray-800">{data.city.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{data.city.country}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatNumber(data.population)}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatNumber(data.emissions.total)}</td>
                      <td className="px-6 py-4 text-right">
                        {data.hazards > 0 ? (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">{data.hazards}</span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {data.targets > 0 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">{data.targets}</span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {data.actions > 0 ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{data.actions}</span>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EUCityComparison
