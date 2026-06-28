import React, { useState } from 'react'
import {
  Brain, Zap, Database, FileSearch, MessageSquare, PieChart,
  CheckCircle, Clock, ArrowRight, Sparkles, Target, TrendingUp,
  Award, Bot, Cpu, MapPin, Factory, AlertTriangle, FileText
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { euCitiesFull } from '../data/euCitiesFull'

const UKWW_COUNTRIES = [
  'South Africa', 'Ethiopia', 'Turkiye', 'Pakistan', 'Israel',
  'Senegal', 'Ghana', 'Jordan', 'Kenya', "Cote d'Ivoire"
]

const ukwwCities = euCitiesFull.filter(c => UKWW_COUNTRIES.includes(c.country))

const ukwwAIFeatures = [
  {
    id: 'emissions_analysis',
    name: 'Emissions Analysis',
    description: 'AI-powered analysis of city emissions data across all sectors with trend detection and anomaly identification.',
    icon: Factory,
    status: 'available',
    phase: 'Foundation',
    currentState: 'Manual analysis of Q3 emissions data',
    benefit: '80% faster emissions pattern identification'
  },
  {
    id: 'hazard_prediction',
    name: 'Climate Hazard Prediction',
    description: 'Machine learning models to predict climate hazard impacts based on historical Q2 data and external climate models.',
    icon: AlertTriangle,
    status: 'available',
    phase: 'Foundation',
    currentState: 'Static hazard reporting',
    benefit: 'Predictive risk scoring for 10+ hazard types'
  },
  {
    id: 'target_tracking',
    name: 'Target Progress Tracker',
    description: 'Automated tracking of net-zero and emissions reduction targets with progress forecasting.',
    icon: Target,
    status: 'available',
    phase: 'Enhancement',
    currentState: 'Manual target monitoring',
    benefit: 'Real-time target achievement probability'
  },
  {
    id: 'action_recommender',
    name: 'Action Recommender',
    description: 'AI recommendations for climate actions based on successful implementations from peer cities.',
    icon: Zap,
    status: 'coming_soon',
    phase: 'Enhancement',
    currentState: 'No cross-city learning',
    benefit: `Personalized action plans from ${ukwwCities.length} UKWW cities`
  },
  {
    id: 'report_generator',
    name: 'CDP Report Generator',
    description: 'Automated generation of CDP questionnaire responses using city data and AI narratives.',
    icon: FileText,
    status: 'available',
    phase: 'Optimization',
    currentState: 'Manual questionnaire completion',
    benefit: '70% reduction in reporting time'
  },
  {
    id: 'benchmark_analysis',
    name: 'Peer Benchmarking',
    description: 'AI-driven benchmarking against similar cities based on size, region, and climate profile.',
    icon: PieChart,
    status: 'coming_soon',
    phase: 'Optimization',
    currentState: 'Limited comparison capability',
    benefit: 'Automatic peer group identification'
  }
]

const expectedOutcomes = [
  { metric: '70% Faster', description: 'CDP questionnaire completion time', icon: 'Clock' },
  { metric: '95% Accuracy', description: 'Emissions data validation', icon: 'CheckCircle' },
  { metric: '3x Coverage', description: 'Climate hazard monitoring', icon: 'TrendingUp' },
  { metric: 'A-List Ready', description: 'Improved CDP scoring potential', icon: 'Award' }
]

const implementationRoadmap = [
  {
    phase: 'Phase 1: Foundation',
    timeline: 'Q1-Q2 2025',
    status: 'in_progress',
    actions: [
      'Emissions data standardization',
      'Hazard classification AI',
      'Automated data validation'
    ]
  },
  {
    phase: 'Phase 2: Enhancement',
    timeline: 'Q3 2025',
    status: 'planned',
    actions: [
      'Target progress forecasting',
      'Cross-city action learning',
      'Anomaly detection alerts'
    ]
  },
  {
    phase: 'Phase 3: Optimization',
    timeline: 'Q4 2025',
    status: 'planned',
    actions: [
      'Full CDP report automation',
      'Peer benchmarking engine',
      'Climate scenario modeling'
    ]
  }
]

const FeatureCard = ({ feature, onActivate }) => {
  const statusStyles = {
    available: 'bg-green-100 text-green-700 border-green-200',
    coming_soon: 'bg-blue-100 text-blue-700 border-blue-200'
  }

  const phaseStyles = {
    Foundation: 'bg-orange-100 text-orange-700',
    Enhancement: 'bg-purple-100 text-purple-700',
    Optimization: 'bg-amber-100 text-amber-700'
  }

  const Icon = feature.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${phaseStyles[feature.phase]}`}>
              {feature.phase}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusStyles[feature.status]}`}>
              {feature.status === 'available' ? 'Available' : 'Coming Soon'}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-2">{feature.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{feature.description}</p>

        <div className="space-y-3 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Current State</p>
            <p className="text-sm text-gray-700">{feature.currentState}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-600 mb-1">Expected Benefit</p>
            <p className="text-sm text-green-700 font-medium">{feature.benefit}</p>
          </div>
        </div>

        {feature.status === 'available' ? (
          <button
            onClick={() => onActivate(feature)}
            className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Activate Feature</span>
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2.5 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  )
}

const AnalysisModal = ({ isOpen, onClose, feature, city }) => {
  const [analyzing, setAnalyzing] = useState(false)
  const [step, setStep] = useState(0)
  const [results, setResults] = useState(null)

  const getSteps = () => {
    switch (feature?.id) {
      case 'emissions_analysis':
        return [
          'Loading Q3 emissions data...',
          'Analyzing sector breakdown...',
          'Detecting trends...',
          'Identifying anomalies...',
          'Generating insights...'
        ]
      case 'hazard_prediction':
        return [
          'Loading Q2 hazard data...',
          'Processing climate models...',
          'Calculating risk scores...',
          'Mapping vulnerabilities...',
          'Generating predictions...'
        ]
      case 'target_tracking':
        return [
          'Loading Q6 target data...',
          'Analyzing baseline emissions...',
          'Projecting trajectories...',
          'Calculating gap analysis...',
          'Generating recommendations...'
        ]
      case 'report_generator':
        return [
          'Collecting city data...',
          'Processing Q1-Q11 responses...',
          'Generating CDP narratives...',
          'Applying quality checks...',
          'Finalizing report...'
        ]
      default:
        return ['Processing...']
    }
  }

  const steps = getSteps()

  const handleAnalyze = () => {
    setAnalyzing(true)
    setStep(0)
    setResults(null)

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setTimeout(() => {
            setAnalyzing(false)
            setResults({
              success: true,
              insights: [
                'Analysis complete with 95% confidence',
                `Processed data for ${city?.name || 'selected entity'}`,
                'AI recommendations generated'
              ]
            })
          }, 500)
          return prev
        }
        return prev + 1
      })
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{feature?.name}</h3>
              <p className="text-sm text-gray-500">AI-powered analysis for UKWW cities</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!analyzing && !results ? (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">
                    {city?.name || 'All UKWW Cities'}
                  </span>
                </div>
                <p className="text-sm text-amber-600">
                  {feature?.description}
                </p>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                <Cpu className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-orange-700">
                  AI will analyze CDP data and generate actionable insights
                </span>
              </div>
            </div>
          ) : analyzing ? (
            <div className="py-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
              </div>
              <div className="space-y-3">
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      idx < step ? 'bg-green-50' :
                      idx === step ? 'bg-amber-50' :
                      'bg-gray-50'
                    }`}
                  >
                    {idx < step ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : idx === step ? (
                      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={`text-sm ${
                      idx < step ? 'text-green-700' :
                      idx === step ? 'text-amber-700' :
                      'text-gray-500'
                    }`}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : results ? (
            <div className="py-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h4 className="text-center font-semibold text-gray-800 mb-4">Analysis Complete</h4>
              <div className="space-y-2">
                {results.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="p-6 border-t border-gray-100 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {results ? 'Close' : 'Cancel'}
          </button>
          {!analyzing && !results && (
            <button
              onClick={handleAnalyze}
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Analysis</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function UKWWAIAutomation() {
  const { selectedId } = useOrganization()
  const [showModal, setShowModal] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)

  const selectedCity = ukwwCities.find(c => c.id === selectedId)

  const handleActivate = (feature) => {
    setActiveFeature(feature)
    setShowModal(true)
  }

  const outcomeIcons = {
    Clock: Clock,
    CheckCircle: CheckCircle,
    TrendingUp: TrendingUp,
    Award: Award
  }

  const stats = {
    totalCities: ukwwCities.length,
    withEmissions: ukwwCities.filter(c => c.q3_1_3?.length > 0).length,
    withHazards: ukwwCities.filter(c => c.q2_2?.length > 0).length,
    withTargets: ukwwCities.filter(c => c.q6_1_1?.length > 0).length
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8" />
              <h2 className="text-2xl font-bold">AI & Automation</h2>
            </div>
            <p className="mt-2 text-amber-100">
              Transform UKWW city climate reporting with intelligent automation
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg font-semibold">6 Features</span>
            </div>
            <span className="text-amber-200">4 Available Now</span>
          </div>
        </div>
      </div>

      {/* Data Coverage Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <MapPin className="w-4 h-4" />
            UKWW Cities
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalCities}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <Factory className="w-4 h-4" />
            With Emissions Data
          </div>
          <p className="text-2xl font-bold text-amber-600">{stats.withEmissions}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <AlertTriangle className="w-4 h-4" />
            With Hazard Data
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.withHazards}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <Target className="w-4 h-4" />
            With Targets
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.withTargets}</p>
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expectedOutcomes.map((outcome, idx) => {
          const Icon = outcomeIcons[outcome.icon] || Target
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-800">{outcome.metric}</h4>
              </div>
              <p className="text-sm text-gray-600">{outcome.description}</p>
            </div>
          )
        })}
      </div>

      {/* Implementation Roadmap */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Implementation Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {implementationRoadmap.map((phase, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border-2 ${
                phase.status === 'in_progress'
                  ? 'border-amber-300 bg-amber-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{phase.phase}</h4>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  phase.status === 'in_progress'
                    ? 'bg-amber-200 text-amber-700'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {phase.status === 'in_progress' ? 'Active' : 'Planned'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{phase.timeline}</p>
              <ul className="space-y-2">
                {phase.actions.map((action, actionIdx) => (
                  <li key={actionIdx} className="flex items-start text-sm text-gray-700">
                    <ArrowRight className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Features Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Available AI Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ukwwAIFeatures.map(feature => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>

      {/* Analysis Modal */}
      <AnalysisModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setActiveFeature(null)
        }}
        feature={activeFeature}
        city={selectedCity}
      />
    </div>
  )
}

export default UKWWAIAutomation
