import React from 'react'
import {
  Globe, Target, TrendingDown, Calendar, CheckCircle, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { chinaCitiesFull } from '../data/chinaCitiesFull'

function ChinaQ6Detail() {
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

  const q6_1 = city.q6_1 || []
  const q6_1_1 = city.q6_1_1 || []
  const q6_2 = city.q6_2 || []

  const hasData = q6_1.length > 0 || q6_1_1.length > 0 || q6_2.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q6 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q6 Targets data</p>
      </div>
    )
  }

  const statusColors = {
    'Achieved': 'bg-green-100 text-green-700 border-green-200',
    'On track': 'bg-blue-100 text-blue-700 border-blue-200',
    'Underway': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Not started': 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q6 - Emissions Reduction Targets</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Total Targets
          </div>
          <p className="text-3xl font-bold text-red-600">{q6_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <CheckCircle className="w-4 h-4" />
            Target Overview
          </div>
          <p className="text-3xl font-bold text-rose-600">{q6_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Additional Info
          </div>
          <p className="text-3xl font-bold text-gray-600">{q6_2.length}</p>
        </div>
      </div>

      {/* Q6.1 - Target Overview */}
      {q6_1.length > 0 && (
        <div id="q6_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q6.1 - Target Overview
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_1.map((item, idx) => (
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

      {/* Q6.1.1 - Emission Reduction Targets */}
      {q6_1_1.length > 0 && (
        <div id="q6_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-rose-50 px-5 py-3 border-b border-rose-100">
            <h3 className="font-semibold text-rose-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q6.1.1 - Emission Reduction Targets ({q6_1_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q6_1_1.map((target, idx) => {
              const targetType = target['Emission reduction target type^'] || target.row_name || 'Target'
              const status = target['Status of target in reporting year^'] || ''
              const baselineYear = target['Baseline year^'] || 'N/A'
              const targetYear = target['Target year^'] || 'N/A'
              const reductionPercent = target['Percentage of reduction target (from base year)^'] || ''

              return (
                <div key={idx} className={`rounded-lg border-2 p-4 ${statusColors[status] || 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      {targetType}
                    </span>
                    {status && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                        {status}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Baseline</p>
                      <p className="font-semibold text-gray-800">{baselineYear}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Target Year</p>
                      <p className="font-semibold text-gray-800">{targetYear}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reduction</p>
                      <p className="font-semibold text-green-600">
                        {reductionPercent ? `-${reductionPercent}%` : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {target['Sector^'] && (
                    <p className="text-sm text-gray-600">Sector: {target['Sector^']}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q6.2 - Additional Target Info */}
      {q6_2.length > 0 && (
        <div id="q6_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q6.2 - Additional Target Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_2.map((item, idx) => (
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

export default ChinaQ6Detail
