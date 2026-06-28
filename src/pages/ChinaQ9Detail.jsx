import React from 'react'
import {
  Globe, Zap, Shield, TrendingDown, DollarSign, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { chinaCitiesFull } from '../data/chinaCitiesFull'

function ChinaQ9Detail() {
  const { selectedId, isChinaCity } = useOrganization()

  const city = chinaCitiesFull.find(c => c.id === selectedId) || chinaCitiesFull[0]

  if (!isChinaCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a China city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a China entity</p>
      </div>
    )
  }

  const q9_1 = city.q9_1 || []
  const q9_2 = city.q9_2 || []
  const q9_3 = city.q9_3 || []
  const q9_4 = city.q9_4 || []

  const hasData = q9_1.length > 0 || q9_2.length > 0 || q9_3.length > 0 || q9_4.length > 0

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
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q9 - Climate Actions</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingDown className="w-4 h-4" />
            Mitigation Actions
          </div>
          <p className="text-3xl font-bold text-red-600">{q9_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Shield className="w-4 h-4" />
            Adaptation Actions
          </div>
          <p className="text-3xl font-bold text-rose-600">{q9_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Zap className="w-4 h-4" />
            Projects
          </div>
          <p className="text-3xl font-bold text-pink-600">{q9_3.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Finance Data
          </div>
          <p className="text-3xl font-bold text-gray-600">{q9_4.length}</p>
        </div>
      </div>

      {/* Q9.1 - Mitigation Actions */}
      {q9_1.length > 0 && (
        <div id="q9_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q9.1 - Mitigation Actions ({q9_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q9_1.map((action, idx) => {
              const sector = action['Sector^'] || action.row_name || 'General'
              const status = action['Status of action in reporting year^'] || ''
              const description = action['Action description^'] || ''
              const emissionsSaved = action['Total annual emissions reduced/avoided (metric tonnes CO2e)^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      {sector}
                    </span>
                    {status && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {status}
                      </span>
                    )}
                  </div>
                  {description && (
                    <p className="text-sm text-gray-700 mb-2 line-clamp-3">{description}</p>
                  )}
                  {emissionsSaved && (
                    <p className="text-sm text-green-600 font-medium">
                      -{parseFloat(emissionsSaved).toLocaleString()} tCO2e saved
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q9.2 - Adaptation Actions */}
      {q9_2.length > 0 && (
        <div id="q9_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-rose-50 px-5 py-3 border-b border-rose-100">
            <h3 className="font-semibold text-rose-800 flex items-center">
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
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs font-medium">
                      {sector}
                    </span>
                    {status && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {status}
                      </span>
                    )}
                  </div>
                  {description && (
                    <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q9.3 - Projects */}
      {q9_3.length > 0 && (
        <div id="q9_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Q9.3 - Climate Projects
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_3.map((item, idx) => (
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

      {/* Q9.4 - Finance */}
      {q9_4.length > 0 && (
        <div id="q9_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Q9.4 - Climate Finance
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_4.map((item, idx) => (
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

export default ChinaQ9Detail
