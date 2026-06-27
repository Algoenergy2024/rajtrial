import React from 'react'
import {
  Globe, Info, Factory, BarChart2, FileText, CloudCog,
  TrendingDown, Calculator, Link as LinkIcon, Database
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function UKQ3Detail() {
  const { selectedEntity, isUKCity } = useOrganization()

  if (!isUKCity || !selectedEntity) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a UK city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a UK entity</p>
      </div>
    )
  }

  const city = selectedEntity
  const q3_1 = city.q3_1 || []
  const q3_1_1 = city.q3_1_1 || []
  const q3_1_2 = city.q3_1_2 || []
  const q3_1_3 = city.q3_1_3 || []
  const q3_1_4 = city.q3_1_4 || []
  const q3_2 = city.q3_2 || []
  const q3_3 = city.q3_3 || []
  const q3_3_1 = city.q3_3_1 || []
  const q3_3_2 = city.q3_3_2 || []

  const hasData = q3_1.length > 0 || q3_1_1.length > 0 || q3_1_3.length > 0 || q3_2.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q3 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q3 Emissions data</p>
      </div>
    )
  }

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return 'N/A'
    return parseFloat(num).toLocaleString()
  }

  const splitPipeDelimited = (str) => {
    if (!str) return []
    return str.split('|').map(s => s.trim()).filter(Boolean)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Factory className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q3 - Emissions Inventory</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Q3.1 - Emissions Inventory Status */}
      {q3_1.length > 0 && (
        <div id="q3_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Q3.1 - Emissions Inventory Status
            </h3>
          </div>
          <div className="p-5">
            {q3_1.map((item, idx) => (
              <div key={idx} className="space-y-2">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-sm text-gray-500">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q3.1.1 - Inventory Attachments */}
      {q3_1_1.length > 0 && (
        <div id="q3_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q3.1.1 - Emissions Inventory Documents
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1_1.map((doc, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                {doc['Main community-wide emissions inventory attachment (spreadsheet)^'] && (
                  <p className="text-sm mb-2">
                    <span className="font-medium">Attachment:</span>{' '}
                    {doc['Main community-wide emissions inventory attachment (spreadsheet)^']}
                  </p>
                )}
                {doc['URL link (with unrestricted access)^'] && (
                  <a
                    href={doc['URL link (with unrestricted access)^'].startsWith('http') ? doc['URL link (with unrestricted access)^'] : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm"
                  >
                    <LinkIcon className="w-3 h-3 mr-1" />
                    View Document
                  </a>
                )}
                {doc['Status of main community-wide inventory attachment and/or direct link'] && (
                  <p className="text-sm text-gray-600 mt-2">
                    Status: {doc['Status of main community-wide inventory attachment and/or direct link']}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q3.1.3 - Sector Emissions */}
      {q3_1_3.length > 0 && (
        <div id="q3_1_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100">
            <h3 className="font-semibold text-indigo-800 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Q3.1.3 - Sector Emissions ({q3_1_3.length} sectors)
            </h3>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-600">Sector</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-600">Direct Emissions</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-600">Indirect Emissions</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-600">Outside Boundary</th>
                  </tr>
                </thead>
                <tbody>
                  {q3_1_3.map((sector, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-800">{sector.row_name || `Sector ${idx + 1}`}</td>
                      <td className="py-2 px-3 text-right text-gray-600">
                        {formatNumber(sector['Direct emissions (metric tonnes CO2e)^'])}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600">
                        {formatNumber(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^'])}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600">
                        {formatNumber(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)'])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Q3.1.2 - Methodology */}
      {q3_1_2.length > 0 && (
        <div id="q3_1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              Q3.1.2 - Inventory Methodology
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1_2.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800 text-sm">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q3.1.4 - Additional Emissions Data */}
      {q3_1_4.length > 0 && (
        <div id="q3_1_4" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <CloudCog className="w-4 h-4 mr-2" />
              Q3.1.4 - Additional Emissions Data
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1_4.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm text-gray-500">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q3.2 - Consumption-Based Inventory */}
      {q3_2.length > 0 && (
        <div id="q3_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100">
            <h3 className="font-semibold text-indigo-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q3.2 - Consumption-Based Emissions Inventory
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_2.map((item, idx) => (
              <div key={idx} className="space-y-3">
                {item['Does your jurisdiction have a consumption-based emissions inventory?'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-600">Has Consumption-Based Inventory:</span>
                    <p className="text-gray-800">{item['Does your jurisdiction have a consumption-based emissions inventory?']}</p>
                  </div>
                )}
                {item['Provide an overview of your consumption-based inventory, including URL links, if applicable, along with any supporting methods/calculations'] && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-600">Overview:</span>
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                      {item['Provide an overview of your consumption-based inventory, including URL links, if applicable, along with any supporting methods/calculations']}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q3.3 - Emissions Tracking */}
      {q3_3.length > 0 && (
        <div id="q3_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2" />
              Q3.3 - Emissions Tracking
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_3.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-2 last:mb-0">
                    <span className="text-sm font-medium text-gray-600">{key.replace(/\^/g, '')}:</span>
                    <p className="text-gray-800 text-sm">{value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Q3.3.1 & Q3.3.2 - Historical Emissions */}
      {(q3_3_1.length > 0 || q3_3_2.length > 0) && (
        <div id="q3_3_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
            <h3 className="font-semibold text-purple-800 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Q3.3.1/Q3.3.2 - Historical Emissions
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_3_1.map((item, idx) => (
              <div key={`3_3_1_${idx}`} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-700 mb-2">Q3.3.1 Entry {idx + 1}</p>
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-1">
                    <span className="text-sm text-gray-500">{key.replace(/\^/g, '')}:</span>
                    <span className="text-sm text-gray-800 ml-2">{value || 'N/A'}</span>
                  </div>
                ))}
              </div>
            ))}
            {q3_3_2.map((item, idx) => (
              <div key={`3_3_2_${idx}`} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-indigo-700 mb-2">Q3.3.2 Entry {idx + 1}</p>
                {Object.entries(item).filter(([k]) => !['row_order', 'row_name'].includes(k)).map(([key, value]) => (
                  <div key={key} className="mb-1">
                    <span className="text-sm text-gray-500">{key.replace(/\^/g, '')}:</span>
                    <span className="text-sm text-gray-800 ml-2">{value || 'N/A'}</span>
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

export default UKQ3Detail
