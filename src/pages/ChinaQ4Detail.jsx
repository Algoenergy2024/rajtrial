import React from 'react'
import {
  Globe, Zap, Battery, Car, Trash2, Heart, Wind, Droplets, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { chinaCitiesFull } from '../data/chinaCitiesFull'

function ChinaQ4Detail() {
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

  const q4_1 = city.q4_1 || []
  const q4_2 = city.q4_2 || []
  const q4_3 = city.q4_3 || []
  const q4_4 = city.q4_4 || []
  const q4_5 = city.q4_5 || []

  const hasData = q4_1.length > 0 || q4_2.length > 0 || q4_3.length > 0 || q4_4.length > 0 || q4_5.length > 0

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
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q4 - Energy & Other Sectors</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q4.1 - Energy Assessment */}
      {q4_1.length > 0 && (
        <div id="q4_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Battery className="w-4 h-4 mr-2" />
              Q4.1 - Energy Assessment
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

      {/* Q4.2 - Energy Sources */}
      {q4_2.length > 0 && (
        <div id="q4_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Q4.2 - Energy Sources
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

      {/* Q4.3 - Energy Poverty */}
      {q4_3.length > 0 && (
        <div id="q4_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-rose-50 px-5 py-3 border-b border-rose-100">
            <h3 className="font-semibold text-rose-800 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Q4.3 - Energy Poverty
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_3.map((item, idx) => (
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

      {/* Q4.4 - Transport */}
      {q4_4.length > 0 && (
        <div id="q4_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Q4.4 - Transport
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_4.map((item, idx) => (
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

      {/* Q4.5 - Additional Sector Info */}
      {q4_5.length > 0 && (
        <div id="q4_5" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q4.5 - Additional Sector Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q4_5.map((item, idx) => (
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

export default ChinaQ4Detail
