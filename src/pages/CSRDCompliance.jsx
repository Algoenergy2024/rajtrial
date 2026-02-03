import React, { useState } from 'react'
import {
  FileText, CheckCircle, AlertCircle, Clock, ChevronDown, ChevronUp,
  Target, Calendar, Download, ExternalLink
} from 'lucide-react'
import { csrdRequirements } from '../data/esgData'

const getStatusBadge = (status) => {
  const styles = {
    completed: 'bg-green-100 text-green-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    not_started: 'bg-gray-100 text-gray-600'
  }
  const labels = {
    completed: 'Completed',
    in_progress: 'In Progress',
    not_started: 'Not Started'
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

const getProgressColor = (completion) => {
  if (completion >= 80) return 'bg-green-500'
  if (completion >= 50) return 'bg-yellow-500'
  if (completion >= 20) return 'bg-orange-500'
  return 'bg-gray-300'
}

const ESRSCard = ({ requirement, isExpanded, onToggle }) => {
  const isEnvironmental = requirement.code.startsWith('E')
  const isSocial = requirement.code.startsWith('S')
  const isGovernance = requirement.code.startsWith('G')

  const categoryColor = isEnvironmental ? 'green' : isSocial ? 'purple' : 'blue'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${categoryColor}-100`}>
              <span className={`text-lg font-bold text-${categoryColor}-600`}>{requirement.code}</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{requirement.name}</h4>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge(requirement.status)}
                <span className="text-xs text-gray-500">{requirement.completion}% complete</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-32">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(requirement.completion)}`}
                  style={{ width: `${requirement.completion}%` }}
                />
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-3">Required Disclosure Topics:</p>
            <div className="flex flex-wrap gap-2">
              {requirement.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CSRDCompliance() {
  const [expandedId, setExpandedId] = useState(null)
  const [filter, setFilter] = useState('all')

  const environmentalReqs = csrdRequirements.filter(r => r.code.startsWith('E'))
  const socialReqs = csrdRequirements.filter(r => r.code.startsWith('S'))
  const governanceReqs = csrdRequirements.filter(r => r.code.startsWith('G'))

  const overallProgress = Math.round(
    csrdRequirements.reduce((sum, r) => sum + r.completion, 0) / csrdRequirements.length
  )

  const completedCount = csrdRequirements.filter(r => r.status === 'completed').length
  const inProgressCount = csrdRequirements.filter(r => r.status === 'in_progress').length
  const notStartedCount = csrdRequirements.filter(r => r.status === 'not_started').length

  const filteredRequirements = filter === 'all'
    ? csrdRequirements
    : csrdRequirements.filter(r => {
        if (filter === 'environmental') return r.code.startsWith('E')
        if (filter === 'social') return r.code.startsWith('S')
        if (filter === 'governance') return r.code.startsWith('G')
        return true
      })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8" />
              <h2 className="text-2xl font-bold">CSRD Compliance</h2>
            </div>
            <p className="mt-2 text-indigo-100">
              European Sustainability Reporting Standards (ESRS) preparation tracker
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{overallProgress}%</div>
            <span className="text-indigo-200">Overall Readiness</span>
          </div>
        </div>
      </div>

      {/* Timeline Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">CSRD Reporting Timeline</p>
            <p className="text-sm text-blue-700">
              First CSRD-compliant report due in 2025 for FY2024 data. Currently in preparation phase.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{overallProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-indigo-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <Clock className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-800">{inProgressCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-10 h-10 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Not Started</p>
              <p className="text-2xl font-bold text-gray-800">{notStartedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-5 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">Environmental (E1-E5)</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-700">Progress</span>
              <span className="font-medium text-green-800">
                {Math.round(environmentalReqs.reduce((sum, r) => sum + r.completion, 0) / environmentalReqs.length)}%
              </span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{
                  width: `${environmentalReqs.reduce((sum, r) => sum + r.completion, 0) / environmentalReqs.length}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-3">Social (S1-S4)</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-700">Progress</span>
              <span className="font-medium text-purple-800">
                {Math.round(socialReqs.reduce((sum, r) => sum + r.completion, 0) / socialReqs.length)}%
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-purple-500"
                style={{
                  width: `${socialReqs.reduce((sum, r) => sum + r.completion, 0) / socialReqs.length}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Governance (G1)</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Progress</span>
              <span className="font-medium text-blue-800">
                {Math.round(governanceReqs.reduce((sum, r) => sum + r.completion, 0) / governanceReqs.length)}%
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${governanceReqs.reduce((sum, r) => sum + r.completion, 0) / governanceReqs.length}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Filter:</span>
        {['all', 'environmental', 'social', 'governance'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Requirements List */}
      <div className="space-y-3">
        {filteredRequirements.map(req => (
          <ESRSCard
            key={req.id}
            requirement={req}
            isExpanded={expandedId === req.id}
            onToggle={() => setExpandedId(expandedId === req.id ? null : req.id)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Export Progress Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Generate Gap Analysis</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">ESRS Documentation</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CSRDCompliance
