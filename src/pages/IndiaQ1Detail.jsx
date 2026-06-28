import React from 'react'
import {
  Globe, FileText, MapPin, Users, Building2, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { indiaCitiesFull } from '../data/indiaCitiesFull'

function IndiaQ1Detail() {
  const { selectedId, isIndiaCity } = useOrganization()

  const city = indiaCitiesFull.find(c => c.id === selectedId) || indiaCitiesFull[0]

  if (!isIndiaCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select an India city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select an India entity</p>
      </div>
    )
  }

  const q1_0 = city.q1_0 || []
  const q1_2 = city.q1_2 || []
  const q1_3 = city.q1_3 || []
  const q1_4 = city.q1_4 || []
  const q1_5 = city.q1_5 || []
  const q1_6 = city.q1_6 || []

  const hasData = q1_0.length > 0 || q1_2.length > 0 || q1_3.length > 0 || q1_4.length > 0 || q1_5.length > 0 || q1_6.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q1 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q1 City Profile data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q1 - City Profile</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q1.0 - Basic Information */}
      {q1_0.length > 0 && (
        <div id="q1_0" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Q1.0 - Basic City Information
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q1_0.map((item, idx) => (
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
        </div>
      )}

      {/* Q1.2 - Jurisdiction & Authority */}
      {q1_2.length > 0 && (
        <div id="q1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Q1.2 - Jurisdiction & Authority
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q1_2.map((item, idx) => (
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

      {/* Q1.3 - Climate Oversight */}
      {q1_3.length > 0 && (
        <div id="q1_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Q1.3 - Climate Oversight
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q1_3.map((item, idx) => (
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

      {/* Q1.4 - Opportunities */}
      {q1_4.length > 0 && (
        <div id="q1_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q1.4 - Climate Opportunities
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q1_4.map((item, idx) => (
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

      {/* Q1.5 - Stakeholder Engagement */}
      {q1_5.length > 0 && (
        <div id="q1_5" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Q1.5 - Stakeholder Engagement
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q1_5.map((item, idx) => (
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

      {/* Q1.6 - Collaboration */}
      {q1_6.length > 0 && (
        <div id="q1_6" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Q1.6 - Collaboration & Networks
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q1_6.map((item, idx) => (
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
    </div>
  )
}

export default IndiaQ1Detail
