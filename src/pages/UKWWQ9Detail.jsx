import React from 'react'
import {
  Globe, Zap, TrendingDown, Shield, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ9Detail() {
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

  const q9_1 = city.q9_1 || []
  const q9_2 = city.q9_2 || []
  const q9_3 = city.q9_3 || []

  const hasData = q9_1.length > 0 || q9_2.length > 0 || q9_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q9 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q9 Climate Actions data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q9 - Climate Actions</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingDown className="w-4 h-4" />
            Mitigation Actions
          </div>
          <p className="text-3xl font-bold text-amber-600">{q9_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Shield className="w-4 h-4" />
            Adaptation Actions
          </div>
          <p className="text-3xl font-bold text-orange-600">{q9_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Additional Info
          </div>
          <p className="text-3xl font-bold text-gray-600">{q9_3.length}</p>
        </div>
      </div>

      {/* Q9.1 - Mitigation Actions */}
      {q9_1.length > 0 && (
        <div id="q9_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q9.1 - Mitigation Actions ({q9_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q9_1.map((action, idx) => {
              const sector = action['Sector^'] || action.row_name || 'General'
              const status = action['Status of action in reporting year^'] || ''
              const description = action['Action description^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                      {sector}
                    </span>
                    {status && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {status}
                      </span>
                    )}
                  </div>
                  {description && (
                    <p className="text-sm text-gray-700 mb-3">{description}</p>
                  )}
                  <div className="space-y-1 text-xs text-gray-600">
                    {action['Total annual emissions reduced/avoided (metric tonnes CO2e)^'] && (
                      <p className="text-green-600 font-medium">
                        Emissions reduced: {parseFloat(action['Total annual emissions reduced/avoided (metric tonnes CO2e)^']).toLocaleString()} tCO2e
                      </p>
                    )}
                    {action['Co-benefit area^'] && (
                      <p><span className="font-medium">Co-benefits:</span> {action['Co-benefit area^']}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q9.2 - Adaptation Actions */}
      {q9_2.length > 0 && (
        <div id="q9_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q9.2 - Adaptation Actions ({q9_2.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q9_2.map((action, idx) => {
              const sector = action['Sector^'] || action.row_name || 'General'
              const status = action['Status of action in reporting year^'] || ''
              const description = action['Action description^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                      {sector}
                    </span>
                    {status && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {status}
                      </span>
                    )}
                  </div>
                  {description && (
                    <p className="text-sm text-gray-700 mb-2">{description}</p>
                  )}
                  {action['Co-benefit area^'] && (
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Co-benefits:</span> {action['Co-benefit area^']}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q9.3 - Additional Info */}
      {q9_3.length > 0 && (
        <div id="q9_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q9.3 - Additional Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_3.map((item, idx) => (
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

export default UKWWQ9Detail
