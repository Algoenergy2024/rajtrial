import React from 'react'
import {
  Globe, Info, Shield, Target, CloudRain, Users,
  Building2, FileText, CheckCircle
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

function EUQ5Detail() {
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

  const q5_1 = city.q5_1 || []
  const q5_1_1 = city.q5_1_1 || []

  const hasData = q5_1.length > 0 || q5_1_1.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q5 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q5 Adaptation data</p>
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
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q5 - Adaptation Goals</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q5.1 - Adaptation Status */}
      {q5_1.length > 0 && (
        <div id="q5_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q5.1 - Adaptation Status
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_1.map((item, idx) => (
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

      {/* Q5.1.1 - Adaptation Goals */}
      {q5_1_1.length > 0 && (
        <div id="q5_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100">
            <h3 className="font-semibold text-cyan-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q5.1.1 - Adaptation Goals ({q5_1_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_1_1.map((goal, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-cyan-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm mr-3">
                      {goal['Select a reference ID for the goal'] || idx + 1}
                    </div>
                    <h4 className="font-semibold text-gray-800">
                      {goal['Adaptation goal^'] || `Goal ${idx + 1}`}
                    </h4>
                  </div>
                </div>

                {goal['Climate hazards that goal addresses^'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <CloudRain className="w-3 h-3 mr-1" />
                      Hazards Addressed:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(goal['Climate hazards that goal addresses^']).map((hazard, i) => (
                        <span key={i} className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-xs">
                          {hazard}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {goal['Sectors covered by adaptation goal^'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      Sectors Covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(goal['Sectors covered by adaptation goal^']).map((sector, i) => (
                        <span key={i} className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-xs">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {goal['Vulnerable population groups covered by adaptation goal'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Vulnerable Groups:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(goal['Vulnerable population groups covered by adaptation goal']).map((group, i) => (
                        <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {goal['Year goal was set'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Year Set</p>
                      <p className="font-medium text-gray-800">{goal['Year goal was set']}</p>
                    </div>
                  )}
                  {goal['Target year'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Target Year</p>
                      <p className="font-medium text-gray-800">{goal['Target year']}</p>
                    </div>
                  )}
                  {goal['Status of goal'] && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-medium text-gray-800 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        {goal['Status of goal']}
                      </p>
                    </div>
                  )}
                </div>

                {goal['Comment'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{goal['Comment']}</p>
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

export default EUQ5Detail
