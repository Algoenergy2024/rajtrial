import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2, Shield, Globe, Flag, Users, Factory, Target,
  Zap, AlertTriangle, TrendingUp, ArrowRight, Info
} from 'lucide-react'
import { useOrganization, CATEGORIES } from '../context/OrganizationContext'
import { entities, entityTypes } from '../data/belgianEntities'
import { europeanCities } from '../data/europeanCities'
import { ukCitiesFull } from '../data/ukCitiesFull'

function LandingDashboard() {
  const navigate = useNavigate()
  const { setCategory } = useOrganization()

  // Compute aggregates
  const banks = entities.filter(e => e.type === entityTypes.BANK)
  const insurers = entities.filter(e => e.type === entityTypes.INSURANCE)

  // Belgian Banks stats
  const bankStats = {
    count: banks.length,
    totalAssets: banks.reduce((sum, b) => sum + (b.totalAssets || 0), 0),
    avgEsgScore: banks.filter(b => b.esgScore).length > 0
      ? (banks.reduce((sum, b) => sum + (b.esgScore || 0), 0) / banks.filter(b => b.esgScore).length).toFixed(1)
      : null,
    withNetZero: banks.filter(b => b.climate?.netZeroTarget).length,
    reportingYears: [...new Set(banks.map(b => b.reportingYear).filter(Boolean))]
  }

  // Belgian Insurance stats
  const insurerStats = {
    count: insurers.length,
    totalAssets: insurers.reduce((sum, i) => sum + (i.totalAssets || 0), 0),
    avgEsgScore: insurers.filter(i => i.esgScore).length > 0
      ? (insurers.reduce((sum, i) => sum + (i.esgScore || 0), 0) / insurers.filter(i => i.esgScore).length).toFixed(1)
      : null,
    withNetZero: insurers.filter(i => i.climate?.netZeroTarget).length,
    reportingYears: [...new Set(insurers.map(i => i.reportingYear).filter(Boolean))]
  }

  // EU Cities stats
  const euCityStats = {
    count: europeanCities.length,
    countries: [...new Set(europeanCities.map(c => c.country))].length,
    totalPopulation: europeanCities.reduce((sum, c) => sum + (c.population || 0), 0),
    withHazards: europeanCities.filter(c => c.hazards?.length > 0).length,
    topCountries: Object.entries(
      europeanCities.reduce((acc, c) => {
        acc[c.country] = (acc[c.country] || 0) + 1
        return acc
      }, {})
    ).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }

  // UK Cities stats
  const ukCityStats = {
    count: ukCitiesFull.length,
    totalPopulation: ukCitiesFull.reduce((sum, c) => {
      const pop = c.q1_2?.population || c.profile?.population || 0
      return sum + pop
    }, 0),
    withTargets: ukCitiesFull.filter(c => c.targets?.length > 0 || c.q6_1_1?.length > 0).length,
    withActions: ukCitiesFull.filter(c => c.actions?.length > 0 || c.q9_1?.length > 0 || c.q9_2?.length > 0).length,
    withHazards: ukCitiesFull.filter(c => c.hazards?.length > 0 || c.q2_2?.length > 0).length,
    totalHazards: ukCitiesFull.reduce((sum, c) => sum + (c.q2_2?.length || c.hazards?.length || 0), 0)
  }

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  const handleExplore = (category) => {
    setCategory(category)
    switch (category) {
      case CATEGORIES.UK_CITIES:
        navigate('/uk-dashboard')
        break
      case CATEGORIES.EUROPEAN_CITIES:
        navigate('/city')
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">ESG Reporting Platform</h1>
        <p className="text-white/80 text-lg mb-6">
          Explore sustainability data across European cities and Belgian financial institutions
        </p>
        <div className="flex items-center gap-2 text-sm text-white/70 bg-white/10 rounded-lg px-4 py-2 w-fit">
          <Info className="w-4 h-4" />
          <span>Data sourced from CDP 2025 submissions and public sustainability reports</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Globe className="w-4 h-4" />
            Total Entities
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {bankStats.count + insurerStats.count + euCityStats.count + ukCityStats.count}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Users className="w-4 h-4" />
            Population Covered
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatNumber(euCityStats.totalPopulation + ukCityStats.totalPopulation)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Flag className="w-4 h-4" />
            Countries
          </div>
          <p className="text-3xl font-bold text-gray-800">{euCityStats.countries + 1}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Hazards Tracked
          </div>
          <p className="text-3xl font-bold text-gray-800">{ukCityStats.totalHazards}+</p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Belgian Banks */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Belgian Banks</h3>
                  <p className="text-sm text-gray-500">{bankStats.count} institutions</p>
                </div>
              </div>
              <button
                onClick={() => handleExplore(CATEGORIES.BELGIAN_BANKS)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Total Assets</p>
                <p className="text-lg font-bold text-gray-800">€{formatNumber(bankStats.totalAssets)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Avg ESG Score</p>
                <p className="text-lg font-bold text-gray-800">{bankStats.avgEsgScore || 'N/A'}/10</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Net Zero Targets</p>
                <p className="text-lg font-bold text-gray-800">{bankStats.withNetZero}/{bankStats.count}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Data from {bankStats.reportingYears.join(', ')} sustainability reports
            </p>
          </div>
        </div>

        {/* Belgian Insurance */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Belgian Insurance</h3>
                  <p className="text-sm text-gray-500">{insurerStats.count} companies</p>
                </div>
              </div>
              <button
                onClick={() => handleExplore(CATEGORIES.BELGIAN_INSURANCE)}
                className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Total Assets</p>
                <p className="text-lg font-bold text-gray-800">€{formatNumber(insurerStats.totalAssets)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Avg ESG Score</p>
                <p className="text-lg font-bold text-gray-800">{insurerStats.avgEsgScore || 'N/A'}/10</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Net Zero Targets</p>
                <p className="text-lg font-bold text-gray-800">{insurerStats.withNetZero}/{insurerStats.count}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Data from {insurerStats.reportingYears.join(', ')} sustainability reports
            </p>
          </div>
        </div>

        {/* European Cities */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">European Cities</h3>
                  <p className="text-sm text-gray-500">{euCityStats.count} cities across {euCityStats.countries} countries</p>
                </div>
              </div>
              <button
                onClick={() => handleExplore(CATEGORIES.EUROPEAN_CITIES)}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Population</p>
                <p className="text-lg font-bold text-gray-800">{formatNumber(euCityStats.totalPopulation)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Report Hazards</p>
                <p className="text-lg font-bold text-gray-800">{euCityStats.withHazards}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Top Country</p>
                <p className="text-lg font-bold text-gray-800">{euCityStats.topCountries[0]?.[0] || 'N/A'}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              CDP 2025 city disclosures
            </p>
          </div>
        </div>

        {/* UK Cities */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Flag className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">UK Cities</h3>
                  <p className="text-sm text-gray-500">{ukCityStats.count} entities with full CDP Q1-Q11</p>
                </div>
              </div>
              <button
                onClick={() => handleExplore(CATEGORIES.UK_CITIES)}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Population</p>
                <p className="text-lg font-bold text-gray-800">{formatNumber(ukCityStats.totalPopulation)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">With Targets</p>
                <p className="text-lg font-bold text-gray-800">{ukCityStats.withTargets}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">With Actions</p>
                <p className="text-lg font-bold text-gray-800">{ukCityStats.withActions}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Full CDP 2025 questionnaire data (Q1-Q11)
            </p>
          </div>
        </div>
      </div>

      {/* Data Quality Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">About this data</p>
          <p className="text-amber-700">
            All data is self-reported by organizations to CDP or extracted from public sustainability reports.
            Reporting completeness and methodologies vary. Numbers shown are aggregates for illustrative purposes
            and may not reflect current-year figures for all entities.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingDashboard
