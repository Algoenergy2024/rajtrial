import React from 'react'
import {
  Globe, Shield, Leaf, FileText, AlertTriangle, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaQ5Detail() {
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

  const q5_1 = city.q5_1 || []
  const q5_2 = city.q5_2 || []
  const q5_3 = city.q5_3 || []
  const q5_4 = city.q5_4 || []
  const q5_5 = city.q5_5 || []

  const hasData = q5_1.length > 0 || q5_2.length > 0 || q5_3.length > 0 || q5_4.length > 0 || q5_5.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q5 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q5 Adaptation data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q5 - Adaptation</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Adaptation Status
          </div>
          <p className="text-3xl font-bold text-sky-600">{q5_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Shield className="w-4 h-4" />
            Actions
          </div>
          <p className="text-3xl font-bold text-blue-600">{q5_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Vulnerabilities
          </div>
          <p className="text-3xl font-bold text-red-600">{q5_3.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Leaf className="w-4 h-4" />
            Goals
          </div>
          <p className="text-3xl font-bold text-green-600">{q5_4.length + q5_5.length}</p>
        </div>
      </div>

      {/* Q5.1 - Adaptation Status */}
      {q5_1.length > 0 && (
        <div id="q5_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q5.1 - Adaptation Status
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_1.map((item, idx) => (
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

      {/* Q5.2 - Adaptation Actions */}
      {q5_2.length > 0 && (
        <div id="q5_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q5.2 - Adaptation Actions ({q5_2.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q5_2.map((item, idx) => {
              const actionName = item['Adaptation action^'] || item.row_name || 'Adaptation Action'
              const sector = item['Sector^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {actionName}
                    </span>
                    {sector && (
                      <span className="text-xs text-gray-500">{sector}</span>
                    )}
                  </div>
                  {Object.entries(item)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Adaptation action^', 'Sector^'].includes(k))
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <p key={key} className="text-sm text-gray-600 mb-1">
                        {key.replace(/\^/g, '')}: {value || 'N/A'}
                      </p>
                    ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q5.3 - Social Vulnerabilities */}
      {q5_3.length > 0 && (
        <div id="q5_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Q5.3 - Social Vulnerabilities ({q5_3.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_3.map((item, idx) => (
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

      {/* Q5.4 - Adaptation Goals */}
      {q5_4.length > 0 && (
        <div id="q5_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q5.4 - Adaptation Goals ({q5_4.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_4.map((item, idx) => (
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

      {/* Q5.5 - Additional Adaptation */}
      {q5_5.length > 0 && (
        <div id="q5_5" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q5.5 - Additional Adaptation Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_5.map((item, idx) => (
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

export default NorthAmericaQ5Detail
