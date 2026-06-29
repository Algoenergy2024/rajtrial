import React from 'react'
import {
  Globe, CloudRain, AlertTriangle, Shield, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaQ2Detail() {
  const { selectedId, isNorthAmericaCity } = useOrganization()

  const city = northAmericaCitiesFull.find(c => c.id === selectedId) || northAmericaCitiesFull[0]

  if (!isNorthAmericaCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a North America city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a North America entity</p>
      </div>
    )
  }

  const q2_1 = city.q2_1 || []
  const q2_1_1 = city.q2_1_1 || []
  const q2_2 = city.q2_2 || []
  const q2_3 = city.q2_3 || []

  const hasData = q2_1.length > 0 || q2_1_1.length > 0 || q2_2.length > 0 || q2_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <CloudRain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q2 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q2 Climate Hazards data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <CloudRain className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q2 - Climate Hazards & Vulnerability</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Assessment Status
          </div>
          <p className="text-3xl font-bold text-sky-600">{q2_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <CloudRain className="w-4 h-4" />
            Assessments
          </div>
          <p className="text-3xl font-bold text-blue-600">{q2_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Climate Hazards
          </div>
          <p className="text-3xl font-bold text-red-600">{q2_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Shield className="w-4 h-4" />
            Adaptive Capacity
          </div>
          <p className="text-3xl font-bold text-green-600">{q2_3.length}</p>
        </div>
      </div>

      {/* Q2.1 - Assessment Status */}
      {q2_1.length > 0 && (
        <div id="q2_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q2.1 - Climate Risk Assessment Status
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_1.map((item, idx) => (
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

      {/* Q2.1.1 - Risk Assessments */}
      {q2_1_1.length > 0 && (
        <div id="q2_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <CloudRain className="w-4 h-4 mr-2" />
              Q2.1.1 - Risk Assessments ({q2_1_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_1_1.map((item, idx) => (
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

      {/* Q2.2 - Climate Hazards */}
      {q2_2.length > 0 && (
        <div id="q2_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Q2.2 - Climate Hazards ({q2_2.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q2_2.map((hazard, idx) => {
              const hazardType = hazard['Climate hazards^'] || hazard.row_name || 'Unknown'
              const probability = hazard['Current probability of hazard^'] || ''
              const magnitude = hazard['Current magnitude of hazard^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      {hazardType}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {probability && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Probability:</span>
                        <span className="font-medium text-gray-700">{probability}</span>
                      </div>
                    )}
                    {magnitude && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Magnitude:</span>
                        <span className="font-medium text-gray-700">{magnitude}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q2.3 - Adaptive Capacity */}
      {q2_3.length > 0 && (
        <div id="q2_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q2.3 - Adaptive Capacity
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_3.map((item, idx) => (
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

export default NorthAmericaQ2Detail
