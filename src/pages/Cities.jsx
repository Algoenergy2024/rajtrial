import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import {
  Building, Target, Leaf, Car, CheckCircle, Info, TrendingUp, MapPin, Award, Globe, Flag
} from 'lucide-react'
import { cities as belgianCities, getCityComparisonData, calculateCityAverages, getEUMissionCities } from '../data/belgianCities'
import { euCities, getEUCountries, COUNTRY_COLORS, getCitiesWithEmissions, getLargeCities } from '../data/euCities'

const REGION_COLORS = {
  'Brussels-Capital': '#8B5CF6',
  'Flanders': '#3B82F6',
  'Wallonia': '#10B981'
}

function Cities() {
  const [activeTab, setActiveTab] = useState('belgium')
  const [selectedCity, setSelectedCity] = useState(null)
  const [countryFilter, setCountryFilter] = useState('all')

  const comparisonData = getCityComparisonData()
  const averages = calculateCityAverages()
  const euMissionCities = getEUMissionCities()
  const euCountries = getEUCountries()
  const citiesWithEmissions = getCitiesWithEmissions()

  const filteredEUCities = countryFilter === 'all'
    ? euCities
    : euCities.filter(c => c.country === countryFilter)

  const getScoreColor = (score) => {
    if (score >= 9) return 'text-green-600 bg-green-100'
    if (score >= 8) return 'text-blue-600 bg-blue-100'
    if (score >= 7) return 'text-yellow-600 bg-yellow-100'
    return 'text-orange-600 bg-orange-100'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Building className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Cities Climate Action</h2>
            </div>
            <p className="mt-2 text-indigo-100">
              Climate commitments and sustainability initiatives across European cities
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{belgianCities.length + euCities.length}</div>
            <span className="text-indigo-200">Cities Tracked</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 inline-flex">
        <button
          onClick={() => { setActiveTab('belgium'); setSelectedCity(null); }}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            activeTab === 'belgium'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>Belgium ({belgianCities.length})</span>
        </button>
        <button
          onClick={() => { setActiveTab('eu'); setSelectedCity(null); }}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            activeTab === 'eu'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>EU Cities ({euCities.length})</span>
        </button>
      </div>

      {/* Belgian Cities Tab */}
      {activeTab === 'belgium' && (
        <>
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Covenant Signatories</p>
                  <p className="text-2xl font-bold text-gray-800">{belgianCities.filter(c => c.climate.covenantOfMayors).length}/{belgianCities.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">EU Mission Cities</p>
                  <p className="text-2xl font-bold text-gray-800">{euMissionCities.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Low Emission Zones</p>
                  <p className="text-2xl font-bold text-gray-800">{belgianCities.filter(c => c.mobility?.lowEmissionZone).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Climate Score</p>
                  <p className="text-2xl font-bold text-gray-800">{averages.esgScore.toFixed(1)}/10</p>
                </div>
              </div>
            </div>
          </div>

          {/* EU Mission City Banner */}
          {euMissionCities.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">EU Mission: 100 Climate-Neutral Cities</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    {euMissionCities.map(c => c.name).join(', ')} {euMissionCities.length === 1 ? 'is' : 'are'} part of the EU Mission
                    to achieve climate neutrality by 2030.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Belgian City Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {belgianCities.map(city => (
              <div
                key={city.id}
                onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                className={`bg-white rounded-xl shadow-sm p-5 border cursor-pointer transition-all hover:shadow-md ${
                  selectedCity?.id === city.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${REGION_COLORS[city.region]}20` }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: REGION_COLORS[city.region] }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{city.name.replace(' Capital Region', '')}</h4>
                      <p className="text-xs text-gray-500">{city.region} • Pop: {city.population.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${getScoreColor(city.esgScore)}`}>
                    {city.esgScore.toFixed(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{city.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {city.climate.covenantOfMayors && (
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Covenant</span>
                  )}
                  {city.climate.euMissionCity && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">EU Mission</span>
                  )}
                  {city.climate.c40Member && (
                    <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">C40</span>
                  )}
                  {city.mobility?.lowEmissionZone && (
                    <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">LEZ</span>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">2030 Target:</span>
                    <span className="font-semibold text-gray-800">
                      {city.targets.reductionTarget?.value ? `-${city.targets.reductionTarget.value}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Belgian City Detail */}
          {selectedCity && activeTab === 'belgium' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="p-6"
                style={{ background: `linear-gradient(135deg, ${REGION_COLORS[selectedCity.region]}15, ${REGION_COLORS[selectedCity.region]}05)` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedCity.name}</h3>
                    <p className="text-gray-600">{selectedCity.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold" style={{ color: REGION_COLORS[selectedCity.region] }}>
                      {selectedCity.esgScore.toFixed(1)}/10
                    </div>
                    <span className="text-sm text-gray-500">Climate Score</span>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-indigo-600" />
                    Targets & Emissions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">2030 Reduction Target</p>
                      <p className="text-xl font-bold text-gray-800">
                        {selectedCity.targets.reductionTarget?.value ? `-${selectedCity.targets.reductionTarget.value}%` : 'N/A'}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Net Zero Target</p>
                      <p className="text-xl font-bold text-gray-800">{selectedCity.targets.netZeroTarget || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <Leaf className="w-4 h-4 mr-2 text-green-600" />
                    Key Initiatives
                  </h4>
                  <div className="space-y-2">
                    {selectedCity.initiatives.slice(0, 3).map((initiative, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{initiative.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Belgian Cities Comparison Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2030 Emissions Reduction Targets (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="emissionsReduction" radius={[0, 4, 4, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={REGION_COLORS[entry.region] || '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* EU Cities Tab */}
      {activeTab === 'eu' && (
        <>
          {/* EU Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Countries</p>
                  <p className="text-2xl font-bold text-gray-800">{euCountries.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cities with CDP Data</p>
                  <p className="text-2xl font-bold text-gray-800">{euCities.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">With Emissions Data</p>
                  <p className="text-2xl font-bold text-gray-800">{citiesWithEmissions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Large Cities (500k+)</p>
                  <p className="text-2xl font-bold text-gray-800">{getLargeCities().length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Country Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              <span className="text-sm font-medium text-gray-500 flex-shrink-0">Filter by country:</span>
              <button
                onClick={() => setCountryFilter('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  countryFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({euCities.length})
              </button>
              {euCountries.map(country => (
                <button
                  key={country}
                  onClick={() => setCountryFilter(country)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                    countryFilter === country ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {country} ({euCities.filter(c => c.country === country).length})
                </button>
              ))}
            </div>
          </div>

          {/* EU City Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredEUCities.map(city => (
              <div
                key={city.id}
                onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                className={`bg-white rounded-xl shadow-sm p-4 border cursor-pointer transition-all hover:shadow-md ${
                  selectedCity?.id === city.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COUNTRY_COLORS[city.country] || '#6B7280'}20` }}
                    >
                      <MapPin className="w-4 h-4" style={{ color: COUNTRY_COLORS[city.country] || '#6B7280' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{city.name}</h4>
                      <p className="text-xs text-gray-500">{city.country}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Population:</span>
                    <span className="font-medium text-gray-800">{city.population?.toLocaleString() || 'N/A'}</span>
                  </div>
                  {city.inventoryYear && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Data Year:</span>
                      <span className="font-medium text-gray-800">{city.inventoryYear}</span>
                    </div>
                  )}
                  {city.emissions.total && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Emissions:</span>
                      <span className="font-medium text-green-600">{(city.emissions.total / 1000).toFixed(0)}k tCO2e</span>
                    </div>
                  )}
                </div>

                {city.emissions.total && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">CDP Reported</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selected EU City Detail */}
          {selectedCity && activeTab === 'eu' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="p-6"
                style={{ background: `linear-gradient(135deg, ${COUNTRY_COLORS[selectedCity.country] || '#6B7280'}15, ${COUNTRY_COLORS[selectedCity.country] || '#6B7280'}05)` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedCity.name}</h3>
                    <p className="text-gray-600">{selectedCity.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800">
                      {selectedCity.population?.toLocaleString()}
                    </div>
                    <span className="text-sm text-gray-500">Population</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Emissions Data (CDP 2025)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-500">Scope 1</p>
                    <p className="text-xl font-bold text-blue-600">
                      {selectedCity.emissions.scope1 ? `${(selectedCity.emissions.scope1 / 1000).toFixed(0)}k` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">tCO2e</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-500">Scope 2</p>
                    <p className="text-xl font-bold text-green-600">
                      {selectedCity.emissions.scope2 ? `${(selectedCity.emissions.scope2 / 1000).toFixed(0)}k` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">tCO2e</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-500">Scope 3</p>
                    <p className="text-xl font-bold text-purple-600">
                      {selectedCity.emissions.scope3 ? `${(selectedCity.emissions.scope3 / 1000).toFixed(0)}k` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">tCO2e</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-500">Total (S1+S2)</p>
                    <p className="text-xl font-bold text-orange-600">
                      {selectedCity.emissions.total ? `${(selectedCity.emissions.total / 1000).toFixed(0)}k` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">tCO2e</p>
                  </div>
                </div>
                {selectedCity.inventoryYear && (
                  <p className="text-sm text-gray-500 mt-4">
                    Inventory Year: {selectedCity.inventoryYear} • CDP Number: {selectedCity.cdpNumber}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* EU Cities Population Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Largest EU Cities by Population</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={euCities.slice(0, 15)} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
                <Tooltip formatter={(v) => `${v.toLocaleString()} people`} />
                <Bar dataKey="population" radius={[0, 4, 4, 0]}>
                  {euCities.slice(0, 15).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COUNTRY_COLORS[entry.country] || '#6B7280'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Data Source Notice */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 mt-0.5 text-gray-400" />
          <div>
            <span className="font-medium">Data Sources:</span> {activeTab === 'belgium'
              ? 'Covenant of Mayors, EU Mission Cities, C40 Cities, City Climate Plans'
              : 'CDP 2025 Full Cities Public Data (fjfh-2t9d)'
            }. Last updated: June 2024
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cities
