import React from 'react'
import {
  MapPin, Globe, Info, CloudRain, AlertTriangle, FileText, Users,
  Building2, TrendingUp, Clock, Shield, Link as LinkIcon
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function UKQ2Detail() {
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
  const q2_1 = city.q2_1 || []
  const q2_1_1 = city.q2_1_1 || []
  const q2_2 = city.q2_2 || []
  const q2_3 = city.q2_3 || []

  const hasData = q2_1.length > 0 || q2_1_1.length > 0 || q2_2.length > 0 || q2_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q2 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q2 Climate Hazards data</p>
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
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <CloudRain className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q2 - Climate Hazards & Vulnerability</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q2.1 - Hazard Assessment Status */}
      {q2_1.length > 0 && (
        <div id="q2_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q2.1 - Climate Hazard Assessment Status
            </h3>
          </div>
          <div className="p-5">
            {q2_1.map((item, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <span className="text-sm text-gray-500">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q2.1.1 - Risk & Vulnerability Assessments */}
      {q2_1_1.length > 0 && (
        <div id="q2_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q2.1.1 - Risk & Vulnerability Assessments ({q2_1_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_1_1.map((assessment, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-orange-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-800">Assessment {idx + 1}</h4>
                  {assessment['Year of publication or approval'] && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                      {assessment['Year of publication or approval']}
                    </span>
                  )}
                </div>

                {assessment['Assessment attachment^'] && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Attachment:</span> {assessment['Assessment attachment^']}
                  </p>
                )}

                {assessment['Assessment direct link^'] && (
                  <div className="mb-3">
                    <a
                      href={assessment['Assessment direct link^'].startsWith('http') ? assessment['Assessment direct link^'] : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-orange-600 hover:text-orange-800 text-sm"
                    >
                      <LinkIcon className="w-3 h-3 mr-1" />
                      View Assessment
                    </a>
                  </div>
                )}

                {assessment['Boundary of assessment relative to jurisdiction boundary^'] && (
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Boundary: </span>
                    <span className="text-sm text-gray-700">{assessment['Boundary of assessment relative to jurisdiction boundary^']}</span>
                  </div>
                )}

                {assessment['Factors considered in assessment'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-2">Factors Considered:</p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(assessment['Factors considered in assessment']).map((factor, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {assessment['Please explain'] && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{assessment['Please explain']}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q2.2 - Climate Hazards */}
      {q2_2.length > 0 && (
        <div id="q2_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Q2.2 - Climate-Related Hazards ({q2_2.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_2.map((hazard, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-red-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <CloudRain className="w-4 h-4 mr-2 text-red-500" />
                    {hazard['Climate-related hazards^'] || `Hazard ${idx + 1}`}
                  </h4>
                  {hazard['Proportion of the population exposed to the hazard'] && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                      {hazard['Proportion of the population exposed to the hazard']} exposed
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Current Probability</p>
                    <p className="font-medium text-gray-700">{hazard['Current probability of hazard^'] || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Current Magnitude</p>
                    <p className="font-medium text-gray-700">{hazard['Current magnitude of impact of hazard^'] || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Future Intensity</p>
                    <p className="font-medium text-gray-700">{hazard['Expected future change in hazard intensity'] || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Future Frequency</p>
                    <p className="font-medium text-gray-700">{hazard['Expected future change in hazard frequency'] || 'N/A'}</p>
                  </div>
                </div>

                {hazard['Timeframe of expected future changes'] && (
                  <div className="mb-3 flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Timeframe: {hazard['Timeframe of expected future changes']}
                  </div>
                )}

                {hazard['Vulnerable population groups most exposed'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Vulnerable Groups:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(hazard['Vulnerable population groups most exposed']).map((group, i) => (
                        <span key={i} className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {hazard['Sectors most exposed^'] && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1 flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      Sectors Exposed:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {splitPipeDelimited(hazard['Sectors most exposed^']).map((sector, i) => (
                        <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {hazard['Describe the impacts on vulnerable populations and sectors'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {hazard['Describe the impacts on vulnerable populations and sectors']}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q2.3 - Adaptive Capacity */}
      {q2_3.length > 0 && (
        <div id="q2_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Q2.3 - Factors Affecting Adaptive Capacity ({q2_3.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_3.map((factor, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-amber-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">
                    {factor['Factors that affect ability to adapt'] || `Factor ${idx + 1}`}
                  </h4>
                  {factor['Degree to which this factor challenges/supports the adaptive capacity of your jurisdiction'] && (
                    <span className={`px-2 py-1 rounded text-sm ${
                      factor['Degree to which this factor challenges/supports the adaptive capacity of your jurisdiction'].toLowerCase().includes('support')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {factor['Degree to which this factor challenges/supports the adaptive capacity of your jurisdiction']}
                    </span>
                  )}
                </div>

                {factor['Describe how the factor supports or challenges the adaptive capacity of your jurisdiction'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {factor['Describe how the factor supports or challenges the adaptive capacity of your jurisdiction']}
                    </p>
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

export default UKQ2Detail
