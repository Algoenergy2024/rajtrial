import React from 'react'
import {
  Globe, MapPin, Users, Building2, Target, Factory, Zap, Shield,
  FileText, CloudRain, TrendingUp, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { japanCitiesFull } from '../data/japanCitiesFull'
import { useNavigate } from 'react-router-dom'

function JapanCityDashboard() {
  const { selectedId, isJapanCity } = useOrganization()
  const navigate = useNavigate()

  const city = japanCitiesFull.find(c => c.id === selectedId) || japanCitiesFull[0]

  if (!isJapanCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a Japan city to view details</h3>
        <p className="text-gray-500">Use the dropdown above to select a Japan entity</p>
      </div>
    )
  }

  const population = city.q1_0?.find(q => q['Population^'])?.['Population^'] || 'N/A'
  const populationYear = city.q1_0?.find(q => q['Population year^'])?.['Population year^'] || ''

  const sections = [
    { key: 'q1', label: 'Q1 - City Profile', icon: FileText, count: (city.q1_1?.length || 0) + (city.q1_2?.length || 0), href: '/japan-q1', color: 'pink' },
    { key: 'q2', label: 'Q2 - Climate Hazards', icon: CloudRain, count: city.q2_2?.length || 0, href: '/japan-q2', color: 'rose' },
    { key: 'q3', label: 'Q3 - Emissions', icon: Factory, count: city.q3_1_3?.length || 0, href: '/japan-q3', color: 'pink' },
    { key: 'q4', label: 'Q4 - Energy & Transport', icon: Zap, count: (city.q4_1?.length || 0) + (city.q4_5?.length || 0), href: '/japan-q4', color: 'rose' },
    { key: 'q5', label: 'Q5 - Adaptation', icon: Shield, count: city.q5_1_1?.length || 0, href: '/japan-q5', color: 'pink' },
    { key: 'q6', label: 'Q6 - Targets', icon: Target, count: city.q6_1_1?.length || 0, href: '/japan-q6', color: 'rose' },
    { key: 'q7', label: 'Q7 - Other Targets', icon: Target, count: city.q7_1?.length || 0, href: '/japan-q7', color: 'pink' },
    { key: 'q8', label: 'Q8 - Climate Plans', icon: FileText, count: city.q8_1_1?.length || 0, href: '/japan-q8', color: 'rose' },
    { key: 'q9', label: 'Q9 - Climate Actions', icon: Zap, count: (city.q9_1?.length || 0) + (city.q9_2?.length || 0), href: '/japan-q9', color: 'pink' },
    { key: 'q11', label: 'Q11 - Additional Info', icon: Info, count: (city.q11_1?.length || 0) + (city.q11_2?.length || 0), href: '/japan-q11', color: 'rose' },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">{city.name}</h1>
              <p className="text-white/80">{city.country} • CDP 2025</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{population}</p>
            <p className="text-white/80">Population {populationYear && `(${populationYear})`}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <CloudRain className="w-4 h-4" />
            Climate Hazards
          </div>
          <p className="text-3xl font-bold text-pink-600">{city.q2_2?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Emission Targets
          </div>
          <p className="text-3xl font-bold text-rose-600">{city.q6_1_1?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Zap className="w-4 h-4" />
            Mitigation Actions
          </div>
          <p className="text-3xl font-bold text-green-600">{city.q9_1?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Shield className="w-4 h-4" />
            Adaptation Actions
          </div>
          <p className="text-3xl font-bold text-blue-600">{city.q9_2?.length || 0}</p>
        </div>
      </div>

      {/* CDP Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-pink-50 px-5 py-3 border-b border-pink-100">
          <h2 className="font-semibold text-pink-800 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            CDP Questionnaire Sections
          </h2>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.key}
                onClick={() => navigate(section.href)}
                className={`text-left p-4 rounded-lg border transition-all hover:shadow-md ${
                  section.color === 'pink'
                    ? 'bg-pink-50 border-pink-200 hover:border-pink-400'
                    : 'bg-rose-50 border-rose-200 hover:border-rose-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${section.color === 'pink' ? 'text-pink-600' : 'text-rose-600'}`} />
                    <span className="font-medium text-gray-800">{section.label}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    section.count > 0
                      ? section.color === 'pink' ? 'bg-pink-100 text-pink-700' : 'bg-rose-100 text-rose-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {section.count} items
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default JapanCityDashboard
