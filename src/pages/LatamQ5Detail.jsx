import React from 'react'
import {
  Globe, Shield, Target, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { latamCitiesFull } from '../data/latamCitiesFull'

function LatamQ5Detail() {
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

  const q5_1 = city.q5_1 || []
  const q5_1_1 = city.q5_1_1 || []

  const hasData = q5_1.length > 0 || q5_1_1.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q5 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q5 Adaptation Goals data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q5 - Adaptation Goals</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Adaptation Status
          </div>
          <p className="text-3xl font-bold text-emerald-600">{q5_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Adaptation Goals
          </div>
          <p className="text-3xl font-bold text-teal-600">{q5_1_1.length}</p>
        </div>
      </div>

      {/* Q5.1 - Adaptation Status */}
      {q5_1.length > 0 && (
        <div id="q5_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q5.1 - Adaptation Goal Status
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

      {/* Q5.1.1 - Adaptation Goals */}
      {q5_1_1.length > 0 && (
        <div id="q5_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q5.1.1 - Adaptation Goals ({q5_1_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q5_1_1.map((goal, idx) => {
              const sector = goal['Climate hazard addressed^'] || goal['Sector addressed^'] || goal.row_name || 'General'
              const description = goal['Goal description^'] || goal['Adaptation goal^'] || ''
              const targetYear = goal['Target year^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                      {sector}
                    </span>
                    {targetYear && (
                      <span className="text-sm text-gray-500">Target: {targetYear}</span>
                    )}
                  </div>
                  {description && (
                    <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
                  )}
                  {Object.entries(goal)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Climate hazard addressed^', 'Sector addressed^', 'Goal description^', 'Adaptation goal^', 'Target year^'].includes(k))
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <p key={key} className="text-sm text-gray-500 mt-1">
                        {key.replace(/\^/g, '')}: {value || 'N/A'}
                      </p>
                    ))}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LatamQ5Detail
