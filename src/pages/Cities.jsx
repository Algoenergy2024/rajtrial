import React, { useState } from 'react'
import {
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'
import {
  Building, Target, Leaf, Users, Car, Zap, TreePine, Shield,
  CheckCircle, AlertTriangle, Info, TrendingUp, MapPin, Award
} from 'lucide-react'
import { cities, getCityComparisonData, calculateCityAverages, getEUMissionCities } from '../data/belgianCities'

const REGION_COLORS = {
  'Brussels-Capital': '#8B5CF6',
  'Flanders': '#3B82F6',
  'Wallonia': '#10B981'
}

const SCORE_COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']

function Cities() {
  const [selectedCity, setSelectedCity] = useState(null)
  const comparisonData = getCityComparisonData()
  const averages = calculateCityAverages()
  const euMissionCities = getEUMissionCities()

  const radarData = cities.map(city => ({
    name: city.name.replace(' Capital Region', ''),
    climate: city.scores.climate * 10,
    adaptation: city.scores.adaptation * 10,
    governance: city.scores.governance * 10,
    mobility: city.scores.mobility * 10
  }))

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
              <h2 className="text-2xl font-bold">Belgian Cities Climate Action</h2>
            </div>
            <p className="mt-2 text-indigo-100">
              Climate commitments, emissions reduction targets, and sustainability initiatives across Belgian cities
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{cities.length}</div>
            <span className="text-indigo-200">Cities Tracked</span>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Covenant Signatories</p>
              <p className="text-2xl font-bold text-gray-800">{cities.filter(c => c.climate.covenantOfMayors).length}/{cities.length}</p>
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
              <p className="text-2xl font-bold text-gray-800">{cities.filter(c => c.mobility?.lowEmissionZone).length}</p>
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
                to achieve climate neutrality by 2030 and act as experimentation hubs for other European cities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(city => (
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
              {city.energy?.renewableElectricity && (
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-500">Renewable Energy:</span>
                  <span className="font-semibold text-green-600">{city.energy.renewableElectricity}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected City Detail */}
      {selectedCity && (
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
            {/* Targets & Emissions */}
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
                  {selectedCity.targets.reductionTarget?.baseline && (
                    <p className="text-xs text-gray-500">vs {selectedCity.targets.reductionTarget.baseline}</p>
                  )}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Net Zero Target</p>
                  <p className="text-xl font-bold text-gray-800">{selectedCity.targets.netZeroTarget || 'N/A'}</p>
                </div>
                {selectedCity.emissions?.perCapita?.value && (
                  <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                    <p className="text-xs text-gray-500">Per Capita Emissions</p>
                    <p className="text-xl font-bold text-gray-800">{selectedCity.emissions.perCapita.value} tCO2e</p>
                    {selectedCity.emissions.perCapita.note && (
                      <p className="text-xs text-gray-500">{selectedCity.emissions.perCapita.note}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobility */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <Car className="w-4 h-4 mr-2 text-purple-600" />
                Sustainable Mobility
              </h4>

              <div className="space-y-2">
                {selectedCity.mobility?.cyclingShare && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cycling Share</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${selectedCity.mobility.cyclingShare}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{selectedCity.mobility.cyclingShare}%</span>
                    </div>
                  </div>
                )}
                {selectedCity.mobility?.publicTransportShare && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Public Transport</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${selectedCity.mobility.publicTransportShare}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{selectedCity.mobility.publicTransportShare}%</span>
                    </div>
                  </div>
                )}
                {selectedCity.mobility?.evChargingPoints && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">EV Charging Points</span>
                    <span className="text-sm font-medium text-gray-800">{selectedCity.mobility.evChargingPoints.toLocaleString()}</span>
                  </div>
                )}
                {selectedCity.mobility?.lowEmissionZone && (
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Low Emission Zone {selectedCity.mobility.lezYear ? `since ${selectedCity.mobility.lezYear}` : 'active'}
                  </div>
                )}
              </div>
            </div>

            {/* Initiatives */}
            <div className="space-y-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <Leaf className="w-4 h-4 mr-2 text-green-600" />
                Key Climate Initiatives
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCity.initiatives.map((initiative, idx) => (
                  <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{initiative.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        initiative.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {initiative.status === 'active' ? 'Active' : 'In Progress'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{initiative.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reduction Targets Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">2030 Emissions Reduction Targets (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={comparisonData.filter(c => c.name !== 'Brussels')}
              layout="vertical"
              margin={{ left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="emissionsReduction" fill="#10B981" radius={[0, 4, 4, 0]}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={REGION_COLORS[entry.region] || '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Leuven leads with 80% reduction target as EU Mission City
          </p>
        </div>

        {/* Cycling Share */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cycling Mode Share (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={comparisonData}
              layout="vertical"
              margin={{ left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 50]} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="cyclingShare" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={REGION_COLORS[entry.region] || '#3B82F6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Leuven and Ghent lead with 40%+ cycling rates
          </p>
        </div>
      </div>

      {/* Radar Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Multi-Dimensional Climate Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={[
            { dimension: 'Climate', Brussels: 85, Antwerp: 80, Ghent: 88, Leuven: 95, Bruges: 75, Liège: 70 },
            { dimension: 'Adaptation', Brussels: 78, Antwerp: 75, Ghent: 82, Leuven: 88, Bruges: 78, Liège: 72 },
            { dimension: 'Governance', Brussels: 80, Antwerp: 78, Ghent: 85, Leuven: 90, Bruges: 75, Liège: 75 },
            { dimension: 'Mobility', Brussels: 85, Antwerp: 78, Ghent: 88, Leuven: 90, Bruges: 75, Liège: 70 }
          ]}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
            <Radar name="Brussels" dataKey="Brussels" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
            <Radar name="Antwerp" dataKey="Antwerp" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            <Radar name="Ghent" dataKey="Ghent" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
            <Radar name="Leuven" dataKey="Leuven" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Source Notice */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 mt-0.5 text-gray-400" />
          <div>
            <span className="font-medium">Data Sources:</span> Covenant of Mayors, EU Mission Cities, C40 Cities,
            City Climate Plans. CDP city scores pending API access.
            Last updated: June 2024
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cities
