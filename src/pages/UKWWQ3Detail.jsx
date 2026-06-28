import React from 'react'
import {
  Globe, Factory, Leaf, BarChart3, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

function UKWWQ3Detail() {
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

  const q3_1_1 = city.q3_1_1 || []
  const q3_1_2 = city.q3_1_2 || []
  const q3_1_3 = city.q3_1_3 || []
  const q3_2 = city.q3_2 || []

  const hasData = q3_1_1.length > 0 || q3_1_2.length > 0 || q3_1_3.length > 0 || q3_2.length > 0

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q3 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q3 Emissions data</p>
      </div>
    )
  }

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return 'N/A'
    return parseFloat(num).toLocaleString()
  }

  // Calculate totals
  let scope1Total = 0, scope2Total = 0, scope3Total = 0
  q3_1_3.forEach(sector => {
    scope1Total += parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
    scope2Total += parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
    scope3Total += parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
  })

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Factory className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q3 - City-Wide Emissions</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Emissions Summary */}
      {q3_1_3.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <p className="text-sm text-amber-600 font-medium mb-1">Scope 1 (Direct)</p>
            <p className="text-2xl font-bold text-amber-700">{formatNumber(Math.round(scope1Total))}</p>
            <p className="text-xs text-amber-500">tCO2e</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <p className="text-sm text-orange-600 font-medium mb-1">Scope 2 (Grid)</p>
            <p className="text-2xl font-bold text-orange-700">{formatNumber(Math.round(scope2Total))}</p>
            <p className="text-xs text-orange-500">tCO2e</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
            <p className="text-sm text-yellow-600 font-medium mb-1">Scope 3 (Outside)</p>
            <p className="text-2xl font-bold text-yellow-700">{formatNumber(Math.round(scope3Total))}</p>
            <p className="text-xs text-yellow-500">tCO2e</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
            <p className="text-sm text-gray-600 font-medium mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">{formatNumber(Math.round(scope1Total + scope2Total + scope3Total))}</p>
            <p className="text-xs text-gray-500">tCO2e</p>
          </div>
        </div>
      )}

      {/* Q3.1.1 - Inventory Overview */}
      {q3_1_1.length > 0 && (
        <div id="q3_1_1" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Q3.1.1 - Emissions Inventory Overview
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1_1.map((item, idx) => (
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

      {/* Q3.1.2 - Accounting Protocol */}
      {q3_1_2.length > 0 && (
        <div id="q3_1_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Q3.1.2 - Emissions Accounting Protocol
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_1_2.map((item, idx) => (
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

      {/* Q3.1.3 - Sector Emissions */}
      {q3_1_3.length > 0 && (
        <div id="q3_1_3" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Factory className="w-4 h-4 mr-2" />
              Q3.1.3 - Emissions by Sector ({q3_1_3.length} sectors)
            </h3>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Sector</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-700">Scope 1</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-700">Scope 2</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-700">Scope 3</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {q3_1_3.map((sector, idx) => {
                  const s1 = parseFloat(sector['Direct emissions (metric tonnes CO2e)^']) || 0
                  const s2 = parseFloat(sector['Indirect emissions from the use of grid-supplied electricity, heat, steam and/or cooling (metric tonnes CO2e)^']) || 0
                  const s3 = parseFloat(sector['Emissions occurring outside the jurisdiction boundary as a result of in-jurisdiction activities (metric tonnes CO2e)']) || 0
                  return (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-3 font-medium text-gray-800">{sector.row_name || 'Unknown'}</td>
                      <td className="py-3 px-3 text-right text-amber-600">{formatNumber(Math.round(s1))}</td>
                      <td className="py-3 px-3 text-right text-orange-600">{formatNumber(Math.round(s2))}</td>
                      <td className="py-3 px-3 text-right text-yellow-600">{formatNumber(Math.round(s3))}</td>
                      <td className="py-3 px-3 text-right font-semibold text-gray-800">{formatNumber(Math.round(s1 + s2 + s3))}</td>
                    </tr>
                  )
                })}
                <tr className="bg-gray-50 font-semibold">
                  <td className="py-3 px-3 text-gray-800">Total</td>
                  <td className="py-3 px-3 text-right text-amber-700">{formatNumber(Math.round(scope1Total))}</td>
                  <td className="py-3 px-3 text-right text-orange-700">{formatNumber(Math.round(scope2Total))}</td>
                  <td className="py-3 px-3 text-right text-yellow-700">{formatNumber(Math.round(scope3Total))}</td>
                  <td className="py-3 px-3 text-right text-gray-900">{formatNumber(Math.round(scope1Total + scope2Total + scope3Total))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Q3.2 - Additional Emissions Data */}
      {q3_2.length > 0 && (
        <div id="q3_2" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
            <h3 className="font-semibold text-amber-800 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Q3.2 - Additional Emissions Information
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q3_2.map((item, idx) => (
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

export default UKWWQ3Detail
