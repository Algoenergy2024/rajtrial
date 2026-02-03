import React, { useState } from 'react'
import {
  Brain, Zap, Database, FileSearch, MessageSquare, PieChart,
  CheckCircle, Clock, ArrowRight, Sparkles, Target, TrendingUp,
  Award, Bot, Cpu
} from 'lucide-react'
import { aiAutomationFeatures, implementationRoadmap, expectedOutcomes } from '../data/esgData'

const FeatureCard = ({ feature, onActivate }) => {
  const statusStyles = {
    available: 'bg-green-100 text-green-700 border-green-200',
    coming_soon: 'bg-blue-100 text-blue-700 border-blue-200'
  }

  const phaseStyles = {
    Foundation: 'bg-orange-100 text-orange-700',
    Enhancement: 'bg-purple-100 text-purple-700',
    Optimization: 'bg-indigo-100 text-indigo-700'
  }

  const icons = {
    data_collection: Database,
    materiality: FileSearch,
    risk_analytics: PieChart,
    nlp_reporting: MessageSquare,
    stakeholder: MessageSquare,
    portfolio: PieChart
  }

  const Icon = icons[feature.id] || Brain

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden metric-card">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
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
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2"
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

const ReportGenerator = ({ isOpen, onClose }) => {
  const [generating, setGenerating] = useState(false)
  const [step, setStep] = useState(0)

  const steps = [
    'Analyzing data sources...',
    'Processing ESG metrics...',
    'Generating ESRS narratives...',
    'Applying compliance checks...',
    'Finalizing report...'
  ]

  const handleGenerate = () => {
    setGenerating(true)
    setStep(0)

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setTimeout(() => setGenerating(false), 1000)
          return prev
        }
        return prev + 1
      })
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">AI Report Generator</h3>
              <p className="text-sm text-gray-500">Automated ESRS-compliant narrative generation</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!generating ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Report Section
                </label>
                <select className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>E1 - Climate Change</option>
                  <option>S1 - Own Workforce</option>
                  <option>G1 - Business Conduct</option>
                  <option>Full Annual Report</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reporting Period
                </label>
                <select className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>FY 2023</option>
                  <option>FY 2024 (YTD)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                <Cpu className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-700">
                  AI will analyze your data and generate ESRS-compliant narratives
                </span>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>
              <div className="space-y-3">
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      idx < step ? 'bg-green-50' :
                      idx === step ? 'bg-purple-50' :
                      'bg-gray-50'
                    }`}
                  >
                    {idx < step ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : idx === step ? (
                      <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <span className={`text-sm ${
                      idx < step ? 'text-green-700' :
                      idx === step ? 'text-purple-700' :
                      'text-gray-500'
                    }`}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {generating ? 'Close' : 'Cancel'}
          </button>
          {!generating && (
            <button
              onClick={handleGenerate}
              className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function AIAutomation() {
  const [showGenerator, setShowGenerator] = useState(false)

  const handleActivate = (feature) => {
    if (feature.id === 'nlp_reporting') {
      setShowGenerator(true)
    } else {
      alert(`Activating ${feature.name}... This would connect to the AI service.`)
    }
  }

  const outcomeIcons = {
    Clock: Clock,
    CheckCircle: CheckCircle,
    TrendingUp: TrendingUp,
    Award: Award
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8" />
              <h2 className="text-2xl font-bold">AI & Automation</h2>
            </div>
            <p className="mt-2 text-purple-100">
              Transform ESG reporting with intelligent automation
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg font-semibold">6 Features</span>
            </div>
            <span className="text-purple-200">4 Available Now</span>
          </div>
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expectedOutcomes.map((outcome, idx) => {
          const Icon = outcomeIcons[outcome.icon] || Target
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-600" />
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
                  ? 'border-purple-300 bg-purple-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{phase.phase}</h4>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  phase.status === 'in_progress'
                    ? 'bg-purple-200 text-purple-700'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {phase.status === 'in_progress' ? 'Active' : 'Planned'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{phase.timeline}</p>
              <ul className="space-y-2">
                {phase.actions.map((action, actionIdx) => (
                  <li key={actionIdx} className="flex items-start text-sm text-gray-700">
                    <ArrowRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
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
          {aiAutomationFeatures.map(feature => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>

      {/* Report Generator Modal */}
      <ReportGenerator
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
      />
    </div>
  )
}

export default AIAutomation
