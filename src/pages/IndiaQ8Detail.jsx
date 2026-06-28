import React from 'react'
import {
  Globe, FileText, ClipboardList, Calendar, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { indiaCitiesFull } from '../data/indiaCitiesFull'

function IndiaQ8Detail() {
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

  const q8_1 = city.q8_1 || []
  const q8_1_1 = city.q8_1_1 || []
  const q8_2 = city.q8_2 || []
  const q8_3 = city.q8_3 || []

  const hasData = q8_1.length > 0 || q8_1_1.length > 0 || q8_2.length > 0 || q8_3.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q8 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q8 Climate Action Plans data</p>
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
            <h2 className="text-2xl font-bold">Q8 - Climate Action Plans</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <FileText className="w-4 h-4" />
            Plan Status
          </div>
          <p className="text-3xl font-bold text-orange-600">{q8_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <ClipboardList className="w-4 h-4" />
            Climate Plans
          </div>
          <p className="text-3xl font-bold text-amber-600">{q8_1_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            Other Plans
          </div>
          <p className="text-3xl font-bold text-green-600">{q8_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Additional Info
          </div>
          <p className="text-3xl font-bold text-gray-600">{q8_3.length}</p>
        </div>
      </div>

      {/* Q8.1 - Plan Status */}
      {q8_1.length > 0 && (
        <div id="q8_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q8.1 - Climate Action Plan Status
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

      {/* Q8.1.1 - Climate Plans */}
      {q8_1_1.length > 0 && (
        <div id="q8_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Q8.1.1 - Climate Action Plans ({q8_1_1.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q8_1_1.map((plan, idx) => {
              const planType = plan['Climate action plan type^'] || plan.row_name || 'Climate Plan'
              const planName = plan['Name of plan^'] || ''
              const yearAdopted = plan['Year of adoption^'] || ''
              const sectors = plan['Sectors covered by action plan^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                      {planType}
                    </span>
                    {yearAdopted && (
                      <span className="text-sm text-gray-500">Adopted: {yearAdopted}</span>
                    )}
                  </div>
                  {planName && (
                    <h4 className="font-semibold text-gray-800 mb-2">{planName}</h4>
                  )}
                  {sectors && (
                    <p className="text-sm text-gray-600">Sectors: {sectors}</p>
                  )}
                  {plan['Does plan include an emissions target?^'] && (
                    <p className="text-sm text-gray-500 mt-2">
                      Emissions target: {plan['Does plan include an emissions target?^']}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q8.2 - Other Plans */}
      {q8_2.length > 0 && (
        <div id="q8_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
            <h3 className="font-semibold text-orange-800 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Q8.2 - Other Development Plans
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
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q8.3 - Additional Plan Information
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

export default IndiaQ8Detail
