import React from 'react'
import {
  Globe, Zap, Car, Droplets, Wind, Heart, Trash2, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaQ4Detail() {
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

  const q4_1 = city.q4_1 || []
  const q4_3 = city.q4_3 || []
  const q4_5 = city.q4_5 || []
  const q4_7 = city.q4_7 || []
  const q4_8 = city.q4_8 || []
  const q4_9 = city.q4_9 || []
  const q4_10 = city.q4_10 || []

  const hasData = q4_1.length > 0 || q4_3.length > 0 || q4_5.length > 0 || q4_7.length > 0 || q4_8.length > 0 || q4_9.length > 0 || q4_10.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q4 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q4 Energy & Transport data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q4 - Energy, Transport & Services</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q4.1 - Energy Assessment */}
      {q4_1.length > 0 && (
        <div id="q4_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Q4.1 - Energy Assessment
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_1.map((item, idx) => (
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

      {/* Q4.3 - Energy Poverty */}
      {q4_3.length > 0 && (
        <div id="q4_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q4.3 - Energy Poverty
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_3.map((item, idx) => (
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

      {/* Q4.5 - Transport */}
      {q4_5.length > 0 && (
        <div id="q4_5" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Q4.5 - Transport ({q4_5.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q4_5.map((item, idx) => {
              const mode = item['Mode of transport^'] || item.row_name || 'Transport'
              const share = item['Modal share of journeys (%)^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs font-medium">
                      {mode}
                    </span>
                    {share && (
                      <span className="text-sm font-medium text-gray-600">{share}% share</span>
                    )}
                  </div>
                  {Object.entries(item)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Mode of transport^', 'Modal share of journeys (%)^'].includes(k))
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

      {/* Q4.7 - Waste */}
      {q4_7.length > 0 && (
        <div id="q4_7" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Trash2 className="w-4 h-4 mr-2" />
              Q4.7 - Waste Management
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_7.map((item, idx) => (
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

      {/* Q4.8 - Health */}
      {q4_8.length > 0 && (
        <div id="q4_8" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Q4.8 - Public Health
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_8.map((item, idx) => (
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

      {/* Q4.9 - Air Quality */}
      {q4_9.length > 0 && (
        <div id="q4_9" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Wind className="w-4 h-4 mr-2" />
              Q4.9 - Air Quality
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_9.map((item, idx) => (
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

      {/* Q4.10 - Water */}
      {q4_10.length > 0 && (
        <div id="q4_10" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100">
            <h3 className="font-semibold text-cyan-800 flex items-center">
              <Droplets className="w-4 h-4 mr-2" />
              Q4.10 - Water Management
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_10.map((item, idx) => (
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

export default NorthAmericaQ4Detail
