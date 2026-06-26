import React, { useState } from 'react'
import { ChevronDown, Building2, Shield, Check } from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { entityTypes } from '../data/belgianEntities'

function OrganizationSelector() {
  const { selectedOrg, setSelectedOrgId, allOrganizations } = useOrganization()
  const [isOpen, setIsOpen] = useState(false)

  const banks = allOrganizations.filter(o => o.type === entityTypes.BANK)
  const insurers = allOrganizations.filter(o => o.type === entityTypes.INSURANCE)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-colors min-w-[280px]"
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          selectedOrg.type === entityTypes.BANK ? 'bg-blue-100' : 'bg-purple-100'
        }`}>
          {selectedOrg.type === entityTypes.BANK ? (
            <Building2 className="w-5 h-5 text-blue-600" />
          ) : (
            <Shield className="w-5 h-5 text-purple-600" />
          )}
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-gray-800">{selectedOrg.name}</p>
          <p className="text-xs text-gray-500">
            {selectedOrg.type === entityTypes.BANK ? 'Bank' : 'Insurance'} • {selectedOrg.headquarters}
          </p>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-[400px] overflow-y-auto">
            {/* Banks Section */}
            <div className="p-2 border-b border-gray-100">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Banks</p>
              {banks.map(org => (
                <button
                  key={org.id}
                  onClick={() => {
                    setSelectedOrgId(org.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedOrg.id === org.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{org.name}</p>
                    <p className="text-xs text-gray-500">
                      {org.esgScore ? `ESG: ${org.esgScore}/10` : 'Data pending'}
                    </p>
                  </div>
                  {selectedOrg.id === org.id && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Insurers Section */}
            <div className="p-2">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Insurance</p>
              {insurers.map(org => (
                <button
                  key={org.id}
                  onClick={() => {
                    setSelectedOrgId(org.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedOrg.id === org.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{org.name}</p>
                    <p className="text-xs text-gray-500">
                      {org.esgScore ? `ESG: ${org.esgScore}/10` : 'Data pending'}
                    </p>
                  </div>
                  {selectedOrg.id === org.id && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrganizationSelector
