import React from 'react'
import {
  Globe, Info, Target, Calendar, CheckCircle, Clock,
  TrendingUp, BarChart2
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

function EUQ7Detail() {
  const { selectedId, isEuropeanCity } = useOrganization()

  const city = euCitiesFull.find(c => c.id === selectedId) || euCitiesFull[0]

  if (!isEuropeanCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select an EU city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select an EU entity</p>
      </div>
    )
  }

  const q7_1 = city.q7_1 || []

  if (q7_1.length === 0) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q7 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q7 Other Targets data</p>
      </div>
    )
  }

  const splitPipeDelimited = (str) => {
    if (!str) return []
    return str.split('|').map(s => s.trim()).filter(Boolean)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q7 - Other Targets</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <Target className="w-6 h-6 text-violet-500 mb-2" />
          <p className="text-xs text-gray-500">Total Targets</p>
          <p className="text-2xl font-bold text-gray-800">{q7_1.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <BarChart2 className="w-6 h-6 text-purple-500 mb-2" />
          <p className="text-xs text-gray-500">Target Types</p>
          <p className="text-2xl font-bold text-gray-800">
            {new Set(q7_1.map(t => t['Target type^']).filter(Boolean)).size}
          </p>
        </div>
      </div>

      {/* Q7.1 - Other Targets */}
      <div id="q7_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className="bg-violet-50 px-5 py-3 border-b border-violet-100">
          <h3 className="font-semibold text-violet-800 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Q7.1 - Other Sustainability Targets ({q7_1.length})
          </h3>
        </div>
        <div className="p-5 space-y-4">
          {q7_1.map((target, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-violet-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs font-medium mb-2 inline-block">
                    {target['Target type^'] || 'Other'}
                  </span>
                  <h4 className="font-semibold text-gray-800 mt-1">
                    {target['Target description'] || `Target ${idx + 1}`}
                  </h4>
                </div>
                {target['Status'] && (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    target['Status'].toLowerCase().includes('achieved')
                      ? 'bg-green-100 text-green-700'
                      : target['Status'].toLowerCase().includes('progress')
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    {target['Status']}
                  </span>
                )}
              </div>

              {target['Boundary of target relative to jurisdiction boundary^'] && (
                <p className="text-sm text-gray-500 mb-3">
                  Boundary: {target['Boundary of target relative to jurisdiction boundary^']}
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {target['Year set'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Year Set</p>
                    <p className="font-bold text-gray-800">{target['Year set']}</p>
                  </div>
                )}
                {target['Base year'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Base Year</p>
                    <p className="font-bold text-gray-800">{target['Base year']}</p>
                  </div>
                )}
                {target['Target year'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Target Year</p>
                    <p className="font-bold text-gray-800">{target['Target year']}</p>
                  </div>
                )}
                {target['Quantified target'] && (
                  <div className="bg-violet-50 rounded-lg p-3">
                    <p className="text-xs text-violet-600">Target</p>
                    <p className="font-bold text-violet-700">{target['Quantified target']}</p>
                  </div>
                )}
              </div>

              {target['Sector(s) or area(s) covered by target'] && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-2">Sectors/Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {splitPipeDelimited(target['Sector(s) or area(s) covered by target']).map((sector, i) => (
                      <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {target['Comment'] && (
                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{target['Comment']}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EUQ7Detail
