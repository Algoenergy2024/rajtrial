import React from 'react'
import {
  Globe, Lightbulb, TrendingUp, DollarSign, Leaf, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaQ7Detail() {
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

  const q7_1 = city.q7_1 || []
  const q7_2 = city.q7_2 || []
  const q7_3 = city.q7_3 || []

  const hasData = q7_1.length > 0 || q7_2.length > 0 || q7_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q7 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q7 Opportunities data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q7 - Opportunities</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Lightbulb className="w-4 h-4" />
            Opportunities
          </div>
          <p className="text-3xl font-bold text-sky-600">{q7_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Economic
          </div>
          <p className="text-3xl font-bold text-blue-600">{q7_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Leaf className="w-4 h-4" />
            Co-Benefits
          </div>
          <p className="text-3xl font-bold text-green-600">{q7_3.length}</p>
        </div>
      </div>

      {/* Q7.1 - Climate Opportunities */}
      {q7_1.length > 0 && (
        <div id="q7_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Q7.1 - Climate Opportunities ({q7_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q7_1.map((item, idx) => {
              const opportunity = item['Opportunity^'] || item.row_name || 'Opportunity'
              const sector = item['Sector^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs font-medium">
                      {opportunity}
                    </span>
                    {sector && (
                      <span className="text-xs text-gray-500">{sector}</span>
                    )}
                  </div>
                  {Object.entries(item)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Opportunity^', 'Sector^'].includes(k))
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

      {/* Q7.2 - Economic Opportunities */}
      {q7_2.length > 0 && (
        <div id="q7_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Q7.2 - Economic Opportunities ({q7_2.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_2.map((item, idx) => (
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

      {/* Q7.3 - Co-Benefits */}
      {q7_3.length > 0 && (
        <div id="q7_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q7.3 - Co-Benefits
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_3.map((item, idx) => (
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

export default NorthAmericaQ7Detail
