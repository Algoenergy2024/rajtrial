import React from 'react'
import {
  Globe, Info, FileText, MessageSquare
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ11Detail() {
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

  const q11_1 = city.q11_1 || []
  const q11_2 = city.q11_2 || []

  const hasData = q11_1.length > 0 || q11_2.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q11 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q11 Additional Information</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q11 - Additional Information</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q11.1 - Additional Documents */}
      {q11_1.length > 0 && (
        <div id="q11_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q11.1 - Additional Documents & Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q11_1.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-3 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800 mt-1 whitespace-pre-wrap">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q11.2 - Additional Comments */}
      {q11_2.length > 0 && (
        <div id="q11_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Q11.2 - Additional Comments
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q11_2.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800 mt-1 whitespace-pre-wrap">{value || 'N/A'}</p>
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

export default UKWWQ11Detail
