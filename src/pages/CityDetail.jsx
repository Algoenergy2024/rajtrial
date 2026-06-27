import React from 'react'
import {
  MapPin, Users, Building, Thermometer, Droplets, Wind, Target,
  AlertTriangle, Leaf, TrendingDown, FileText, Globe, CheckCircle, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { COUNTRY_COLORS } from '../data/europeanCities'

function CityDetail() {
  const { selectedEntity, isCity } = useOrganization()

  if (!isCity || !selectedEntity) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a European city</p>
      </div>
    )
  }

  const city = selectedEntity
  const countryColor = COUNTRY_COLORS[city.country] || '#6B7280'

  const formatNumber = (num) => {
    if (!num) return 'N/A'
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${countryColor}, ${countryColor}99)` }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">{city.name}</h2>
                <p className="text-white/80">{city.country} • CDP Region: {city.cdpRegion}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{formatNumber(city.population)}</div>
            <span className="text-white/80">Population</span>
          </div>
        </div>
      </div>

      {/* CDP Questionnaire Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Q1 - City Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q1 - City Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Q1.2 - Population</p>
                <p className="text-xl font-bold text-gray-800">{city.population?.toLocaleString() || 'N/A'}</p>
                {city.populationYear && <p className="text-xs text-gray-500">Year: {city.populationYear}</p>}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Q1.2 - Area</p>
                <p className="text-xl font-bold text-gray-800">{city.area ? `${city.area.toLocaleString()} km²` : 'N/A'}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">CDP Number</p>
              <p className="font-medium text-gray-700">#{city.cdpNumber}</p>
            </div>
          </div>
        </div>

        {/* Q2 - Climate Hazards */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Q2.2 - Climate Hazards
            </h3>
          </div>
          <div className="p-5">
            {city.hazards && city.hazards.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {city.hazards.map((hazard, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {hazard}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hazard data reported</p>
            )}
          </div>
        </div>

        {/* Q3 - Emissions Inventory */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q3.1.2 - Emissions Inventory
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-500">Scope 1 (Direct)</p>
                <p className="text-xl font-bold text-blue-600">
                  {city.emissions?.scope1 ? formatNumber(city.emissions.scope1) : 'N/A'}
                </p>
                <p className="text-xs text-gray-500">tCO2e</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-500">Scope 2 (Energy)</p>
                <p className="text-xl font-bold text-green-600">
                  {city.emissions?.scope2 ? formatNumber(city.emissions.scope2) : 'N/A'}
                </p>
                <p className="text-xs text-gray-500">tCO2e</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-500">Scope 3 (Indirect)</p>
                <p className="text-xl font-bold text-purple-600">
                  {city.emissions?.scope3 ? formatNumber(city.emissions.scope3) : 'N/A'}
                </p>
                <p className="text-xs text-gray-500">tCO2e</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-500">Total (S1 + S2)</p>
                <p className="text-xl font-bold text-orange-600">
                  {city.emissions?.total ? formatNumber(city.emissions.total) : 'N/A'}
                </p>
                <p className="text-xs text-gray-500">tCO2e</p>
              </div>
            </div>
            {city.inventoryYear && (
              <div className="flex items-center text-sm text-gray-500">
                <Info className="w-4 h-4 mr-2" />
                Inventory Year: {city.inventoryYear}
                {city.protocol && ` • Protocol: ${city.protocol}`}
              </div>
            )}
          </div>
        </div>

        {/* Q6 - Emissions Reduction Target */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q6.1.1 - Emissions Reduction Target
            </h3>
          </div>
          <div className="p-5">
            {city.target && (city.target.year || city.target.reduction) ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Target Year</p>
                    <p className="text-2xl font-bold text-purple-600">{city.target.year || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Reduction Target</p>
                    <p className="text-2xl font-bold text-green-600">
                      {city.target.reduction ? `-${city.target.reduction}%` : 'N/A'}
                    </p>
                  </div>
                </div>
                {city.target.baseline && (
                  <p className="text-sm text-gray-500">
                    Baseline Year: {city.target.baseline}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No target data reported</p>
            )}
          </div>
        </div>
      </div>

      {/* Q9 - Mitigation Actions */}
      {city.actions && city.actions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q9.2 - Mitigation Actions
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {city.actions.map((action, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Source */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 mt-0.5 text-gray-400" />
          <div>
            <span className="font-medium">Data Source:</span> CDP 2025 Full Cities Public Data (fjfh-2t9d)
            <br />
            <span className="text-gray-500">
              CDP Number: {city.cdpNumber} • Region: {city.cdpRegion} • Country: {city.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityDetail
