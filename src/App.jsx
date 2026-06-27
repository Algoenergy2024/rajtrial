import React, { useState } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Leaf,
  Users,
  Shield,
  FileText,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  TrendingUp,
  AlertTriangle,
  Menu,
  Globe,
  MapPin,
  Flag,
  CloudRain,
  Factory,
  Zap,
  Target,
  ClipboardList,
  Home
} from 'lucide-react'

import { OrganizationProvider, useOrganization, CATEGORIES } from './context/OrganizationContext'
import EntitySelector from './components/EntitySelector'

// Category tabs configuration
const CATEGORY_TABS = [
  { key: CATEGORIES.BELGIAN_BANKS, label: 'Banks', shortLabel: 'Banks', icon: Building2, color: 'blue' },
  { key: CATEGORIES.BELGIAN_INSURANCE, label: 'Insurance', shortLabel: 'Ins.', icon: Shield, color: 'purple' },
  { key: CATEGORIES.EUROPEAN_CITIES, label: 'EU Cities', shortLabel: 'EU', icon: Globe, color: 'green' },
  { key: CATEGORIES.UK_CITIES, label: 'UK Cities', shortLabel: 'UK', icon: Flag, color: 'indigo' },
]
import Dashboard from './pages/Dashboard'
import ClimateAction from './pages/ClimateAction'
import SocialImpact from './pages/SocialImpact'
import Governance from './pages/Governance'
import RiskManagement from './pages/RiskManagement'
import CSRDCompliance from './pages/CSRDCompliance'
import AIAutomation from './pages/AIAutomation'
import DataEntry from './pages/DataEntry'
import Comparison from './pages/Comparison'
import Cities from './pages/Cities'
import CityDetail from './pages/CityDetail'
import UKCityDetail from './pages/UKCityDetail'
import UKCityDashboard from './pages/UKCityDashboard'
import UKQ2Detail from './pages/UKQ2Detail'
import UKQ3Detail from './pages/UKQ3Detail'
import UKQ4Detail from './pages/UKQ4Detail'
import UKQ5Detail from './pages/UKQ5Detail'
import UKQ6Detail from './pages/UKQ6Detail'
import UKQ7Detail from './pages/UKQ7Detail'
import UKQ8Detail from './pages/UKQ8Detail'
import UKQ9Detail from './pages/UKQ9Detail'
import UKQ11Detail from './pages/UKQ11Detail'
import LandingDashboard from './pages/LandingDashboard'
import BanksDashboard from './pages/BanksDashboard'
import InsuranceDashboard from './pages/InsuranceDashboard'
import EUCitiesDashboard from './pages/EUCitiesDashboard'
import UKCitiesOverview from './pages/UKCitiesOverview'

// Navigation for Belgian Banks
const banksNavigation = [
  { name: 'Overview', href: '/banks', icon: LayoutDashboard },
  { name: 'Entity Detail', href: '/dashboard', icon: Building2 },
  { name: 'Sector Comparison', href: '/comparison', icon: TrendingUp },
  { name: 'Climate Action', href: '/climate', icon: Leaf },
  { name: 'Social Impact', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: Shield },
  { name: 'Risk Management', href: '/risk', icon: AlertTriangle },
  { name: 'CSRD Compliance', href: '/csrd', icon: FileText },
  { name: 'AI & Automation', href: '/ai', icon: Brain },
  { name: 'Data Entry', href: '/data', icon: Settings },
]

// Navigation for Belgian Insurance
const insuranceNavigation = [
  { name: 'Overview', href: '/insurance', icon: LayoutDashboard },
  { name: 'Entity Detail', href: '/dashboard', icon: Shield },
  { name: 'Sector Comparison', href: '/comparison', icon: TrendingUp },
  { name: 'Climate Action', href: '/climate', icon: Leaf },
  { name: 'Social Impact', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: Shield },
  { name: 'Risk Management', href: '/risk', icon: AlertTriangle },
  { name: 'CSRD Compliance', href: '/csrd', icon: FileText },
]

// Navigation for European cities
const citiesNavigation = [
  { name: 'Overview', href: '/eu-cities', icon: LayoutDashboard },
  { name: 'City Detail', href: '/city', icon: MapPin },
  { name: 'All Cities', href: '/cities', icon: Globe },
  { name: 'Comparison', href: '/comparison', icon: TrendingUp },
]

