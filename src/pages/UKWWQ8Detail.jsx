import React from 'react'
import {
  Globe, Truck, Car, Train, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ8Detail() {
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

  const q8_1 = city.q8_1 || []
  const q8_2 = city.q8_2 || []
  const q8_3 = city.q8_3 || []

  const hasData = q8_1.length > 0 || q8_2.length > 0 || q8_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q8 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q8 Transport data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Truck className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q8 - Transport</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q8.1 - Transport Overview */}
      {q8_1.length > 0 && (
        <div id="q8_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Q8.1 - Transport Overview
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

      {/* Q8.2 - Public Transport */}
      {q8_2.length > 0 && (
        <div id="q8_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100">
            <h3 className="font-semibold text-indigo-800 flex items-center">
              <Train className="w-4 h-4 mr-2" />
              Q8.2 - Public Transport
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q8_2.map((item, idx) => (
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

      {/* Q8.3 - Additional Info */}
      {q8_3.length > 0 && (
        <div id="q8_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q8.3 - Additional Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q8_3.map((item, idx) => (
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

export default UKWWQ8Detail
