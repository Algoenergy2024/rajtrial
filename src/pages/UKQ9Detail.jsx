import React from 'react'
import {
  Globe, Info, Zap, Shield, CloudRain, Building2, DollarSign,
  Briefcase, Users, Clock, Target, CheckCircle
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function UKQ9Detail() {
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
  const q9_1 = city.q9_1 || []
  const q9_2 = city.q9_2 || []
  const q9_3 = city.q9_3 || []
  const q9_4 = city.q9_4 || []

  const hasData = q9_1.length > 0 || q9_2.length > 0 || q9_3.length > 0 || q9_4.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q9 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q9 Actions data</p>
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
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q9 - Climate Actions</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <Shield className="w-6 h-6 text-cyan-500 mb-2" />
          <p className="text-xs text-gray-500">Adaptation Actions</p>
          <p className="text-2xl font-bold text-gray-800">{q9_1.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <Zap className="w-6 h-6 text-green-500 mb-2" />
          <p className="text-xs text-gray-500">Mitigation Actions</p>
          <p className="text-2xl font-bold text-gray-800">{q9_2.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <Briefcase className="w-6 h-6 text-purple-500 mb-2" />
          <p className="text-xs text-gray-500">Projects</p>
          <p className="text-2xl font-bold text-gray-800">{q9_3.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <DollarSign className="w-6 h-6 text-amber-500 mb-2" />
          <p className="text-xs text-gray-500">Finance Mechanisms</p>
          <p className="text-2xl font-bold text-gray-800">{q9_4.length}</p>
        </div>
      </div>

      {/* Q9.1 - Adaptation Actions */}
      {q9_1.length > 0 && (
        <div id="q9_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100">
            <h3 className="font-semibold text-cyan-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q9.1 - Adaptation Actions ({q9_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_1.map((action, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-cyan-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm mr-3">
                      {action['Select a reference ID for the action'] || idx + 1}
                    </div>
                    <h4 className="font-semibold text-gray-800">
                      {action['Action^'] || `Action ${idx + 1}`}
                    </h4>
                  </div>
                  {action['Status of action'] && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      action['Status of action'].toLowerCase().includes('complete')
                        ? 'bg-green-100 text-green-700'
                        : action['Status of action'].toLowerCase().includes('progress')
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {action['Status of action']}
                    </span>
                  )}
                </div>

                {action['Climate hazard(s) that action addresses'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <CloudRain className="w-3 h-3 mr-1" />
                      Hazards Addressed:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(action['Climate hazard(s) that action addresses']).map((hazard, i) => (
                        <span key={i} className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-xs">
                          {hazard}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {action['Sector(s) the action impacts'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      Sectors Impacted:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(action['Sector(s) the action impacts']).map((sector, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {action['Description of action and co-benefits'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{action['Description of action and co-benefits']}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q9.2 - Mitigation Actions */}
      {q9_2.length > 0 && (
        <div id="q9_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Q9.2 - Mitigation Actions ({q9_2.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_2.map((action, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-green-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm mr-3">
                      {action['Select a reference ID for the action'] || idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {action['Primary emissions sector addressed and action type^'] || `Action ${idx + 1}`}
                      </h4>
                    </div>
                  </div>
                  {action['Status of action'] && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      action['Status of action'].toLowerCase().includes('complete')
                        ? 'bg-green-100 text-green-700'
                        : action['Status of action'].toLowerCase().includes('progress')
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {action['Status of action']}
                    </span>
                  )}
                </div>

                {action['Action description and web link to further information^^'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{action['Action description and web link to further information^^']}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {action['Estimated emissions savings (metric tonnes CO2e)^'] && (
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-xs text-green-600">Est. Savings</p>
                      <p className="font-bold text-green-700">{formatNumber(action['Estimated emissions savings (metric tonnes CO2e)^'])} tCO2e</p>
                    </div>
                  )}
                  {action['Year emissions savings first achieved'] && (
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">First Achieved</p>
                      <p className="font-medium text-gray-800">{action['Year emissions savings first achieved']}</p>
                    </div>
                  )}
                  {action['GPC reference number'] && (
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">GPC Ref</p>
                      <p className="font-medium text-gray-800">{action['GPC reference number']}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q9.3 - Climate Projects */}
      {q9_3.length > 0 && (
        <div id="q9_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Q9.3 - Climate Projects ({q9_3.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_3.map((project, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium mb-2 inline-block">
                      {project['Project area'] || 'Project'}
                    </span>
                    <h4 className="font-semibold text-gray-800 mt-1">
                      {project['Project title'] || `Project ${idx + 1}`}
                    </h4>
                  </div>
                  {project['Stage of project development'] && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                      {project['Stage of project development']}
                    </span>
                  )}
                </div>

                {project['Total cost of project'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <span className="text-sm text-gray-500">Total Cost: </span>
                    <span className="font-medium text-gray-800">{project['Total cost of project']}</span>
                  </div>
                )}

                {project['Project description'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{project['Project description']}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q9.4 - Finance Access */}
      {q9_4.length > 0 && (
        <div id="q9_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Q9.4 - Finance Access & Investment
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q9_4.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {item['Mechanisms used by jurisdiction to access finance for climate-related projects'] && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Finance Mechanisms:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {splitPipeDelimited(item['Mechanisms used by jurisdiction to access finance for climate-related projects']).map((mech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                          {mech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {item['Credit rating of jurisdiction'] && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Credit Rating: </span>
                    <span className="text-gray-800">{item['Credit rating of jurisdiction']}</span>
                  </div>
                )}
                {item["Decarbonising jurisdiction's investments"] && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Decarbonising Investments: </span>
                    <span className="text-gray-800">{item["Decarbonising jurisdiction's investments"]}</span>
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

export default UKQ9Detail
