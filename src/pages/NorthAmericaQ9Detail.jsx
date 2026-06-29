import React from 'react'
import {
  Globe, Zap, Leaf, Building2, Car, Factory, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaQ9Detail() {
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

  const getSectorIcon = (sector) => {
    const s = (sector || '').toLowerCase()
    if (s.includes('energy')) return Zap
    if (s.includes('transport')) return Car
    if (s.includes('building')) return Building2
    if (s.includes('waste') || s.includes('industry')) return Factory
    return Leaf
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q9 - Climate Actions</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Zap className="w-4 h-4" />
            Mitigation Actions
          </div>
          <p className="text-3xl font-bold text-sky-600">{q9_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Leaf className="w-4 h-4" />
            Additional Actions
          </div>
          <p className="text-3xl font-bold text-blue-600">{q9_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Implementation
          </div>
          <p className="text-3xl font-bold text-green-600">{q9_3.length}</p>
        </div>
      </div>

      {/* Q9.1 - Mitigation Actions */}
      {q9_1.length > 0 && (
        <div id="q9_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Q9.1 - Mitigation Actions ({q9_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q9_1.map((action, idx) => {
              const actionName = action['Action^'] || action['Mitigation action^'] || action.row_name || 'Climate Action'
              const sector = action['Sector^'] || ''
              const status = action['Status of action^'] || action['Implementation status^'] || ''
              const Icon = getSectorIcon(sector)

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <Icon className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800 block">{actionName}</span>
                      {sector && <span className="text-xs text-gray-500">{sector}</span>}
                    </div>
                    {status && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        status.toLowerCase().includes('complete') ? 'bg-green-100 text-green-700' :
                        status.toLowerCase().includes('progress') ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {status}
                      </span>
                    )}
                  </div>
                  {Object.entries(action)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Action^', 'Mitigation action^', 'Sector^', 'Status of action^', 'Implementation status^'].includes(k))
                    .slice(0, 3)
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

      {/* Q9.2 - Additional Actions */}
      {q9_2.length > 0 && (
        <div id="q9_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q9.2 - Additional Climate Actions ({q9_2.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q9_2.map((action, idx) => {
              const actionName = action['Action^'] || action.row_name || 'Additional Action'
              const sector = action['Sector^'] || ''
              const Icon = getSectorIcon(sector)

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800 block">{actionName}</span>
                      {sector && <span className="text-xs text-gray-500">{sector}</span>}
                    </div>
                  </div>
                  {Object.entries(action)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Action^', 'Sector^'].includes(k))
                    .slice(0, 3)
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

      {/* Q9.3 - Implementation */}
      {q9_3.length > 0 && (
        <div id="q9_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q9.3 - Implementation Details
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_3.map((item, idx) => (
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

export default NorthAmericaQ9Detail