// Navigation for UK cities (full CDP data)
const ukCitiesNavigation = [
  { name: 'Overview', href: '/uk-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/uk-dashboard', icon: MapPin },
  { name: 'Q1 Profile', href: '/uk-city', icon: FileText },
  { name: 'Q2 Hazards', href: '/uk-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/uk-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/uk-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/uk-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/uk-q6', icon: Target },
  { name: 'Q7 Other', href: '/uk-q7', icon: Target },
  { name: 'Q8 Plans', href: '/uk-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/uk-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/uk-q11', icon: FileText },
  { name: 'All UK Entities', href: '/cities', icon: Globe },
]

// CDP Regions for cities sidebar
const cdpRegions = [
  { name: 'Europe', code: 'Europe', count: 148 },
  { name: 'UK & Western', code: 'UKWW', count: 59 },
]

// Section navigation for each UK city question page
const ukSectionsByPage = {
  '/uk-city': [
    { name: 'Q1.2 - Jurisdiction', code: 'q1_2' },
    { name: 'Q1.3 - Oversight', code: 'q1_3' },
    { name: 'Q1.4 - Opportunities', code: 'q1_4' },
    { name: 'Q1.5 - Engagement', code: 'q1_5' },
    { name: 'Q1.6 - Collaboration', code: 'q1_6' },
  ],
  '/uk-q2': [
    { name: 'Q2.1 - Assessment Status', code: 'q2_1' },
    { name: 'Q2.1.1 - Assessments', code: 'q2_1_1' },
    { name: 'Q2.2 - Climate Hazards', code: 'q2_2' },
    { name: 'Q2.3 - Adaptive Capacity', code: 'q2_3' },
  ],
  '/uk-q3': [
    { name: 'Q3.1 - Inventory Status', code: 'q3_1' },
    { name: 'Q3.1.1 - Documents', code: 'q3_1_1' },
    { name: 'Q3.1.3 - Sector Emissions', code: 'q3_1_3' },
    { name: 'Q3.2 - Consumption Based', code: 'q3_2' },
    { name: 'Q3.3 - Tracking', code: 'q3_3' },
  ],
  '/uk-q4': [
    { name: 'Q4.1 - Energy Assessment', code: 'q4_1' },
    { name: 'Q4.3 - Energy Poverty', code: 'q4_3' },
    { name: 'Q4.5 - Transport', code: 'q4_5' },
    { name: 'Q4.7 - Waste', code: 'q4_7' },
    { name: 'Q4.8 - Health', code: 'q4_8' },
    { name: 'Q4.9 - Air Quality', code: 'q4_9' },
    { name: 'Q4.10 - Water', code: 'q4_10' },
  ],
  '/uk-q5': [
    { name: 'Q5.1 - Status', code: 'q5_1' },
    { name: 'Q5.1.1 - Goals', code: 'q5_1_1' },
  ],
  '/uk-q6': [
    { name: 'Q6.1 - Overview', code: 'q6_1' },
    { name: 'Q6.1.1 - Targets', code: 'q6_1_1' },
    { name: 'Q6.1.2 - Carbon Credits', code: 'q6_1_2' },
  ],
  '/uk-q7': [
    { name: 'Q7.1 - Other Targets', code: 'q7_1' },
  ],
  '/uk-q8': [
    { name: 'Q8.1 - Status', code: 'q8_1' },
    { name: 'Q8.1.1 - Climate Plans', code: 'q8_1_1' },
    { name: 'Q8.2 - Other Plans', code: 'q8_2' },
    { name: 'Q8.3 - Characteristics', code: 'q8_3' },
    { name: 'Q8.4 - Procurement', code: 'q8_4' },
  ],
  '/uk-q9': [
    { name: 'Q9.1 - Adaptation Actions', code: 'q9_1' },
    { name: 'Q9.2 - Mitigation Actions', code: 'q9_2' },
    { name: 'Q9.3 - Projects', code: 'q9_3' },
    { name: 'Q9.4 - Finance', code: 'q9_4' },
  ],
  '/uk-q11': [
    { name: 'Q11.1 - Documents', code: 'q11_1' },
    { name: 'Q11.2 - Comments', code: 'q11_2' },
  ],
}

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { category, setCategory, isCity, isUKCity, isEuropeanCity } = useOrganization()

  const navigation = isUKCity
    ? ukCitiesNavigation
    : isEuropeanCity
      ? citiesNavigation
      : category === CATEGORIES.BELGIAN_INSURANCE
        ? insuranceNavigation
        : banksNavigation

  // Handle category change with automatic navigation to category dashboard
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    // Navigate to the appropriate category dashboard
    switch (newCategory) {
      case CATEGORIES.UK_CITIES:
        navigate('/uk-cities')
        break
      case CATEGORIES.EUROPEAN_CITIES:
        navigate('/eu-cities')
        break
      case CATEGORIES.BELGIAN_INSURANCE:
        navigate('/insurance')
        break
      case CATEGORIES.BELGIAN_BANKS:
      default:
        navigate('/banks')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 bg-white shadow-xl transition-all duration-300
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-800">ESG Platform</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <Leaf className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Category Badge */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-b border-gray-100">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              isUKCity ? 'bg-indigo-50 text-indigo-700' :
              isEuropeanCity ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {category === CATEGORIES.BELGIAN_BANKS && '🏦 Belgian Banks'}
              {category === CATEGORIES.BELGIAN_INSURANCE && '🛡️ Belgian Insurance'}
              {category === CATEGORIES.EUROPEAN_CITIES && '🏙️ European Cities'}
              {category === CATEGORIES.UK_CITIES && '🇬🇧 UK Cities (Q1)'}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CDP Regions (for European cities) */}
        {isEuropeanCity && !sidebarCollapsed && (
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">CDP Regions</p>
            <div className="space-y-1">
              {cdpRegions.map(region => (
                <div
                  key={region.code}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <span>{region.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{region.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Dropdown (for UK cities) */}
        {isUKCity && !sidebarCollapsed && ukSectionsByPage[location.pathname] && (
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Jump to Section</p>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  const element = document.getElementById(e.target.value)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  e.target.value = ''
                }
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              defaultValue=""
            >
              <option value="" disabled>Select section...</option>
              {ukSectionsByPage[location.pathname].map(section => (
                <option key={section.code} value={section.code}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute bottom-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={`
        transition-all duration-300 min-h-screen
        ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
      `}>
        {/* Header - Split Design */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          {/* Top Bar - Branding & Global */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-3 ml-10 lg:ml-0">
              {/* Home Button */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
                title="Back to main dashboard"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:inline font-bold text-gray-800 text-sm">ESG Platform</span>
                <Home className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                CDP 2025
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          </div>

          {/* Second Bar - Category Tabs & Entity Selector */}
          <div className="flex items-center justify-between px-4 py-2">
            {/* Category Tabs */}
            <div className="flex items-center gap-1 ml-10 lg:ml-0">
              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = category === tab.key
                const colorClasses = {
                  blue: isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'hover:bg-blue-50 text-gray-600',
                  purple: isActive ? 'bg-purple-100 text-purple-700 border-purple-200' : 'hover:bg-purple-50 text-gray-600',
                  green: isActive ? 'bg-green-100 text-green-700 border-green-200' : 'hover:bg-green-50 text-gray-600',
                  indigo: isActive ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'hover:bg-indigo-50 text-gray-600',
                }
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleCategoryChange(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                      isActive ? colorClasses[tab.color] : `border-transparent ${colorClasses[tab.color]}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </button>
                )
              })}
            </div>

            {/* Entity Selector */}
            <EntitySelector />
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<LandingDashboard />} />
            <Route path="/banks" element={<BanksDashboard />} />
            <Route path="/insurance" element={<InsuranceDashboard />} />
            <Route path="/eu-cities" element={<EUCitiesDashboard />} />
            <Route path="/uk-cities" element={<UKCitiesOverview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/city" element={<CityDetail />} />
            <Route path="/uk-dashboard" element={<UKCityDashboard />} />
            <Route path="/uk-city" element={<UKCityDetail />} />
            <Route path="/uk-q2" element={<UKQ2Detail />} />
            <Route path="/uk-q3" element={<UKQ3Detail />} />
            <Route path="/uk-q4" element={<UKQ4Detail />} />
            <Route path="/uk-q5" element={<UKQ5Detail />} />
            <Route path="/uk-q6" element={<UKQ6Detail />} />
            <Route path="/uk-q7" element={<UKQ7Detail />} />
            <Route path="/uk-q8" element={<UKQ8Detail />} />
            <Route path="/uk-q9" element={<UKQ9Detail />} />
            <Route path="/uk-q11" element={<UKQ11Detail />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/climate" element={<ClimateAction />} />
            <Route path="/social" element={<SocialImpact />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/risk" element={<RiskManagement />} />
            <Route path="/csrd" element={<CSRDCompliance />} />
            <Route path="/ai" element={<AIAutomation />} />
            <Route path="/data" element={<DataEntry />} />
            <Route path="/comparison" element={<Comparison />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <OrganizationProvider>
      <AppContent />
    </OrganizationProvider>
  )
}

export default App
