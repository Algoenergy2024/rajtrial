import React from 'react'
import {
  Globe, Target, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { latamCitiesFull } from '../data/latamCitiesFull'

function LatamQ7Detail() {
  const { selectedId, isLatamCity } = useOrganization()

  const city = latamCitiesFull.find(c => c.id === selectedId) || latamCitiesFull[0]

  if (!isLatamCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a Latin America city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a Latin America entity</p>
      </div>
    )
  }

  const q7_1 = city.q7_1 || []

  const hasData = q7_1.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q7 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q7 Other Targets data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q7 - Other Targets</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q7.1 - Other Targets */}
      {q7_1.length > 0 && (
        <div id="q7_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q7.1 - Other Targets ({q7_1.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q7_1.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

export default LatamQ7Detail
