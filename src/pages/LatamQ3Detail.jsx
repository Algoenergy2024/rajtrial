import React from 'react'
import {
  Globe, Factory, FileText, TrendingUp, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { latamCitiesFull } from '../data/latamCitiesFull'

function LatamQ3Detail() {
  const { selectedId, isLatamCity } = useOrganization()

  const city = latamCitiesFull.find(c => c.id === selectedId) || latamCitiesFull[0]

  if (!isLatamCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a Latin America city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a Latin America entity</p>
      </div>
    )
  }

  const q3_1 = city.q3_1 || []
  const q3_1_1 = city.q3_1_1 || []
  const q3_1_3 = city.q3_1_3 || []
  const q3_2 = city.q3_2 || []
  const q3_3 = city.q3_3 || []

  const hasData = q3_1.length > 0 || q3_1_1.length > 0 || q3_1_3.length > 0 || q3_2.length > 0 || q3_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q3 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q3 Emissions Inventory data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Factory className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q3 - Emissions Inventory</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Inventory Status
          </div>
          <p className="text-3xl font-bold text-emerald-600">{q3_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <FileText className="w-4 h-4" />
            Documents
          </div>
          <p className="text-3xl font-bold text-teal-600">{q3_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Factory className="w-4 h-4" />
            Sector Emissions
          </div>
          <p className="text-3xl font-bold text-gray-600">{q3_1_3.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            Tracking
          </div>
          <p className="text-3xl font-bold text-green-600">{q3_3.length}</p>
        </div>
      </div>

      {/* Q3.1 - Inventory Status */}
      {q3_1.length > 0 && (
        <div id="q3_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q3.1 - GHG Inventory Status
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

      {/* Q3.1.1 - Inventory Documents */}
      {q3_1_1.length > 0 && (
        <div id="q3_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q3.1.1 - Inventory Documents
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1_1.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

      {/* Q3.1.3 - Sector Emissions */}
      {q3_1_3.length > 0 && (
        <div id="q3_1_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <Factory className="w-4 h-4 mr-2" />
              Q3.1.3 - Sector Emissions ({q3_1_3.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q3_1_3.map((item, idx) => {
              const sector = item['Sector^'] || item.row_name || 'Unknown Sector'
              const emissions = item['Total Scope 1 emissions (metric tonnes CO2e)^'] || ''
              const scope2 = item['Total Scope 2 emissions (metric tonnes CO2e)^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                      {sector}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {emissions && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Scope 1:</span>
                        <span className="font-medium text-gray-700">{parseFloat(emissions).toLocaleString()} tCO2e</span>
                      </div>
                    )}
                    {scope2 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Scope 2:</span>
                        <span className="font-medium text-gray-700">{parseFloat(scope2).toLocaleString()} tCO2e</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q3.2 - Consumption-Based Inventory */}
      {q3_2.length > 0 && (
        <div id="q3_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Q3.2 - Consumption-Based Inventory
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_2.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

      {/* Q3.3 - Tracking */}
      {q3_3.length > 0 && (
        <div id="q3_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Q3.3 - Emissions Tracking
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_3.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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
    </div>
  )
}

export default LatamQ3Detail
