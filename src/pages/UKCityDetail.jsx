import React from 'react'
import {
  MapPin, Users, Building2, Globe, FileText, Handshake, Scale,
  TreePine, TrendingUp, Calendar, Info, ChevronRight, Landmark,
  Target, Shield, MessageSquare, Network
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function UKCityDetail() {
  const { selectedEntity, isCity } = useOrganization()

  if (!isCity || !selectedEntity) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UK city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a UK entity</p>
      </div>
    )
  }

  // Check if this is a UK city with Q1 data
  if (selectedEntity.country !== 'United Kingdom' || !selectedEntity.q1_2) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">UK City Data Not Available</h3>
        <p className="text-gray-500">This entity does not have detailed Q1 CDP data</p>
      </div>
    )
  }

  const city = selectedEntity
  // Support both old (q1_2) and new (profile) data structures
  const q1_2 = city.q1_2 || city.profile || {}
  const q1_3 = city.q1_3 || {}
  const q1_4 = city.q1_4 || {}
  const q1_5 = city.q1_5 || []
  const q1_6 = city.q1_6 || []

  const formatNumber = (num) => {
    if (!num) return 'N/A'
    return num.toLocaleString()
  }

  const calculateGrowth = () => {
    if (!q1_2.population || !q1_2.projectedPopulation) return null
    const growth = ((q1_2.projectedPopulation - q1_2.population) / q1_2.population * 100).toFixed(1)
    return growth
  }

  const calculateDensity = () => {
    if (!q1_2.population || !q1_2.areaKm2) return null
    return Math.round(q1_2.population / q1_2.areaKm2)
  }

  const splitPipeDelimited = (str) => {
    if (!str) return []
    return str.split('|').map(s => s.trim()).filter(Boolean)
  }

  const growth = calculateGrowth()
  const density = calculateDensity()

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">{city.name}</h2>
                <p className="text-white/80">
                  {city.country} • CDP Region: {city.cdpRegion} • {city.orgType}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{formatNumber(q1_2.population)}</div>
            <span className="text-white/80">Population ({q1_2.populationYear || 'N/A'})</span>
          </div>
        </div>
      </div>

      {/* Q1.1 & Q1.2 - City Profile */}
      <div id="q1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
          <h3 className="font-semibold text-blue-800 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Q1.1 & Q1.2 - Jurisdiction Details
          </h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Landmark className="w-4 h-4 mr-1" />
                Admin Boundary
              </div>
              <p className="font-semibold text-gray-800">{q1_2.adminBoundary || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Building2 className="w-4 h-4 mr-1" />
                Area
              </div>
              <p className="font-semibold text-gray-800">
                {q1_2.areaKm2 ? `${formatNumber(q1_2.areaKm2)} km²` : 'N/A'}
              </p>
              {density && <p className="text-xs text-gray-500">{formatNumber(density)} per km²</p>}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <TreePine className="w-4 h-4 mr-1" />
                Ecosystem
              </div>
              <p className="font-semibold text-gray-800">{q1_2.ecosystemPercentage || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <Scale className="w-4 h-4 mr-1" />
                CRF Level
              </div>
              <p className="font-semibold text-gray-800 text-sm">{q1_2.crfLevel || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-3">Government Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Highest Level:</span>
                  <span className="font-medium">{q1_2.nextHighestGovt || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Next Lowest Level:</span>
                  <span className="font-medium">{q1_2.nextLowestGovt || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Currency:</span>
                  <span className="font-medium">{q1_2.currency || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-600 mb-3">Population Projection</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{formatNumber(q1_2.projectedPopulation)}</p>
                  <p className="text-sm text-gray-500">Projected ({q1_2.projectedYear || 'N/A'})</p>
                </div>
                {growth && (
                  <div className={`text-right px-3 py-1 rounded-full ${
                    parseFloat(growth) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className="font-semibold">{growth > 0 ? '+' : ''}{growth}%</span>
                    <p className="text-xs">Growth</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Q1.3 - Climate Oversight */}
      <div id="q1_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className="bg-green-50 px-5 py-3 border-b border-green-100">
          <h3 className="font-semibold text-green-800 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Q1.3 - Climate Oversight & Governance
          </h3>
        </div>
        <div className="p-5 space-y-4">
          {q1_3.oversightProcesses && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Oversight Processes</h4>
              <div className="flex flex-wrap gap-2">
                {splitPipeDelimited(q1_3.oversightProcesses).map((process, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {process}
                  </span>
                ))}
              </div>
            </div>
          )}

          {q1_3.oversightDetails && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Oversight Details</h4>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{q1_3.oversightDetails}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q1_3.masterPlanningImpact && (
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Impact on Master Planning</h4>
                <p className="text-sm text-gray-700">{q1_3.masterPlanningImpact}</p>
              </div>
            )}
            {q1_3.financialPlanningImpact && (
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-medium text-gray-600 mb-1">Impact on Financial Planning</h4>
                <p className="text-sm text-gray-700">{q1_3.financialPlanningImpact}</p>
              </div>
            )}
          </div>

          {q1_3.transitionRisks && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Transition Risks Identified</h4>
              <p className="text-gray-700 text-sm bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                {q1_3.transitionRisks}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Q1.4 - Climate Opportunities */}
      <div id="q1_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
          <h3 className="font-semibold text-purple-800 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Q1.4 - Climate Action Opportunities & Benefits
          </h3>
        </div>
        <div className="p-5 space-y-4">
          {q1_4.assessesOpportunities && (
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                q1_4.assessesOpportunities.toLowerCase().includes('yes')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {q1_4.assessesOpportunities}
              </div>
            </div>
          )}

          {q1_4.assessmentMethod && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Assessment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {splitPipeDelimited(q1_4.assessmentMethod).map((method, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          {q1_4.opportunitiesIdentified && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Opportunities Identified</h4>
              <p className="text-gray-700 text-sm bg-purple-50 p-3 rounded-lg">{q1_4.opportunitiesIdentified}</p>
            </div>
          )}

          {q1_4.equitableDistribution && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Equitable Distribution</h4>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{q1_4.equitableDistribution}</p>
            </div>
          )}

          {q1_4.quantifiesEquity && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">How Equity is Quantified</h4>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{q1_4.quantifiesEquity}</p>
            </div>
          )}

          {q1_4.equityEvidence && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Evidence of Equitable Climate Action</h4>
              <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                {q1_4.equityEvidence}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Q1.5 - Government Engagement */}
      <div id="q1_5" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
          <h3 className="font-semibold text-teal-800 flex items-center">
            <Network className="w-4 h-4 mr-2" />
            Q1.5 - Government Engagement ({q1_5.length} entries)
          </h3>
        </div>
        <div className="p-5">
          {q1_5.length > 0 ? (
            <div className="space-y-4">
              {q1_5.map((engagement, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      {engagement.climateComponent || 'N/A'}
                    </span>
                    {engagement.govtLevelsEngaged && (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {splitPipeDelimited(engagement.govtLevelsEngaged).map((level, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {level}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {engagement.engagementPurpose && (
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Purpose</h4>
                      <p className="text-sm text-gray-700 bg-teal-50 p-3 rounded-lg">
                        {engagement.engagementPurpose}
                      </p>
                    </div>
                  )}

                  {engagement.comment && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Comment</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {engagement.comment}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No government engagement data reported</p>
          )}
        </div>
      </div>

      {/* Q1.6 - Collaboration */}
      <div id="q1_6" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
          <h3 className="font-semibold text-orange-800 flex items-center">
            <Handshake className="w-4 h-4 mr-2" />
            Q1.6 - Collaboration & Partnerships ({q1_6.length} entries)
          </h3>
        </div>
        <div className="p-5">
          {q1_6.length > 0 ? (
            <div className="space-y-4">
              {q1_6.map((collab, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm font-medium">
                        {collab.primaryEntity || 'Unknown Entity'}
                      </span>
                    </div>
                    {collab.focusAreas && (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {splitPipeDelimited(collab.focusAreas).slice(0, 3).map((area, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {area}
                          </span>
                        ))}
                        {splitPipeDelimited(collab.focusAreas).length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            +{splitPipeDelimited(collab.focusAreas).length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {collab.mechanisms && (
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">Mechanisms: </span>
                      <span className="text-sm text-gray-700">
                        {splitPipeDelimited(collab.mechanisms).join(' • ')}
                      </span>
                    </div>
                  )}

                  {collab.description && (
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {collab.description}
                    </p>
                  )}

                  {collab.otherEntities && (
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Also collaborating with: </span>
                      {splitPipeDelimited(collab.otherEntities).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No collaboration data reported</p>
          )}
        </div>
      </div>

      {/* Data Source Footer */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 mt-0.5 text-gray-400" />
          <div>
            <span className="font-medium">Data Source:</span> CDP 2025 Full Cities Public Data
            <br />
            <span className="text-gray-500">
              CDP Number: {city.cdpNumber} • Questions: Q1.1 - Q1.6 • Language: {city.q1_1?.language || 'English'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UKCityDetail
