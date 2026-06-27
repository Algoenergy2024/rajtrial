import React from 'react'
import {
  Building2, Users, Target, Shield, CheckCircle, AlertTriangle,
  TrendingUp, FileText, Calendar, Info, Award
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function Governance() {
  const { selectedEntity: selectedOrg, isCity } = useOrganization()

  if (isCity || !selectedOrg) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a financial entity</h3>
        <p className="text-gray-500">Switch to Belgian Banks or Insurance to view governance data</p>
      </div>
    )
  }

  const hasGovernanceData = selectedOrg?.scores?.governance !== null

  // Build governance structure from available data
  const governanceStructure = [
    {
      level: 'Board of Directors',
      description: 'Strategic oversight and ESG policy approval',
      members: selectedOrg.governance?.boardSize || 'N/A',
      diversity: selectedOrg.governance?.boardFemalePercentage !== null
        ? `${selectedOrg.governance.boardFemalePercentage}% female`
        : 'N/A',
      meetings: 'Monthly'
    },
    {
      level: 'Management Committee',
      description: 'Executive implementation of ESG strategy',
      members: 'N/A',
      diversity: selectedOrg.governance?.managementFemalePercentage !== null
        ? `${selectedOrg.governance.managementFemalePercentage}% female`
        : 'N/A',
      meetings: 'Weekly'
    },
    {
      level: 'ESG Committee',
      description: 'Dedicated sustainability coordination',
      members: selectedOrg.governance?.esgCommittee ? 'Active' : 'N/A',
      diversity: 'N/A',
      meetings: selectedOrg.governance?.esgCommittee ? 'Regular' : 'N/A'
    }
  ]

  // Diversity targets
  const diversityData = []

  if (selectedOrg.governance?.boardFemalePercentage !== null) {
    diversityData.push({
      metric: 'Board Female Representation',
      current: selectedOrg.governance.boardFemalePercentage,
      target: selectedOrg.governance.boardFemaleTarget?.value || 33,
      targetYear: selectedOrg.governance.boardFemaleTarget?.year || 2027,
      status: selectedOrg.governance.boardFemalePercentage >= (selectedOrg.governance.boardFemaleTarget?.value || 33)
        ? 'achieved' : 'in_progress'
    })
  }

  if (selectedOrg.governance?.managementFemalePercentage !== null) {
    diversityData.push({
      metric: 'Management Female Representation',
      current: selectedOrg.governance.managementFemalePercentage,
      target: 25,
      targetYear: 2027,
      status: selectedOrg.governance.managementFemalePercentage >= 25 ? 'achieved' :
              selectedOrg.governance.managementFemalePercentage === 0 ? 'critical' : 'in_progress'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Governance</h2>
            </div>
            <p className="mt-2 text-blue-100">
              {selectedOrg.name}'s ESG governance structure, accountability, and leadership
            </p>
          </div>
          <div className="text-right">
            {selectedOrg.scores?.governance !== null ? (
              <>
                <div className="text-4xl font-bold">{selectedOrg.scores.governance.toFixed(1)}/10</div>
                <span className="text-blue-200">
                  {selectedOrg.scores.governance >= 8 ? 'Strong' :
                   selectedOrg.scores.governance >= 6 ? 'Moderate' : 'Developing'}
                </span>
              </>
            ) : (
              <span className="text-blue-200">Data Pending</span>
            )}
          </div>
        </div>
      </div>

      {/* Ratings (if available) */}
      {(selectedOrg.ratings?.msci || selectedOrg.ratings?.sustainalytics) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedOrg.ratings?.msci && (
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">MSCI ESG Rating</p>
                <p className="text-2xl font-bold text-gray-800">{selectedOrg.ratings.msci}</p>
                <p className="text-xs text-gray-500">Industry Leader Status</p>
              </div>
            </div>
          )}
          {selectedOrg.ratings?.sustainalytics && (
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center space-x-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sustainalytics Risk Rating</p>
                <p className="text-xl font-bold text-gray-800">{selectedOrg.ratings.sustainalytics}</p>
                <p className="text-xs text-gray-500">ESG Risk Assessment</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Governance Structure */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Governance Structure</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {governanceStructure.map((level, idx) => (
            <div key={idx} className="p-5 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">{level.level}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">{level.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Members</span>
                  <span className="font-medium text-gray-800">{level.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Diversity</span>
                  <span className={`font-medium ${
                    level.diversity.includes('0%') ? 'text-red-600' : 'text-gray-800'
                  }`}>{level.diversity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Meetings</span>
                  <span className="font-medium text-gray-800">{level.meetings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diversity & Inclusion */}
      {diversityData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Diversity & Inclusion Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diversityData.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    item.status === 'achieved' ? 'bg-green-100 text-green-700' :
                    item.status === 'critical' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status === 'achieved' ? 'Achieved' :
                     item.status === 'critical' ? 'Needs Focus' : 'In Progress'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.metric}</p>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-gray-800">{item.current}%</span>
                  <span className="text-sm text-gray-500 mb-1">/ {item.target}% target</span>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.status === 'achieved' ? 'bg-green-500' :
                        item.status === 'critical' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Target: {item.targetYear}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooperative Status */}
      {selectedOrg.isCooperative && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Cooperative Structure</h3>
              <p className="text-sm text-blue-700 mt-1">
                {selectedOrg.name} operates as a cooperative, with governance principles centered on
                member ownership, democratic decision-making, and community benefit.
              </p>
              <div className="mt-3 flex items-center space-x-2 text-sm text-blue-600">
                <CheckCircle className="w-4 h-4" />
                <span>Member-owned governance model</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSRD Readiness */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${
            selectedOrg.compliance?.csrdReady
              ? 'border-green-200 bg-green-50'
              : 'border-yellow-200 bg-yellow-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedOrg.compliance?.csrdReady ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              )}
              <span className={`font-medium ${
                selectedOrg.compliance?.csrdReady ? 'text-green-800' : 'text-yellow-800'
              }`}>CSRD Ready</span>
            </div>
            <p className={`text-sm ${
              selectedOrg.compliance?.csrdReady ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {selectedOrg.compliance?.csrdReady
                ? 'Prepared for CSRD reporting requirements'
                : 'Preparing for CSRD compliance'}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Reporting Year</span>
            </div>
            <p className="text-sm text-gray-600">{selectedOrg.reportingYear || 2023}</p>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-800">Last Updated</span>
            </div>
            <p className="text-sm text-gray-600">{selectedOrg.lastUpdated || 'Recent'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Governance
