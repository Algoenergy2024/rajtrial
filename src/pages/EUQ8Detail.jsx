import React from 'react'
import {
  Globe, Info, FileText, ClipboardList, Link as LinkIcon,
  Calendar, CheckCircle, Target, Leaf
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

function EUQ8Detail() {
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

  const q8_1 = city.q8_1 || []
  const q8_1_1 = city.q8_1_1 || []
  const q8_2 = city.q8_2 || []
  const q8_3 = city.q8_3 || []
  const q8_4 = city.q8_4 || []

  const hasData = q8_1.length > 0 || q8_1_1.length > 0 || q8_2.length > 0 || q8_3.length > 0 || q8_4.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q8 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q8 Plans data</p>
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
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <ClipboardList className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q8 - Climate Action Plans</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <FileText className="w-6 h-6 text-blue-500 mb-2" />
          <p className="text-xs text-gray-500">Climate Plans</p>
          <p className="text-2xl font-bold text-gray-800">{q8_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <ClipboardList className="w-6 h-6 text-indigo-500 mb-2" />
          <p className="text-xs text-gray-500">Other Plans</p>
          <p className="text-2xl font-bold text-gray-800">{q8_2.length}</p>
        </div>
      </div>

      {/* Q8.1 - Climate Action Plan Status */}
      {q8_1.length > 0 && (
        <div id="q8_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q8.1 - Climate Action Plan Status
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q8_1.map((item, idx) => (
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

      {/* Q8.1.1 - Climate Action Plans */}
      {q8_1_1.length > 0 && (
        <div id="q8_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q8.1.1 - Climate Action Plans ({q8_1_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q8_1_1.map((plan, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mb-2 inline-block">
                      {plan['Climate action plan type^'] || 'Climate Plan'}
                    </span>
                    <h4 className="font-semibold text-gray-800 mt-1">
                      {plan['Name of plan and URL link, if applicable^'] || `Plan ${idx + 1}`}
                    </h4>
                  </div>
                </div>

                {plan['Plan attachment^'] && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Attachment:</span> {plan['Plan attachment^']}
                  </p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {plan['Year of formal approval of plan^'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Year Approved</p>
                      <p className="font-bold text-gray-800">{plan['Year of formal approval of plan^']}</p>
                    </div>
                  )}
                  {plan['End year of plan'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">End Year</p>
                      <p className="font-bold text-gray-800">{plan['End year of plan']}</p>
                    </div>
                  )}
                  {plan['Plan status/progress towards plan'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-medium text-gray-800 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        {plan['Plan status/progress towards plan']}
                      </p>
                    </div>
                  )}
                </div>

                {plan['Sectors covered by action plan'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2">Sectors Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(plan['Sectors covered by action plan']).map((sector, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {plan['Please explain'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{plan['Please explain']}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q8.2 - Other Climate-Related Plans */}
      {q8_2.length > 0 && (
        <div id="q8_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100">
            <h3 className="font-semibold text-indigo-800 flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Q8.2 - Other Climate-Related Plans ({q8_2.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q8_2.map((plan, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium mb-2 inline-block">
                      {plan['Area of plan, policy and/or strategy'] || 'Other'}
                    </span>
                    <h4 className="font-semibold text-gray-800 mt-1">
                      {plan['Name of plan and URL link, if applicable'] || `Plan ${idx + 1}`}
                    </h4>
                  </div>
                </div>

                {plan['Plan attachment'] && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Attachment:</span> {plan['Plan attachment']}
                  </p>
                )}

                {plan['Comment'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{plan['Comment']}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q8.3 - Plan Characteristics */}
      {q8_3.length > 0 && (
        <div id="q8_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q8.3 - Plan Characteristics
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {q8_3.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">{item.row_name || `Item ${idx + 1}`}</p>
                  <p className="font-medium text-gray-800">{item['Response'] || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Q8.4 - Procurement Strategy */}
      {q8_4.length > 0 && (
        <div id="q8_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q8.4 - Sustainable Procurement
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q8_4.map((item, idx) => (
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
    </div>
  )
}

export default EUQ8Detail
