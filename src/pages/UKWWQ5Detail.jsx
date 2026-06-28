import React from 'react'
import {
  Globe, FileText, Target, ClipboardList, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ5Detail() {
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

  const q5_1 = city.q5_1 || []
  const q5_2 = city.q5_2 || []
  const q5_3 = city.q5_3 || []

  const hasData = q5_1.length > 0 || q5_2.length > 0 || q5_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q5 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q5 Climate Action Plans data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q5 - Climate Action Plans</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <ClipboardList className="w-4 h-4" />
            Action Plans
          </div>
          <p className="text-3xl font-bold text-amber-600">{q5_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Plan Components
          </div>
          <p className="text-3xl font-bold text-orange-600">{q5_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Additional Info
          </div>
          <p className="text-3xl font-bold text-gray-600">{q5_3.length}</p>
        </div>
      </div>

      {/* Q5.1 - Climate Action Plans */}
      {q5_1.length > 0 && (
        <div id="q5_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Q5.1 - Climate Action Plans ({q5_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q5_1.map((plan, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                    {plan['Climate action plan type^'] || plan.row_name || 'Plan'}
                  </span>
                  {plan['Year of adoption^'] && (
                    <span className="text-sm text-gray-500">Adopted: {plan['Year of adoption^']}</span>
                  )}
                </div>
                {plan['Name of plan^'] && (
                  <p className="font-medium text-gray-800 mb-2">{plan['Name of plan^']}</p>
                )}
                <div className="space-y-1 text-sm text-gray-600">
                  {plan['Sectors covered by action plan^'] && (
                    <p><span className="font-medium">Sectors:</span> {plan['Sectors covered by action plan^']}</p>
                  )}
                  {plan['Does plan include an emissions target?^'] && (
                    <p><span className="font-medium">Emissions Target:</span> {plan['Does plan include an emissions target?^']}</p>
                  )}
                  {plan['Status of implementation^'] && (
                    <p><span className="font-medium">Status:</span> {plan['Status of implementation^']}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q5.2 - Plan Components */}
      {q5_2.length > 0 && (
        <div id="q5_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q5.2 - Plan Components
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_2.map((item, idx) => (
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

      {/* Q5.3 - Additional Info */}
      {q5_3.length > 0 && (
        <div id="q5_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q5.3 - Additional Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_3.map((item, idx) => (
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

export default UKWWQ5Detail
