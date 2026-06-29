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
  ChevronDown,
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
  { key: CATEGORIES.UKWW_CITIES, label: 'UKWW', shortLabel: 'UKWW', icon: Globe, color: 'amber' },
  { key: CATEGORIES.CHINA_CITIES, label: 'China', shortLabel: 'China', icon: Globe, color: 'red' },
  { key: CATEGORIES.INDIA_CITIES, label: 'India', shortLabel: 'India', icon: Globe, color: 'orange' },
  { key: CATEGORIES.JAPAN_CITIES, label: 'Japan', shortLabel: 'Japan', icon: Globe, color: 'pink' },
  { key: CATEGORIES.LATAM_CITIES, label: 'Latin America', shortLabel: 'LATAM', icon: Globe, color: 'emerald' },
  { key: CATEGORIES.NORTH_AMERICA_CITIES, label: 'North America', shortLabel: 'NA', icon: Globe, color: 'sky' },
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
import EUQ1Detail from './pages/EUQ1Detail'
import EUQ2Detail from './pages/EUQ2Detail'
import EUQ3Detail from './pages/EUQ3Detail'
import EUQ4Detail from './pages/EUQ4Detail'
import EUQ5Detail from './pages/EUQ5Detail'
import EUQ6Detail from './pages/EUQ6Detail'
import EUQ7Detail from './pages/EUQ7Detail'
import EUQ8Detail from './pages/EUQ8Detail'
import EUQ9Detail from './pages/EUQ9Detail'
import EUQ11Detail from './pages/EUQ11Detail'
import LandingDashboard from './pages/LandingDashboard'
import BanksDashboard from './pages/BanksDashboard'
import InsuranceDashboard from './pages/InsuranceDashboard'
import EUCitiesDashboard from './pages/EUCitiesDashboard'
import UKCitiesOverview from './pages/UKCitiesOverview'
import UKCityComparison from './pages/UKCityComparison'
import UKAIAutomation from './pages/UKAIAutomation'
import EUCityDashboard from './pages/EUCityDashboard'
import EUCityComparison from './pages/EUCityComparison'
import EUAIAutomation from './pages/EUAIAutomation'
import UKWWCitiesDashboard from './pages/UKWWCitiesDashboard'
import UKWWCityDashboard from './pages/UKWWCityDashboard'
import UKWWCityComparison from './pages/UKWWCityComparison'
import UKWWAIAutomation from './pages/UKWWAIAutomation'
import UKWWQ1Detail from './pages/UKWWQ1Detail'
import UKWWQ2Detail from './pages/UKWWQ2Detail'
import UKWWQ3Detail from './pages/UKWWQ3Detail'
import UKWWQ4Detail from './pages/UKWWQ4Detail'
import UKWWQ5Detail from './pages/UKWWQ5Detail'
import UKWWQ6Detail from './pages/UKWWQ6Detail'
import UKWWQ7Detail from './pages/UKWWQ7Detail'
import UKWWQ8Detail from './pages/UKWWQ8Detail'
import UKWWQ9Detail from './pages/UKWWQ9Detail'
import UKWWQ11Detail from './pages/UKWWQ11Detail'
import ChinaCitiesDashboard from './pages/ChinaCitiesDashboard'
import ChinaCityDashboard from './pages/ChinaCityDashboard'
import ChinaCityComparison from './pages/ChinaCityComparison'
import ChinaAIAutomation from './pages/ChinaAIAutomation'
import ChinaQ1Detail from './pages/ChinaQ1Detail'
import ChinaQ2Detail from './pages/ChinaQ2Detail'
import ChinaQ3Detail from './pages/ChinaQ3Detail'
import ChinaQ4Detail from './pages/ChinaQ4Detail'
import ChinaQ5Detail from './pages/ChinaQ5Detail'
import ChinaQ6Detail from './pages/ChinaQ6Detail'
import ChinaQ7Detail from './pages/ChinaQ7Detail'
import ChinaQ8Detail from './pages/ChinaQ8Detail'
import ChinaQ9Detail from './pages/ChinaQ9Detail'
import ChinaQ11Detail from './pages/ChinaQ11Detail'
import IndiaCitiesDashboard from './pages/IndiaCitiesDashboard'
import IndiaCityDashboard from './pages/IndiaCityDashboard'
import IndiaCityComparison from './pages/IndiaCityComparison'
import IndiaAIAutomation from './pages/IndiaAIAutomation'
import IndiaQ1Detail from './pages/IndiaQ1Detail'
import IndiaQ2Detail from './pages/IndiaQ2Detail'
import IndiaQ3Detail from './pages/IndiaQ3Detail'
import IndiaQ4Detail from './pages/IndiaQ4Detail'
import IndiaQ5Detail from './pages/IndiaQ5Detail'
import IndiaQ6Detail from './pages/IndiaQ6Detail'
import IndiaQ7Detail from './pages/IndiaQ7Detail'
import IndiaQ8Detail from './pages/IndiaQ8Detail'
import IndiaQ9Detail from './pages/IndiaQ9Detail'
import IndiaQ11Detail from './pages/IndiaQ11Detail'
import JapanCitiesDashboard from './pages/JapanCitiesDashboard'
import JapanCityDashboard from './pages/JapanCityDashboard'
import JapanCityComparison from './pages/JapanCityComparison'
import JapanAIAutomation from './pages/JapanAIAutomation'
import JapanQ1Detail from './pages/JapanQ1Detail'
import JapanQ2Detail from './pages/JapanQ2Detail'
import JapanQ3Detail from './pages/JapanQ3Detail'
import JapanQ4Detail from './pages/JapanQ4Detail'
import JapanQ5Detail from './pages/JapanQ5Detail'
import JapanQ6Detail from './pages/JapanQ6Detail'
import JapanQ7Detail from './pages/JapanQ7Detail'
import JapanQ8Detail from './pages/JapanQ8Detail'
import JapanQ9Detail from './pages/JapanQ9Detail'
import JapanQ11Detail from './pages/JapanQ11Detail'
import LatamCitiesDashboard from './pages/LatamCitiesDashboard'
import LatamCityDashboard from './pages/LatamCityDashboard'
import LatamCityComparison from './pages/LatamCityComparison'
import LatamAIAutomation from './pages/LatamAIAutomation'
import LatamQ1Detail from './pages/LatamQ1Detail'
import LatamQ2Detail from './pages/LatamQ2Detail'
import LatamQ3Detail from './pages/LatamQ3Detail'
import LatamQ4Detail from './pages/LatamQ4Detail'
import LatamQ5Detail from './pages/LatamQ5Detail'
import LatamQ6Detail from './pages/LatamQ6Detail'
import LatamQ7Detail from './pages/LatamQ7Detail'
import LatamQ8Detail from './pages/LatamQ8Detail'
import LatamQ9Detail from './pages/LatamQ9Detail'
import LatamQ11Detail from './pages/LatamQ11Detail'
import NorthAmericaCitiesDashboard from './pages/NorthAmericaCitiesDashboard'
import NorthAmericaCityDashboard from './pages/NorthAmericaCityDashboard'
import NorthAmericaCityComparison from './pages/NorthAmericaCityComparison'
import NorthAmericaAIAutomation from './pages/NorthAmericaAIAutomation'
import NorthAmericaQ1Detail from './pages/NorthAmericaQ1Detail'
import NorthAmericaQ2Detail from './pages/NorthAmericaQ2Detail'
import NorthAmericaQ3Detail from './pages/NorthAmericaQ3Detail'
import NorthAmericaQ4Detail from './pages/NorthAmericaQ4Detail'
import NorthAmericaQ5Detail from './pages/NorthAmericaQ5Detail'
import NorthAmericaQ6Detail from './pages/NorthAmericaQ6Detail'
import NorthAmericaQ7Detail from './pages/NorthAmericaQ7Detail'
import NorthAmericaQ8Detail from './pages/NorthAmericaQ8Detail'
import NorthAmericaQ9Detail from './pages/NorthAmericaQ9Detail'
import NorthAmericaQ11Detail from './pages/NorthAmericaQ11Detail'

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

