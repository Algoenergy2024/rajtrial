import React from 'react'
import {
  Globe, Info, Target, TrendingDown, Calendar, CheckCircle,
  FileText, Leaf, Building2, BarChart2
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function UKQ6Detail() {
  const { selectedEntity, isUKCity } = useOrganization()

  if (!isUKCity || !selectedEntity) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UK city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a UK entity</p>
      </div>
    )
  }

  const city = selectedEntity
  const q6_1 = city.q6_1 || []
  const q6_1_1 = city.q6_1_1 || []
  const q6_1_2 = city.q6_1_2 || []

  const hasData = q6_1.length > 0 || q6_1_1.length > 0 || q6_1_2.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q6 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q6 Emissions Targets data</p>
      </div>
    )
  }

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return 'N/A'
    return parseFloat(num).toLocaleString()
  }

  const splitPipeDelimited = (str) => {
    if (!str) return []
    return str.split('|').map(s => s.trim()).filter(Boolean)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q6 - Emissions Reduction Targets</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q6.1 - Target Status */}
      {q6_1.length > 0 && (
        <div id="q6_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q6.1 - Target Status Overview
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

      {/* Q6.1.1 - Emissions Targets */}
      {q6_1_1.length > 0 && (
        <div id="q6_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q6.1.1 - Emissions Reduction Targets ({q6_1_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_1_1.map((target, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm mr-3">
                      {target['Select a reference ID for the target'] || idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {target['Target type^'] || `Target ${idx + 1}`}
                      </h4>
                      {target['Boundary of target relative to jurisdiction boundary^'] && (
                        <p className="text-sm text-gray-500">{target['Boundary of target relative to jurisdiction boundary^']}</p>
                      )}
                    </div>
                  </div>
                  {target['Status of target'] && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      target['Status of target'].toLowerCase().includes('achieved')
                        ? 'bg-green-100 text-green-700'
                        : target['Status of target'].toLowerCase().includes('progress')
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {target['Status of target']}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {target['Base year^'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Base Year</p>
                      <p className="font-bold text-gray-800">{target['Base year^']}</p>
                    </div>
                  )}
                  {target['Base year emissions^'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Base Emissions</p>
                      <p className="font-bold text-gray-800">{formatNumber(target['Base year emissions^'])} tCO2e</p>
                    </div>
                  )}
                  {target['Target year^'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Target Year</p>
                      <p className="font-bold text-gray-800">{target['Target year^']}</p>
                    </div>
                  )}
                  {target['Percentage reduction target^'] && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600">Reduction Target</p>
                      <p className="font-bold text-green-700">{target['Percentage reduction target^']}%</p>
                    </div>
                  )}
                </div>

                {target['Sector(s) covered by target^'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      Sectors Covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(target['Sector(s) covered by target^']).map((sector, i) => (
                        <span key={i} className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-xs">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {target['Gases covered by target^'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Leaf className="w-3 h-3 mr-1" />
                      Gases Covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(target['Gases covered by target^']).map((gas, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs">
                          {gas}
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
      )}

      {/* Q6.1.2 - Carbon Credits */}
      {q6_1_2.length > 0 && (
        <div id="q6_1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Q6.1.2 - Carbon Credits Usage
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q6_1_2.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {item['Use of carbon credits'] && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Carbon Credits Usage:</span>
                    <p className="text-gray-800">{item['Use of carbon credits']}</p>
                  </div>
                )}
                {item['Comment'] && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Details:</span>
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{item['Comment']}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default UKQ6Detail
