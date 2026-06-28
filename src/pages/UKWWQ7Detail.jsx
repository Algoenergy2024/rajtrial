import React from 'react'
import {
  Globe, Shield, Droplets, Building2, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ7Detail() {
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

  const q7_1 = city.q7_1 || []
  const q7_2 = city.q7_2 || []
  const q7_3 = city.q7_3 || []
  const q7_4 = city.q7_4 || []

  const hasData = q7_1.length > 0 || q7_2.length > 0 || q7_3.length > 0 || q7_4.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q7 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q7 Adaptation data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q7 - Adaptation</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q7.1 - Adaptation Actions */}
      {q7_1.length > 0 && (
        <div id="q7_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Q7.1 - Adaptation Actions ({q7_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_1.map((item, idx) => (
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

      {/* Q7.2 - Water Security */}
      {q7_2.length > 0 && (
        <div id="q7_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100">
            <h3 className="font-semibold text-cyan-800 flex items-center">
              <Droplets className="w-4 h-4 mr-2" />
              Q7.2 - Water Security
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_2.map((item, idx) => (
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

      {/* Q7.3 - Buildings & Infrastructure */}
      {q7_3.length > 0 && (
        <div id="q7_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Q7.3 - Buildings & Infrastructure
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_3.map((item, idx) => (
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

      {/* Q7.4 - Additional Info */}
      {q7_4.length > 0 && (
        <div id="q7_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-teal-50 px-5 py-3 border-b border-teal-100">
            <h3 className="font-semibold text-teal-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q7.4 - Additional Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_4.map((item, idx) => (
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

export default UKWWQ7Detail
