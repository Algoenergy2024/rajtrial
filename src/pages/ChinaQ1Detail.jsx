import React from 'react'
import {
  Globe, Info, Building2, Users, MapPin, Calendar, FileText
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { chinaCitiesFull } from '../data/chinaCitiesFull'

function ChinaQ1Detail() {
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

  const profile = city.profile || {}
  const q1_1 = city.q1_1 || []
  const q1_2 = city.q1_2 || []
  const q1_3 = city.q1_3 || []
  const q1_4 = city.q1_4 || []
  const q1_5 = city.q1_5 || []
  const q1_6 = city.q1_6 || []

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return 'N/A'
    return parseFloat(num).toLocaleString()
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Building2 className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Q1 - City Profile</h2>
            <p className="text-white/80">{city.name} • {city.country}</p>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-red-600" />
          Organization Profile
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Organization Type</p>
            <p className="font-medium text-gray-800">{city.orgType || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">CDP Region</p>
            <p className="font-medium text-gray-800">{city.cdpRegion || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Population</p>
            <p className="font-medium text-gray-800">{formatNumber(profile.population)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Area (km²)</p>
            <p className="font-medium text-gray-800">{formatNumber(profile.areaKm2)}</p>
          </div>
        </div>
      </div>

      {/* Q1.2 - Jurisdiction Details */}
      {(profile.adminBoundary || q1_2.length > 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-red-600" />
            Q1.2 - Jurisdiction Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.adminBoundary && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Administrative Boundary</p>
                <p className="font-medium text-gray-800">{profile.adminBoundary}</p>
              </div>
            )}
            {profile.nextHighestGovt && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Next Highest Government</p>
                <p className="font-medium text-gray-800">{profile.nextHighestGovt}</p>
              </div>
            )}
            {profile.nextLowestGovt && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Next Lowest Government</p>
                <p className="font-medium text-gray-800">{profile.nextLowestGovt}</p>
              </div>
            )}
            {profile.ecosystemPercentage && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Ecosystem Coverage</p>
                <p className="font-medium text-gray-800">{profile.ecosystemPercentage}</p>
              </div>
            )}
            {profile.populationYear && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Population Year</p>
                <p className="font-medium text-gray-800">{profile.populationYear}</p>
              </div>
            )}
            {profile.projectedPopulation && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Projected Population ({profile.projectedYear})</p>
                <p className="font-medium text-gray-800">{formatNumber(profile.projectedPopulation)}</p>
              </div>
            )}
            {profile.currency && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">Currency</p>
                <p className="font-medium text-gray-800">{profile.currency}</p>
              </div>
            )}
            {profile.crfLevel && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1">CRF Reporting Level</p>
                <p className="font-medium text-gray-800">{profile.crfLevel}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Q1.1 - Organization Introduction */}
      {q1_1.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q1.1 - Organization Introduction
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {q1_1.map((item, idx) => (
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

      {/* Q1.3 - Governance */}
      {q1_3.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Q1.3 - Governance
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

      {/* Q1.4 - CDP Engagement */}
      {q1_4.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Q1.4 - CDP Engagement
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

      {/* Q1.5 - Commitments */}
      {q1_5.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Q1.5 - Commitments & Initiatives
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

      {/* Q1.6 - Contacts */}
      {q1_6.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-50 px-5 py-3 border-b border-red-100">
            <h3 className="font-semibold text-red-800 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Q1.6 - Contact Information
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

export default ChinaQ1Detail
