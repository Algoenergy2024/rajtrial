import React from 'react'
import {
  Building2, TrendingUp, Target, Leaf, Users, DollarSign,
  ArrowRight, AlertTriangle, CheckCircle, Info
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { entities, entityTypes } from '../data/belgianEntities'

function BanksDashboard() {
  const { setSelectedId } = useOrganization()

  const banks = entities.filter(e => e.type === entityTypes.BANK)

  // Compute aggregates
  const stats = {
    count: banks.length,
    totalAssets: banks.reduce((sum, b) => sum + (b.totalAssets || 0), 0),
    totalEmployees: banks.reduce((sum, b) => sum + (b.employees || 0), 0),
    avgEsgScore: banks.filter(b => b.esgScore).length > 0
      ? (banks.reduce((sum, b) => sum + (b.esgScore || 0), 0) / banks.filter(b => b.esgScore).length)
      : null,
    withNetZero: banks.filter(b => b.climate?.netZeroTarget).length,
    withSbti: banks.filter(b => b.climate?.sbtiValidated).length,
    avgClimateScore: banks.filter(b => b.scores?.climate).length > 0
      ? (banks.reduce((sum, b) => sum + (b.scores?.climate || 0), 0) / banks.filter(b => b.scores?.climate).length)
      : null,
    totalGreenBonds: banks.reduce((sum, b) => sum + (b.climate?.greenBonds || 0), 0),
    reportingYears: [...new Set(banks.map(b => b.reportingYear).filter(Boolean))].sort()
  }

  const formatNumber = (num) => {
    if (num >= 1e12) return '€' + (num / 1e12).toFixed(1) + 'T'
    if (num >= 1e9) return '€' + (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return '€' + (num / 1e6).toFixed(1) + 'M'
    return '€' + num.toLocaleString()
  }

  const getScoreColor = (score) => {
    if (!score) return 'text-gray-400'
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (!score) return 'bg-gray-100'
    if (score >= 8) return 'bg-green-100'
    if (score >= 6) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Belgian Banks</h1>
            <p className="text-white/80">{stats.count} institutions tracked</p>
          </div>
        </div>
        <p className="text-white/70 text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          Data from {stats.reportingYears.join(', ')} sustainability reports
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Total Assets
          </div>
          <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.totalAssets)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            Avg ESG Score
          </div>
          <p className={`text-2xl font-bold ${getScoreColor(stats.avgEsgScore)}`}>
            {stats.avgEsgScore?.toFixed(1) || 'N/A'}/10
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Target className="w-4 h-4" />
            Net Zero Committed
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.withNetZero}/{stats.count}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Leaf className="w-4 h-4" />
            Green Bonds Issued
          </div>
          <p className="text-2xl font-bold text-green-600">{formatNumber(stats.totalGreenBonds)}</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Employees</p>
          <p className="text-xl font-bold text-gray-800">{stats.totalEmployees.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Avg Climate Score</p>
          <p className={`text-xl font-bold ${getScoreColor(stats.avgClimateScore)}`}>
            {stats.avgClimateScore?.toFixed(1) || 'N/A'}/10
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">SBTi Validated</p>
          <p className="text-xl font-bold text-gray-800">{stats.withSbti}/{stats.count}</p>
        </div>
      </div>

      {/* Banks List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-800">All Banks</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {banks.map(bank => (
            <button
              key={bank.id}
              onClick={() => setSelectedId(bank.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{bank.name}</p>
                  <p className="text-sm text-gray-500">
                    {bank.headquarters} • {bank.employees?.toLocaleString()} employees
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Assets</p>
                  <p className="font-medium text-gray-800">{formatNumber(bank.totalAssets)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">ESG Score</p>
                  <p className={`font-bold ${getScoreColor(bank.esgScore)}`}>
                    {bank.esgScore || 'N/A'}
                  </p>
                </div>
                <div className="text-right w-20">
                  {bank.climate?.netZeroTarget ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Net Zero
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                      No target
                    </span>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          ESG scores and metrics are compiled from public sustainability reports and may use different methodologies across institutions.
        </p>
      </div>
    </div>
  )
}

export default BanksDashboard
