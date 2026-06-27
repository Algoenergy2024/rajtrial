import React from 'react'
import {
  Globe, Info, Zap, Droplets, Heart, Car, Wind, Fuel,
  Home, Utensils, Activity, ThermometerSun
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function UKQ4Detail() {
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

  // All Q4 sections
  const sections = {
    q4_1: { data: city.q4_1 || [], title: 'Q4.1 - Energy Assessment', icon: Zap, color: 'yellow' },
    q4_1_1: { data: city.q4_1_1 || [], title: 'Q4.1.1 - Energy Mix Details', icon: Zap, color: 'yellow' },
    q4_1_2: { data: city.q4_1_2 || [], title: 'Q4.1.2 - Electricity Generation', icon: Zap, color: 'yellow' },
    q4_1_3: { data: city.q4_1_3 || [], title: 'Q4.1.3 - Heat Generation', icon: ThermometerSun, color: 'orange' },
    q4_1_4: { data: city.q4_1_4 || [], title: 'Q4.1.4 - Additional Energy', icon: Fuel, color: 'yellow' },
    q4_2: { data: city.q4_2 || [], title: 'Q4.2 - Clean Cooking Access', icon: Utensils, color: 'green' },
    q4_3: { data: city.q4_3 || [], title: 'Q4.3 - Energy Poverty', icon: Home, color: 'red' },
    q4_4: { data: city.q4_4 || [], title: 'Q4.4 - Housing & Buildings', icon: Home, color: 'blue' },
    q4_5: { data: city.q4_5 || [], title: 'Q4.5 - Transport Mode Share', icon: Car, color: 'cyan' },
    q4_6: { data: city.q4_6 || [], title: 'Q4.6 - Transport Fleet', icon: Car, color: 'cyan' },
    q4_7: { data: city.q4_7 || [], title: 'Q4.7 - Waste Management', icon: Wind, color: 'emerald' },
    q4_8: { data: city.q4_8 || [], title: 'Q4.8 - Health & Climate', icon: Heart, color: 'pink' },
    q4_9: { data: city.q4_9 || [], title: 'Q4.9 - Air Quality', icon: Wind, color: 'purple' },
    q4_10: { data: city.q4_10 || [], title: 'Q4.10 - Water & Sanitation', icon: Droplets, color: 'blue' },
    q4_11: { data: city.q4_11 || [], title: 'Q4.11 - Food Security', icon: Utensils, color: 'amber' },
    q4_12: { data: city.q4_12 || [], title: 'Q4.12 - Biodiversity', icon: Activity, color: 'green' },
    q4_13: { data: city.q4_13 || [], title: 'Q4.13 - Water Supply', icon: Droplets, color: 'blue' },
  }

  const hasData = Object.values(sections).some(s => s.data.length > 0)

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Q4 Data Not Available</h3>
        <p className="text-gray-500">This city has not submitted Q4 Energy & Resources data</p>
      </div>
    )
  }

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return 'N/A'
    return parseFloat(num).toLocaleString()
  }

  const getColorClasses = (color) => {
    const colors = {
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-800' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-800' },
      green: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-800' },
      red: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800' },
      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-800' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-800' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-800' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-800' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-800' },
    }
    return colors[color] || colors.yellow
  }

  const renderSection = (key, section) => {
    if (section.data.length === 0) return null

    const colorClasses = getColorClasses(section.color)
    const Icon = section.icon

    return (
      <div key={key} id={key} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
        <div className={`${colorClasses.bg} px-5 py-3 border-b ${colorClasses.border}`}>
          <h3 className={`font-semibold ${colorClasses.text} flex items-center`}>
            <Icon className="w-4 h-4 mr-2" />
            {section.title} ({section.data.length})
          </h3>
        </div>
        <div className="p-5 space-y-4">
          {section.data.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              {item.row_name && item.row_name !== `Row ${idx + 1}` && (
                <h4 className="font-medium text-gray-800 mb-3">{item.row_name}</h4>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(item)
                  .filter(([k]) => !['row_order', 'row_name'].includes(k))
                  .map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">{key.replace(/\^/g, '').replace(/\^\^/g, '')}</p>
                      <p className="text-sm text-gray-800 break-words">
                        {typeof value === 'number' ? formatNumber(value) : (value || 'N/A')}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q4 - Energy & Resources</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sections.q4_1.data[0] && (
          <>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <Zap className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="text-xs text-gray-500">Total Energy (MWh)</p>
              <p className="text-lg font-bold text-gray-800">
                {formatNumber(sections.q4_1.data[0]['Total energy consumption (MWh)'])}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <Wind className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-xs text-gray-500">Renewable Energy (MWh)</p>
              <p className="text-lg font-bold text-gray-800">
                {formatNumber(sections.q4_1.data[0]['Total energy consumption from renewable energy sources (MWh)^'])}
              </p>
            </div>
          </>
        )}
        {sections.q4_3.data[0] && (
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Home className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-xs text-gray-500">Energy Poverty</p>
            <p className="text-lg font-bold text-gray-800">
              {sections.q4_3.data[0]['Percentage of households or total population within the jurisdiction boundary that face energy poverty^'] || 'N/A'}
            </p>
          </div>
        )}
        {sections.q4_9.data[0] && (
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Wind className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-xs text-gray-500">Air Quality Metric</p>
            <p className="text-lg font-bold text-gray-800">
              {sections.q4_9.data[0]['Air pollution metric'] || 'N/A'}
            </p>
          </div>
        )}
      </div>

      {/* Render all sections with data */}
      {Object.entries(sections).map(([key, section]) => renderSection(key, section))}
    </div>
  )
}

export default UKQ4Detail
