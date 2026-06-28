import React from 'react'
import {
  Globe, Target, TrendingDown, BarChart3, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ6Detail() {
  const { selectedId, isUKWWCity } = useOrganization()

  const ukwwCities = euCitiesFull.filter(c => UKWW_COUNTRIES.includes(c.country))
  const city = ukwwCities.find(c => c.id === selectedId) || ukwwCities[0]

  if (!isUKWWCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UKWW city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a UKWW entity</p>
      </div>
    )
  }

  const q6_1_1 = city.q6_1_1 || []
  const q6_1_2 = city.q6_1_2 || []
  const q6_2 = city.q6_2 || []
  const q6_3 = city.q6_3 || []

  const hasData = q6_1_1.length > 0 || q6_1_2.length > 0 || q6_2.length > 0 || q6_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q6 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q6 Emissions Reduction Targets data</p>
      </div>
    )
  }

  const statusColors = {
    'Achieved': 'bg-green-100 text-green-700 border-green-200',
    'On track': 'bg-blue-100 text-blue-700 border-blue-200',
    'Underway': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Not started': 'bg-gray-100 text-gray-600 border-gray-200'
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q6 - Emissions Reduction Targets</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            City-Wide Targets
          </div>
          <p className="text-3xl font-bold text-amber-600">{q6_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingDown className="w-4 h-4" />
            Sector Targets
          </div>
          <p className="text-3xl font-bold text-orange-600">{q6_1_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <BarChart3 className="w-4 h-4" />
            Q6.2 Data
          </div>
          <p className="text-3xl font-bold text-yellow-600">{q6_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Additional Info
          </div>
          <p className="text-3xl font-bold text-gray-600">{q6_3.length}</p>
        </div>
      </div>

      {/* Q6.1.1 - City-Wide Targets */}
      {q6_1_1.length > 0 && (
        <div id="q6_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q6.1.1 - City-Wide Emission Reduction Targets ({q6_1_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q6_1_1.map((target, idx) => {
              const status = target['Status of target in reporting year^'] || ''
              return (
                <div key={idx} className={`rounded-lg border-2 p-4 ${statusColors[status] || 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-white/50 text-gray-700 rounded text-xs font-medium">
                      {target['Emission reduction target type^'] || target.row_name || 'Target'}
                    </span>
                    {status && (
                      <span className="text-xs font-medium">{status}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Baseline Year</p>
                      <p className="font-semibold text-gray-800">{target['Baseline year^'] || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Target Year</p>
                      <p className="font-semibold text-gray-800">{target['Target year^'] || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reduction</p>
                      <p className="font-semibold text-green-600">
                        {target['Percentage of reduction target (from base year)^'] ? `-${target['Percentage of reduction target (from base year)^']}%` : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {target['Baseline emissions (metric tonnes CO2e)^'] && (
                    <p className="text-sm text-gray-600">
                      Baseline: {parseFloat(target['Baseline emissions (metric tonnes CO2e)^']).toLocaleString()} tCO2e
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q6.1.2 - Sector Targets */}
      {q6_1_2.length > 0 && (
        <div id="q6_1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q6.1.2 - Sector-Specific Targets ({q6_1_2.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_1_2.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q6.2 */}
      {q6_2.length > 0 && (
        <div id="q6_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Q6.2 - Target Details
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_2.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q6.3 */}
      {q6_3.length > 0 && (
        <div id="q6_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q6.3 - Additional Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_3.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800 whitespace-pre-wrap">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default UKWWQ6Detail
