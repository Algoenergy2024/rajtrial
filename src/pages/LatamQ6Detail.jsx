import React from 'react'
import {
  Globe, Target, TrendingDown, Leaf, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { latamCitiesFull } from '../data/latamCitiesFull'

function LatamQ6Detail() {
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

  const q6_1 = city.q6_1 || []
  const q6_1_1 = city.q6_1_1 || []
  const q6_1_2 = city.q6_1_2 || []

  const hasData = q6_1.length > 0 || q6_1_1.length > 0 || q6_1_2.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q6 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q6 Emission Reduction Targets data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q6 - Emission Reduction Targets</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Target Overview
          </div>
          <p className="text-3xl font-bold text-emerald-600">{q6_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Emission Targets
          </div>
          <p className="text-3xl font-bold text-teal-600">{q6_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Leaf className="w-4 h-4" />
            Carbon Credits
          </div>
          <p className="text-3xl font-bold text-green-600">{q6_1_2.length}</p>
        </div>
      </div>

      {/* Q6.1 - Target Overview */}
      {q6_1.length > 0 && (
        <div id="q6_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q6.1 - Emission Reduction Target Overview
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_1.map((item, idx) => (
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

      {/* Q6.1.1 - Emission Targets */}
      {q6_1_1.length > 0 && (
        <div id="q6_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q6.1.1 - Emission Reduction Targets ({q6_1_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q6_1_1.map((target, idx) => {
              const targetType = target['Target type^'] || target['Sector^'] || target.row_name || 'Emission Target'
              const baselineYear = target['Baseline year^'] || ''
              const targetYear = target['Target year^'] || ''
              const reduction = target['Percentage of reduction target^'] || target['Percentage reduction target^'] || ''
              const status = target['Status of target^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                      {targetType}
                    </span>
                    {status && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {status}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    {reduction && (
                      <div className="flex items-center">
                        <TrendingDown className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-medium text-green-600">{reduction}% reduction</span>
                      </div>
                    )}
                    {baselineYear && (
                      <p className="text-gray-600">Baseline: {baselineYear}</p>
                    )}
                    {targetYear && (
                      <p className="text-gray-600">Target year: {targetYear}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q6.1.2 - Carbon Credits */}
      {q6_1_2.length > 0 && (
        <div id="q6_1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q6.1.2 - Carbon Credits
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_1_2.map((item, idx) => (
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

export default LatamQ6Detail
