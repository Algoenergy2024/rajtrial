import React from 'react'
import {
  Globe, Shield, FileText, Target, CheckCircle, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { chinaCitiesFull } from '../data/chinaCitiesFull'

function ChinaQ5Detail() {
  const { selectedId, isChinaCity } = useOrganization()

  const city = chinaCitiesFull.find(c => c.id === selectedId) || chinaCitiesFull[0]

  if (!isChinaCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a China city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a China entity</p>
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
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q5 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q5 Adaptation data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q5 - Adaptation</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q5.1 - Adaptation Goals */}
      {q5_1.length > 0 && (
        <div id="q5_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Q5.1 - Adaptation Goals
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q5_1.map((item, idx) => (
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

      {/* Q5.2 - Adaptation Strategy */}
      {q5_2.length > 0 && (
        <div id="q5_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-rose-50 px-5 py-3 border-b border-rose-100">
            <h3 className="font-semibold text-rose-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q5.2 - Adaptation Strategy
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

      {/* Q5.3 - Additional Adaptation Info */}
      {q5_3.length > 0 && (
        <div id="q5_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q5.3 - Additional Adaptation Information
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

export default ChinaQ5Detail
