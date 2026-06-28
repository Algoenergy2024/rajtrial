import React from 'react'
import {
  Globe, AlertTriangle, Thermometer, Droplets, Wind, Shield, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ2Detail() {
  const { selectedId, isUKWWCity } = useOrganization()

  const ukwwCities = euCitiesFull.filter(c => UKWW_COUNTRIES.includes(c.country))
  const city = ukwwCities.find(c => c.id === selectedId) || ukwwCities[0]

  if (!isUKWWCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UKWW city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a UKWW entity</p>
      </div>
    )
  }

  const q2_1 = city.q2_1 || []
  const q2_2 = city.q2_2 || []
  const q2_3 = city.q2_3 || []

  const hasData = q2_1.length > 0 || q2_2.length > 0 || q2_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q2 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q2 Climate Hazards data</p>
      </div>
    )
  }

  const probColors = {
    'High': 'bg-red-100 text-red-700 border-red-200',
    'Medium High': 'bg-orange-100 text-orange-700 border-orange-200',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Medium Low': 'bg-blue-100 text-blue-700 border-blue-200',
    'Low': 'bg-green-100 text-green-700 border-green-200'
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q2 - Climate Hazards & Vulnerability</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Hazards Identified
          </div>
          <p className="text-3xl font-bold text-orange-600">{q2_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Shield className="w-4 h-4" />
            Vulnerability Assessments
          </div>
          <p className="text-3xl font-bold text-amber-600">{q2_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Additional Q2 Data
          </div>
          <p className="text-3xl font-bold text-gray-600">{q2_3.length}</p>
        </div>
      </div>

      {/* Q2.1 - Vulnerability Assessment */}
      {q2_1.length > 0 && (
        <div id="q2_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q2.1 - Climate Risk & Vulnerability Assessment
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_1.map((item, idx) => (
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

      {/* Q2.2 - Climate Hazards */}
      {q2_2.length > 0 && (
        <div id="q2_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Q2.2 - Climate Hazards ({q2_2.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q2_2.map((hazard, idx) => {
              const hazardName = hazard['Climate hazards^'] || hazard.row_name || 'Unknown Hazard'
              const probability = hazard['Current probability of hazard^'] || ''

              return (
                <div key={idx} className={`rounded-lg border-2 p-4 ${probColors[probability] || 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{hazardName}</h4>
                    {probability && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                        {probability}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    {hazard['Anticipated timescale^'] && (
                      <p><span className="font-medium">Timescale:</span> {hazard['Anticipated timescale^']}</p>
                    )}
                    {hazard['Approximate population exposed to this hazard^'] && (
                      <p><span className="font-medium">Population Exposed:</span> {hazard['Approximate population exposed to this hazard^']}</p>
                    )}
                    {hazard['Please list the groups most vulnerable to this hazard^'] && (
                      <p><span className="font-medium">Vulnerable Groups:</span> {hazard['Please list the groups most vulnerable to this hazard^']}</p>
                    )}
                    {hazard['Anticipated future change in hazard intensity^'] && (
                      <p><span className="font-medium">Future Intensity:</span> {hazard['Anticipated future change in hazard intensity^']}</p>
                    )}
                    {hazard['Anticipated future change in hazard frequency^'] && (
                      <p><span className="font-medium">Future Frequency:</span> {hazard['Anticipated future change in hazard frequency^']}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q2.3 - Additional Data */}
      {q2_3.length > 0 && (
        <div id="q2_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q2.3 - Additional Climate Risk Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q2_3.map((item, idx) => (
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

export default UKWWQ2Detail
