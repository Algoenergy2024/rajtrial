import React from 'react'
import {
  Globe, Info, Zap, Sun, Wind
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ4Detail() {
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

  const q4_1 = city.q4_1 || []
  const q4_2 = city.q4_2 || []
  const q4_3 = city.q4_3 || []

  const hasData = q4_1.length > 0 || q4_2.length > 0 || q4_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q4 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q4 Energy data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q4 - Energy</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q4.1 - Energy Mix */}
      {q4_1.length > 0 && (
        <div id="q4_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-yellow-50 px-5 py-3 border-b border-yellow-100">
            <h3 className="font-semibold text-yellow-800 flex items-center">
              <Sun className="w-4 h-4 mr-2" />
              Q4.1 - Energy Mix
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_1.map((item, idx) => (
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

      {/* Q4.2 - Renewable Energy */}
      {q4_2.length > 0 && (
        <div id="q4_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-yellow-50 px-5 py-3 border-b border-yellow-100">
            <h3 className="font-semibold text-yellow-800 flex items-center">
              <Wind className="w-4 h-4 mr-2" />
              Q4.2 - Renewable Energy
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_2.map((item, idx) => (
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

      {/* Q4.3 - Additional Energy Info */}
      {q4_3.length > 0 && (
        <div id="q4_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-yellow-50 px-5 py-3 border-b border-yellow-100">
            <h3 className="font-semibold text-yellow-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q4.3 - Additional Energy Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_3.map((item, idx) => (
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

export default UKWWQ4Detail
