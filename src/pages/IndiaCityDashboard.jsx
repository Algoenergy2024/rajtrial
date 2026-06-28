import React from 'react'
import {
  Globe, MapPin, Users, Building2, Target, Factory, Zap, Shield,
  FileText, CloudRain, TrendingUp, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { indiaCitiesFull } from '../data/indiaCitiesFull'
import { useNavigate } from 'react-router-dom'

function IndiaCityDashboard() {
  const { selectedId, isIndiaCity } = useOrganization()
  const navigate = useNavigate()

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

  const population = city.q1_0?.find(q => q['Population^'])?.['Population^'] || 'N/A'
  const populationYear = city.q1_0?.find(q => q['Population year^'])?.['Population year^'] || ''

  const sections = [
    { key: 'q1', label: 'Q1 - City Profile', icon: FileText, count: (city.q1_0?.length || 0) + (city.q1_2?.length || 0), href: '/india-q1', color: 'orange' },
    { key: 'q2', label: 'Q2 - Climate Hazards', icon: CloudRain, count: city.q2_2?.length || 0, href: '/india-q2', color: 'amber' },
    { key: 'q3', label: 'Q3 - Emissions', icon: Factory, count: city.q3_1_3?.length || 0, href: '/india-q3', color: 'orange' },
    { key: 'q4', label: 'Q4 - Energy & Transport', icon: Zap, count: (city.q4_1?.length || 0) + (city.q4_5?.length || 0), href: '/india-q4', color: 'amber' },
    { key: 'q5', label: 'Q5 - Adaptation', icon: Shield, count: city.q5_1_1?.length || 0, href: '/india-q5', color: 'orange' },
    { key: 'q6', label: 'Q6 - Targets', icon: Target, count: city.q6_1_1?.length || 0, href: '/india-q6', color: 'amber' },
    { key: 'q7', label: 'Q7 - Other Targets', icon: Target, count: city.q7_1?.length || 0, href: '/india-q7', color: 'orange' },
    { key: 'q8', label: 'Q8 - Climate Plans', icon: FileText, count: city.q8_1_1?.length || 0, href: '/india-q8', color: 'amber' },
    { key: 'q9', label: 'Q9 - Climate Actions', icon: Zap, count: (city.q9_1?.length || 0) + (city.q9_2?.length || 0), href: '/india-q9', color: 'orange' },
    { key: 'q11', label: 'Q11 - Additional Info', icon: Info, count: (city.q11_1?.length || 0) + (city.q11_2?.length || 0), href: '/india-q11', color: 'amber' },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
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
          <p className="text-3xl font-bold text-orange-600">{city.q2_2?.length || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Emission Targets
          </div>
          <p className="text-3xl font-bold text-amber-600">{city.q6_1_1?.length || 0}</p>
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
        <div className="bg-orange-50 px-5 py-3 border-b border-orange-100">
          <h2 className="font-semibold text-orange-800 flex items-center">
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
                  section.color === 'orange'
                    ? 'bg-orange-50 border-orange-200 hover:border-orange-400'
                    : 'bg-amber-50 border-amber-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${section.color === 'orange' ? 'text-orange-600' : 'text-amber-600'}`} />
                    <span className="font-medium text-gray-800">{section.label}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    section.count > 0
                      ? section.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
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

export default IndiaCityDashboard
