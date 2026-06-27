import React, { useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
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
  Flag
} from 'lucide-react'

import { OrganizationProvider, useOrganization, CATEGORIES } from './context/OrganizationContext'
import OrganizationSelector from './components/OrganizationSelector'
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

// Navigation for financial entities
const financialNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Sector Comparison', href: '/comparison', icon: TrendingUp },
  { name: 'Climate Action', href: '/climate', icon: Leaf },
  { name: 'Social Impact', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: Shield },
  { name: 'Risk Management', href: '/risk', icon: AlertTriangle },
  { name: 'CSRD Compliance', href: '/csrd', icon: FileText },
  { name: 'AI & Automation', href: '/ai', icon: Brain },
  { name: 'Data Entry', href: '/data', icon: Settings },
]

// Navigation for European cities
const citiesNavigation = [
  { name: 'City Overview', href: '/city', icon: MapPin },
  { name: 'All Cities', href: '/cities', icon: Globe },
  { name: 'Comparison', href: '/comparison', icon: TrendingUp },
]

// Navigation for UK cities (full CDP data)
const ukCitiesNavigation = [
  { name: 'Dashboard', href: '/uk-dashboard', icon: LayoutDashboard },
  { name: 'Full Q1 Detail', href: '/uk-city', icon: FileText },
  { name: 'All UK Entities', href: '/cities', icon: Globe },
]

// CDP Regions for cities sidebar
const cdpRegions = [
  { name: 'Europe', code: 'Europe', count: 148 },
  { name: 'UK & Western', code: 'UKWW', count: 59 },
]

// Q1 Sections for UK cities sidebar
const q1Sections = [
  { name: 'Q1.1 - Language', code: 'q1_1' },
  { name: 'Q1.2 - Jurisdiction', code: 'q1_2' },
  { name: 'Q1.3 - Oversight', code: 'q1_3' },
  { name: 'Q1.4 - Opportunities', code: 'q1_4' },
  { name: 'Q1.5 - Engagement', code: 'q1_5' },
  { name: 'Q1.6 - Collaboration', code: 'q1_6' },
]

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { category, isCity, isUKCity, isEuropeanCity } = useOrganization()

  const navigation = isUKCity
    ? ukCitiesNavigation
    : isEuropeanCity
      ? citiesNavigation
      : financialNavigation

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

        {/* Q1 Sections Dropdown (for UK cities) */}
        {isUKCity && !sidebarCollapsed && (
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
              <option value="" disabled>Select Q1 section...</option>
              {q1Sections.map(section => (
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
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-4 ml-12 lg:ml-0">
              <OrganizationSelector />
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                CDP 2025
              </span>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full pulse-indicator"></span>
                <span className="text-sm text-gray-500">Live</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city" element={<CityDetail />} />
            <Route path="/uk-dashboard" element={<UKCityDashboard />} />
            <Route path="/uk-city" element={<UKCityDetail />} />
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
