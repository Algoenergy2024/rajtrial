import React from 'react'
import {
  Users, Heart, GraduationCap, Award, Building, Briefcase,
  TrendingUp, Star, CheckCircle, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'

function SocialImpact() {
  const { selectedEntity: selectedOrg, isCity } = useOrganization()

  if (isCity || !selectedOrg) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a financial entity</h3>
        <p className="text-gray-500">Switch to Belgian Banks or Insurance to view social impact data</p>
      </div>
    )
  }

  const hasSocialData = selectedOrg?.scores?.social !== null

  // Build social metrics from available data
  const socialMetrics = []

  if (selectedOrg.social?.communityInvestment) {
    socialMetrics.push({
      id: 'community',
      title: 'Community Investment',
      value: `€${selectedOrg.social.communityInvestment.toLocaleString()}`,
      subtitle: 'Annual contribution',
      description: 'Investment in community projects and initiatives',
      icon: Heart,
      color: '#EC4899'
    })
  }

  if (selectedOrg.employees) {
    socialMetrics.push({
      id: 'employees',
      title: 'Total Workforce',
      value: selectedOrg.employees.toLocaleString(),
      subtitle: 'Employees',
      description: 'Total workforce across all operations',
      icon: Users,
      color: '#3B82F6'
    })
  }

  if (selectedOrg.social?.trainingHoursPerEmployee) {
    socialMetrics.push({
      id: 'training',
      title: 'Training Hours',
      value: `${selectedOrg.social.trainingHoursPerEmployee}h`,
      subtitle: 'Per employee',
      description: 'Average annual training and development',
      icon: GraduationCap,
      color: '#8B5CF6'
    })
  }

  if (selectedOrg.social?.employeeSatisfaction) {
    socialMetrics.push({
      id: 'satisfaction',
      title: 'Employee Satisfaction',
      value: `${selectedOrg.social.employeeSatisfaction}%`,
      subtitle: 'Satisfaction rate',
      description: 'Employee engagement and wellbeing score',
      icon: Star,
      color: '#F59E0B'
    })
  }

  // Employee metrics grid
  const employeeMetrics = []

  if (selectedOrg.social?.trainingHoursPerEmployee) {
    employeeMetrics.push({ label: 'Training Hours/Employee', value: selectedOrg.social.trainingHoursPerEmployee.toString(), trend: null })
  }
  if (selectedOrg.social?.employeeSatisfaction) {
    employeeMetrics.push({ label: 'Employee Satisfaction', value: `${selectedOrg.social.employeeSatisfaction}%`, trend: null })
  }
  if (selectedOrg.social?.voluntaryTurnover) {
    employeeMetrics.push({ label: 'Voluntary Turnover', value: `${selectedOrg.social.voluntaryTurnover}%`, trend: null })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Social Impact</h2>
            </div>
            <p className="mt-2 text-purple-100">
              {selectedOrg.name}'s community investment, employee wellbeing, and social responsibility
            </p>
          </div>
          <div className="text-right">
            {selectedOrg.scores?.social !== null ? (
              <>
                <div className="text-4xl font-bold">{selectedOrg.scores.social.toFixed(1)}/10</div>
                <span className="text-purple-200">
                  {selectedOrg.scores.social >= 8 ? 'Strong' :
                   selectedOrg.scores.social >= 6 ? 'Moderate' : 'Developing'}
                </span>
              </>
            ) : (
              <span className="text-purple-200">Data Pending</span>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      {socialMetrics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialMetrics.map(metric => {
            const Icon = metric.icon
            return (
              <div key={metric.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 metric-card">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <h3 className="text-sm text-gray-500">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <Info className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h4 className="font-medium text-yellow-800">Social Impact Data Pending</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Upload {selectedOrg.name}'s sustainability report to view detailed social metrics.
          </p>
        </div>
      )}

      {/* Employee Wellbeing */}
      {employeeMetrics.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Employee Wellbeing Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {employeeMetrics.map((metric, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">{metric.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                  {metric.trend && (
                    <span className={`text-sm font-medium ${
                      metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooperative / Ownership Model */}
      {selectedOrg.isCooperative && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-800">Cooperative Values</h3>
              <p className="text-sm text-purple-700 mt-1">
                As a cooperative, {selectedOrg.name} prioritizes member welfare, democratic governance,
                and reinvestment in the community over pure profit maximization.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center text-sm text-purple-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Member ownership
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Democratic control
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Community focus
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Profit reinvestment
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workforce Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Workforce Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {selectedOrg.employees?.toLocaleString() || 'N/A'}
            </p>
            <p className="text-sm text-gray-500">Total Employees</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{selectedOrg.headquarters || 'Belgium'}</p>
            <p className="text-sm text-gray-500">Headquarters</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {selectedOrg.governance?.boardFemalePercentage !== null
                ? `${selectedOrg.governance.boardFemalePercentage}%`
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">Board Diversity</p>
          </div>
        </div>
      </div>

      {/* Data Source */}
      {selectedOrg.dataSource && (
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <span className="font-medium">Data Source:</span> {selectedOrg.dataSource}
          {selectedOrg.lastUpdated && (
            <span className="ml-4">| Last Updated: {selectedOrg.lastUpdated}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default SocialImpact
