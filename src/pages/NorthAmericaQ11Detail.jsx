import React from 'react'
import {
  Globe, DollarSign, TrendingUp, Building2, FileText, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { northAmericaCitiesFull } from '../data/northAmericaCitiesFull'

function NorthAmericaQ11Detail() {
  const { selectedId, isNorthAmericaCity } = useOrganization()

  const city = northAmericaCitiesFull.find(c => c.id === selectedId) || northAmericaCitiesFull[0]

  if (!isNorthAmericaCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a North America city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a North America entity</p>
      </div>
    )
  }

  const q11_1 = city.q11_1 || []
  const q11_2 = city.q11_2 || []
  const q11_3 = city.q11_3 || []
  const q11_4 = city.q11_4 || []

  const hasData = q11_1.length > 0 || q11_2.length > 0 || q11_3.length > 0 || q11_4.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q11 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q11 Finance data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q11 - Finance</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Info className="w-4 h-4" />
            Finance Status
          </div>
          <p className="text-3xl font-bold text-sky-600">{q11_1.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Funding Sources
          </div>
          <p className="text-3xl font-bold text-blue-600">{q11_2.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            Investments
          </div>
          <p className="text-3xl font-bold text-green-600">{q11_3.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Building2 className="w-4 h-4" />
            Barriers
          </div>
          <p className="text-3xl font-bold text-gray-600">{q11_4.length}</p>
        </div>
      </div>

      {/* Q11.1 - Finance Status */}
      {q11_1.length > 0 && (
        <div id="q11_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q11.1 - Finance Status
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q11_1.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

      {/* Q11.2 - Funding Sources */}
      {q11_2.length > 0 && (
        <div id="q11_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Q11.2 - Funding Sources ({q11_2.length})
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {q11_2.map((source, idx) => {
              const sourceName = source['Funding source^'] || source['Source of funding^'] || source.row_name || 'Funding Source'
              const amount = source['Amount^'] || source['Total amount^'] || ''
              const currency = source['Currency^'] || ''

              return (
                <div key={idx} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {sourceName}
                    </span>
                  </div>
                  {(amount || currency) && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium text-green-600">
                        {currency} {amount ? parseFloat(amount).toLocaleString() : 'N/A'}
                      </span>
                    </div>
                  )}
                  {Object.entries(source)
                    .filter(([k]) => !['row_order', 'row_name', 'question_text', 'Funding source^', 'Source of funding^', 'Amount^', 'Total amount^', 'Currency^'].includes(k))
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <p key={key} className="text-sm text-gray-600 mb-1">
                        {key.replace(/\^/g, '')}: {value || 'N/A'}
                      </p>
                    ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Q11.3 - Investments */}
      {q11_3.length > 0 && (
        <div id="q11_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-green-50 px-5 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-800 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Q11.3 - Climate Investments ({q11_3.length})
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q11_3.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

      {/* Q11.4 - Finance Barriers */}
      {q11_4.length > 0 && (
        <div id="q11_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-sky-50 px-5 py-3 border-b border-sky-100">
            <h3 className="font-semibold text-sky-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q11.4 - Finance Barriers & Challenges
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q11_4.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name', 'question_text'].includes(k)).map(([key, value]) => (
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

export default NorthAmericaQ11Detail