// Navigation for European cities (full CDP data)
const citiesNavigation = [
  { name: 'Overview', href: '/eu-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/eu-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'eu' },
  { name: 'City Comparison', href: '/eu-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/eu-ai', icon: Brain },
]

// CDP Question pages for EU Cities dropdown
const euCDPQuestions = [
  { name: 'Q1 Profile', href: '/eu-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/eu-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/eu-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/eu-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/eu-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/eu-q6', icon: Target },
  { name: 'Q7 Other', href: '/eu-q7', icon: Target },
  { name: 'Q8 Plans', href: '/eu-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/eu-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/eu-q11', icon: FileText },
]

// Navigation for UK cities (full CDP data)
const ukCitiesNavigation = [
  { name: 'Overview', href: '/uk-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/uk-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true },
  { name: 'City Comparison', href: '/uk-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/uk-ai', icon: Brain },
]

// CDP Question pages for UK Cities dropdown
const ukCDPQuestions = [
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
]

// Navigation for UKWW cities (uses EU data structure)
const ukwwNavigation = [
  { name: 'Overview', href: '/ukww-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/ukww-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'ukww' },
  { name: 'City Comparison', href: '/ukww-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/ukww-ai', icon: Brain },
]

// CDP Question pages for UKWW Cities dropdown (reuses EU structure)
const ukwwCDPQuestions = [
  { name: 'Q1 Profile', href: '/ukww-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/ukww-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/ukww-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/ukww-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/ukww-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/ukww-q6', icon: Target },
  { name: 'Q7 Other', href: '/ukww-q7', icon: Target },
  { name: 'Q8 Plans', href: '/ukww-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/ukww-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/ukww-q11', icon: FileText },
]

// Navigation for China cities
const chinaNavigation = [
  { name: 'Overview', href: '/china-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/china-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'china' },
  { name: 'City Comparison', href: '/china-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/china-ai', icon: Brain },
]

// CDP Question pages for China Cities dropdown
const chinaCDPQuestions = [
  { name: 'Q1 Profile', href: '/china-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/china-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/china-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/china-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/china-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/china-q6', icon: Target },
  { name: 'Q7 Other', href: '/china-q7', icon: Target },
  { name: 'Q8 Plans', href: '/china-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/china-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/china-q11', icon: FileText },
]

// Navigation for India cities
const indiaNavigation = [
  { name: 'Overview', href: '/india-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/india-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'india' },
  { name: 'City Comparison', href: '/india-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/india-ai', icon: Brain },
]

// CDP Question pages for India Cities dropdown
const indiaCDPQuestions = [
  { name: 'Q1 Profile', href: '/india-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/india-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/india-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/india-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/india-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/india-q6', icon: Target },
  { name: 'Q7 Other', href: '/india-q7', icon: Target },
  { name: 'Q8 Plans', href: '/india-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/india-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/india-q11', icon: FileText },
]

// Navigation for Japan cities
const japanNavigation = [
  { name: 'Overview', href: '/japan-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/japan-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'japan' },
  { name: 'City Comparison', href: '/japan-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/japan-ai', icon: Brain },
]

// CDP Question pages for Japan Cities dropdown
const japanCDPQuestions = [
  { name: 'Q1 Profile', href: '/japan-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/japan-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/japan-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/japan-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/japan-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/japan-q6', icon: Target },
  { name: 'Q7 Other', href: '/japan-q7', icon: Target },
  { name: 'Q8 Plans', href: '/japan-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/japan-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/japan-q11', icon: FileText },
]

// Navigation for Latin America cities
const latamNavigation = [
  { name: 'Overview', href: '/latam-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/latam-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'latam' },
  { name: 'City Comparison', href: '/latam-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/latam-ai', icon: Brain },
]

// CDP Question pages for Latin America Cities dropdown
const latamCDPQuestions = [
  { name: 'Q1 Profile', href: '/latam-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/latam-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/latam-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/latam-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/latam-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/latam-q6', icon: Target },
  { name: 'Q7 Other', href: '/latam-q7', icon: Target },
  { name: 'Q8 Plans', href: '/latam-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/latam-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/latam-q11', icon: FileText },
]

// Navigation for North America cities
const northAmericaNavigation = [
  { name: 'Overview', href: '/na-cities', icon: LayoutDashboard },
  { name: 'Entity Dashboard', href: '/na-dashboard', icon: MapPin },
  { name: 'CDP Questions', href: null, icon: FileText, isDropdown: true, dropdownType: 'northamerica' },
  { name: 'City Comparison', href: '/na-comparison', icon: TrendingUp },
  { name: 'AI & Automation', href: '/na-ai', icon: Brain },
]

// CDP Question pages for North America Cities dropdown
const northAmericaCDPQuestions = [
  { name: 'Q1 Profile', href: '/na-q1', icon: FileText },
  { name: 'Q2 Hazards', href: '/na-q2', icon: CloudRain },
  { name: 'Q3 Emissions', href: '/na-q3', icon: Factory },
  { name: 'Q4 Energy', href: '/na-q4', icon: Zap },
  { name: 'Q5 Adaptation', href: '/na-q5', icon: Shield },
  { name: 'Q6 Targets', href: '/na-q6', icon: Target },
  { name: 'Q7 Other', href: '/na-q7', icon: Target },
  { name: 'Q8 Plans', href: '/na-q8', icon: ClipboardList },
  { name: 'Q9 Actions', href: '/na-q9', icon: Zap },
  { name: 'Q11 Additional', href: '/na-q11', icon: FileText },
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
  const [cdpDropdownOpen, setCdpDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { category, setCategory, isCity, isUKCity, isEuropeanCity, isUKWWCity, isChinaCity, isIndiaCity, isJapanCity, isLatamCity, isNorthAmericaCity } = useOrganization()

  // Check if current page is a CDP question page
  const isOnUKCDPPage = ukCDPQuestions.some(q => q.href === location.pathname)
  const isOnEUCDPPage = euCDPQuestions.some(q => q.href === location.pathname)
  const isOnUKWWCDPPage = ukwwCDPQuestions.some(q => q.href === location.pathname)
  const isOnChinaCDPPage = chinaCDPQuestions.some(q => q.href === location.pathname)
  const isOnIndiaCDPPage = indiaCDPQuestions.some(q => q.href === location.pathname)
  const isOnJapanCDPPage = japanCDPQuestions.some(q => q.href === location.pathname)
  const isOnLatamCDPPage = latamCDPQuestions.some(q => q.href === location.pathname)
  const isOnNorthAmericaCDPPage = northAmericaCDPQuestions.some(q => q.href === location.pathname)
  const isOnCDPPage = isOnUKCDPPage || isOnEUCDPPage || isOnUKWWCDPPage || isOnChinaCDPPage || isOnIndiaCDPPage || isOnJapanCDPPage || isOnLatamCDPPage || isOnNorthAmericaCDPPage

  const navigation = isUKCity
    ? ukCitiesNavigation
    : isEuropeanCity
      ? citiesNavigation
      : isUKWWCity
        ? ukwwNavigation
        : isChinaCity
          ? chinaNavigation
          : isIndiaCity
            ? indiaNavigation
            : isJapanCity
              ? japanNavigation
              : isLatamCity
                ? latamNavigation
                : isNorthAmericaCity
                  ? northAmericaNavigation
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
      case CATEGORIES.UKWW_CITIES:
        navigate('/ukww-cities')
        break
      case CATEGORIES.CHINA_CITIES:
        navigate('/china-cities')
        break
      case CATEGORIES.INDIA_CITIES:
        navigate('/india-cities')
        break
      case CATEGORIES.JAPAN_CITIES:
        navigate('/japan-cities')
        break
      case CATEGORIES.LATAM_CITIES:
        navigate('/latam-cities')
        break
      case CATEGORIES.NORTH_AMERICA_CITIES:
        navigate('/na-cities')
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
              isEuropeanCity ? 'bg-green-50 text-green-700' :
              isUKWWCity ? 'bg-amber-50 text-amber-700' :
              isChinaCity ? 'bg-red-50 text-red-700' :
              isIndiaCity ? 'bg-orange-50 text-orange-700' :
              isJapanCity ? 'bg-pink-50 text-pink-700' :
              isLatamCity ? 'bg-emerald-50 text-emerald-700' :
              isNorthAmericaCity ? 'bg-sky-50 text-sky-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {category === CATEGORIES.BELGIAN_BANKS && '🏦 Belgian Banks'}
              {category === CATEGORIES.BELGIAN_INSURANCE && '🛡️ Belgian Insurance'}
              {category === CATEGORIES.EUROPEAN_CITIES && '🏙️ European Cities'}
              {category === CATEGORIES.UK_CITIES && '🇬🇧 UK Cities'}
              {category === CATEGORIES.UKWW_CITIES && '🌍 UKWW Cities'}
              {category === CATEGORIES.CHINA_CITIES && '🇨🇳 China Cities'}
              {category === CATEGORIES.INDIA_CITIES && '🇮🇳 India Cities'}
              {category === CATEGORIES.JAPAN_CITIES && '🇯🇵 Japan Cities'}
              {category === CATEGORIES.LATAM_CITIES && '🌎 Latin America Cities'}
              {category === CATEGORIES.NORTH_AMERICA_CITIES && '🇺🇸 North America Cities'}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = item.href ? location.pathname === item.href : isOnCDPPage

              // Handle dropdown items (CDP Questions for UK, EU, UKWW, China, India, Japan, Latam, or North America)
              if (item.isDropdown && (isUKCity || isEuropeanCity || isUKWWCity || isChinaCity || isIndiaCity || isJapanCity || isLatamCity || isNorthAmericaCity)) {
                const questions = item.dropdownType === 'eu'
                  ? euCDPQuestions
                  : item.dropdownType === 'ukww'
                    ? ukwwCDPQuestions
                    : item.dropdownType === 'china'
                      ? chinaCDPQuestions
                      : item.dropdownType === 'india'
                        ? indiaCDPQuestions
                        : item.dropdownType === 'japan'
                          ? japanCDPQuestions
                          : item.dropdownType === 'latam'
                            ? latamCDPQuestions
                            : item.dropdownType === 'northamerica'
                              ? northAmericaCDPQuestions
                              : ukCDPQuestions
                const activeColor = isEuropeanCity
                  ? 'bg-green-100 text-green-700'
                  : isUKWWCity
                    ? 'bg-amber-100 text-amber-700'
                    : isChinaCity
                      ? 'bg-red-100 text-red-700'
                      : isIndiaCity
                        ? 'bg-orange-100 text-orange-700'
                        : isJapanCity
                          ? 'bg-pink-100 text-pink-700'
                          : isLatamCity
                            ? 'bg-emerald-100 text-emerald-700'
                            : isNorthAmericaCity
                              ? 'bg-sky-100 text-sky-700'
                              : 'bg-indigo-100 text-indigo-700'
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => setCdpDropdownOpen(!cdpDropdownOpen)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 ${sidebarCollapsed ? 'mx-auto' : 'mr-3'}`} />
                        {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                      </div>
                      {!sidebarCollapsed && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${cdpDropdownOpen ? 'rotate-180' : ''}`} />
                      )}
                    </button>
                    {/* Dropdown content */}
                    {cdpDropdownOpen && !sidebarCollapsed && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                        {questions.map((q) => {
                          const QIcon = q.icon
                          const qActive = location.pathname === q.href
                          return (
                            <li key={q.name}>
                              <NavLink
                                to={q.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                                  flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200
                                  ${qActive
                                    ? activeColor + ' font-medium'
                                    : 'text-gray-600 hover:bg-gray-100'
                                  }
                                `}
                              >
                                <QIcon className="w-4 h-4 mr-2" />
                                <span>{q.name}</span>
                              </NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              }

              // Regular navigation items
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
                  amber: isActive ? 'bg-amber-100 text-amber-700 border-amber-200' : 'hover:bg-amber-50 text-gray-600',
                  red: isActive ? 'bg-red-100 text-red-700 border-red-200' : 'hover:bg-red-50 text-gray-600',
                  orange: isActive ? 'bg-orange-100 text-orange-700 border-orange-200' : 'hover:bg-orange-50 text-gray-600',
                  pink: isActive ? 'bg-pink-100 text-pink-700 border-pink-200' : 'hover:bg-pink-50 text-gray-600',
                  emerald: isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'hover:bg-emerald-50 text-gray-600',
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
            <Route path="/uk-comparison" element={<UKCityComparison />} />
            <Route path="/uk-ai" element={<UKAIAutomation />} />
            <Route path="/eu-dashboard" element={<EUCityDashboard />} />
            <Route path="/eu-comparison" element={<EUCityComparison />} />
            <Route path="/eu-ai" element={<EUAIAutomation />} />
            <Route path="/eu-q1" element={<EUQ1Detail />} />
            <Route path="/eu-q2" element={<EUQ2Detail />} />
            <Route path="/eu-q3" element={<EUQ3Detail />} />
            <Route path="/eu-q4" element={<EUQ4Detail />} />
            <Route path="/eu-q5" element={<EUQ5Detail />} />
            <Route path="/eu-q6" element={<EUQ6Detail />} />
            <Route path="/eu-q7" element={<EUQ7Detail />} />
            <Route path="/eu-q8" element={<EUQ8Detail />} />
            <Route path="/eu-q9" element={<EUQ9Detail />} />
            <Route path="/eu-q11" element={<EUQ11Detail />} />
            <Route path="/ukww-cities" element={<UKWWCitiesDashboard />} />
            <Route path="/ukww-dashboard" element={<UKWWCityDashboard />} />
            <Route path="/ukww-comparison" element={<UKWWCityComparison />} />
            <Route path="/ukww-ai" element={<UKWWAIAutomation />} />
            <Route path="/ukww-q1" element={<UKWWQ1Detail />} />
            <Route path="/ukww-q2" element={<UKWWQ2Detail />} />
            <Route path="/ukww-q3" element={<UKWWQ3Detail />} />
            <Route path="/ukww-q4" element={<UKWWQ4Detail />} />
            <Route path="/ukww-q5" element={<UKWWQ5Detail />} />
            <Route path="/ukww-q6" element={<UKWWQ6Detail />} />
            <Route path="/ukww-q7" element={<UKWWQ7Detail />} />
            <Route path="/ukww-q8" element={<UKWWQ8Detail />} />
            <Route path="/ukww-q9" element={<UKWWQ9Detail />} />
            <Route path="/ukww-q11" element={<UKWWQ11Detail />} />
            <Route path="/china-cities" element={<ChinaCitiesDashboard />} />
            <Route path="/china-dashboard" element={<ChinaCityDashboard />} />
            <Route path="/china-comparison" element={<ChinaCityComparison />} />
            <Route path="/china-ai" element={<ChinaAIAutomation />} />
            <Route path="/china-q1" element={<ChinaQ1Detail />} />
            <Route path="/china-q2" element={<ChinaQ2Detail />} />
            <Route path="/china-q3" element={<ChinaQ3Detail />} />
            <Route path="/china-q4" element={<ChinaQ4Detail />} />
            <Route path="/china-q5" element={<ChinaQ5Detail />} />
            <Route path="/china-q6" element={<ChinaQ6Detail />} />
            <Route path="/china-q7" element={<ChinaQ7Detail />} />
            <Route path="/china-q8" element={<ChinaQ8Detail />} />
            <Route path="/china-q9" element={<ChinaQ9Detail />} />
            <Route path="/china-q11" element={<ChinaQ11Detail />} />
            <Route path="/india-cities" element={<IndiaCitiesDashboard />} />
            <Route path="/india-dashboard" element={<IndiaCityDashboard />} />
            <Route path="/india-comparison" element={<IndiaCityComparison />} />
            <Route path="/india-ai" element={<IndiaAIAutomation />} />
            <Route path="/india-q1" element={<IndiaQ1Detail />} />
            <Route path="/india-q2" element={<IndiaQ2Detail />} />
            <Route path="/india-q3" element={<IndiaQ3Detail />} />
            <Route path="/india-q4" element={<IndiaQ4Detail />} />
            <Route path="/india-q5" element={<IndiaQ5Detail />} />
            <Route path="/india-q6" element={<IndiaQ6Detail />} />
            <Route path="/india-q7" element={<IndiaQ7Detail />} />
            <Route path="/india-q8" element={<IndiaQ8Detail />} />
            <Route path="/india-q9" element={<IndiaQ9Detail />} />
            <Route path="/india-q11" element={<IndiaQ11Detail />} />
            <Route path="/japan-cities" element={<JapanCitiesDashboard />} />
            <Route path="/japan-dashboard" element={<JapanCityDashboard />} />
            <Route path="/japan-comparison" element={<JapanCityComparison />} />
            <Route path="/japan-ai" element={<JapanAIAutomation />} />
            <Route path="/japan-q1" element={<JapanQ1Detail />} />
            <Route path="/japan-q2" element={<JapanQ2Detail />} />
            <Route path="/japan-q3" element={<JapanQ3Detail />} />
            <Route path="/japan-q4" element={<JapanQ4Detail />} />
            <Route path="/japan-q5" element={<JapanQ5Detail />} />
            <Route path="/japan-q6" element={<JapanQ6Detail />} />
            <Route path="/japan-q7" element={<JapanQ7Detail />} />
            <Route path="/japan-q8" element={<JapanQ8Detail />} />
            <Route path="/japan-q9" element={<JapanQ9Detail />} />
            <Route path="/japan-q11" element={<JapanQ11Detail />} />
            <Route path="/latam-cities" element={<LatamCitiesDashboard />} />
            <Route path="/latam-dashboard" element={<LatamCityDashboard />} />
            <Route path="/latam-comparison" element={<LatamCityComparison />} />
            <Route path="/latam-ai" element={<LatamAIAutomation />} />
            <Route path="/latam-q1" element={<LatamQ1Detail />} />
            <Route path="/latam-q2" element={<LatamQ2Detail />} />
            <Route path="/latam-q3" element={<LatamQ3Detail />} />
            <Route path="/latam-q4" element={<LatamQ4Detail />} />
            <Route path="/latam-q5" element={<LatamQ5Detail />} />
            <Route path="/latam-q6" element={<LatamQ6Detail />} />
            <Route path="/latam-q7" element={<LatamQ7Detail />} />
            <Route path="/latam-q8" element={<LatamQ8Detail />} />
            <Route path="/latam-q9" element={<LatamQ9Detail />} />
            <Route path="/latam-q11" element={<LatamQ11Detail />} />

            {/* North America Cities Routes */}
            <Route path="/na-cities" element={<NorthAmericaCitiesDashboard />} />
            <Route path="/na-dashboard" element={<NorthAmericaCityDashboard />} />
            <Route path="/na-comparison" element={<NorthAmericaCityComparison />} />
            <Route path="/na-ai" element={<NorthAmericaAIAutomation />} />
            <Route path="/na-q1" element={<NorthAmericaQ1Detail />} />
            <Route path="/na-q2" element={<NorthAmericaQ2Detail />} />
            <Route path="/na-q3" element={<NorthAmericaQ3Detail />} />
            <Route path="/na-q4" element={<NorthAmericaQ4Detail />} />
            <Route path="/na-q5" element={<NorthAmericaQ5Detail />} />
            <Route path="/na-q6" element={<NorthAmericaQ6Detail />} />
            <Route path="/na-q7" element={<NorthAmericaQ7Detail />} />
            <Route path="/na-q8" element={<NorthAmericaQ8Detail />} />
            <Route path="/na-q9" element={<NorthAmericaQ9Detail />} />
            <Route path="/na-q11" element={<NorthAmericaQ11Detail />} />
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
