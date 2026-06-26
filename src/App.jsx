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
  Menu
} from 'lucide-react'

import Dashboard from './pages/Dashboard'
import ClimateAction from './pages/ClimateAction'
import SocialImpact from './pages/SocialImpact'
import Governance from './pages/Governance'
import RiskManagement from './pages/RiskManagement'
import CSRDCompliance from './pages/CSRDCompliance'
import AIAutomation from './pages/AIAutomation'
import DataEntry from './pages/DataEntry'
import Comparison from './pages/Comparison'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Sector Comparison', href: '/comparison', icon: TrendingUp },
  { name: 'Climate Action', href: '/climate', icon: Leaf },
  { name: 'Social Impact', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: Building2 },
  { name: 'Risk Management', href: '/risk', icon: AlertTriangle },
  { name: 'CSRD Compliance', href: '/csrd', icon: FileText },
  { name: 'AI & Automation', href: '/ai', icon: Brain },
  { name: 'Data Entry', href: '/data', icon: Settings },
]

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const currentPage = navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'

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

        {/* Navigation */}
        <nav className="mt-6 px-3">
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
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4 ml-12 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-800">{currentPage}</h1>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                2023 Report
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full pulse-indicator"></span>
                <span className="text-sm text-gray-500">Live Data</span>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
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

export default App
