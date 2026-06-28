import React from 'react'
import {
  Globe, Brain, Sparkles, FileText, TrendingUp, Zap, Target
} from 'lucide-react'
import { useOrganization } from '../context/OrganizationContext'
import { japanCitiesFull } from '../data/japanCitiesFull'

function JapanAIAutomation() {
  const { selectedId, isJapanCity } = useOrganization()

  const city = japanCitiesFull.find(c => c.id === selectedId) || japanCitiesFull[0]

  if (!isJapanCity || !city) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">Select a Japan city to view AI insights</h3>
        <p className="text-gray-500">Use the dropdown above to select a Japan entity</p>
      </div>
    )
  }

  const totalActions = (city.q9_1?.length || 0) + (city.q9_2?.length || 0)
  const totalTargets = city.q6_1_1?.length || 0
  const totalHazards = city.q2_2?.length || 0
  const totalPlans = city.q8_1_1?.length || 0

  const insights = [
    {
      title: 'Climate Action Assessment',
      icon: Zap,
      color: 'pink',
      content: totalActions > 5
        ? `${city.name} demonstrates strong climate action commitment with ${totalActions} documented actions.`
        : totalActions > 0
          ? `${city.name} has initiated climate actions (${totalActions} documented) with room for expansion.`
          : `${city.name} should consider developing comprehensive climate action strategies.`
    },
    {
      title: 'Target Analysis',
      icon: Target,
      color: 'rose',
      content: totalTargets > 0
        ? `${totalTargets} emission reduction target(s) established. Review progress tracking mechanisms.`
        : 'No formal emission reduction targets identified. Consider setting science-based targets.'
    },
    {
      title: 'Risk Profile',
      icon: TrendingUp,
      color: 'red',
      content: totalHazards > 5
        ? `High climate risk exposure with ${totalHazards} identified hazards. Priority adaptation measures recommended.`
        : totalHazards > 0
          ? `Moderate risk profile with ${totalHazards} climate hazard(s). Continue monitoring and assessment.`
          : 'Climate hazard assessment may need updating. Consider comprehensive risk review.'
    },
    {
      title: 'Planning Status',
      icon: FileText,
      color: 'green',
      content: totalPlans > 0
        ? `${totalPlans} climate action plan(s) in place. Ensure regular updates and progress reviews.`
        : 'No formal climate action plans documented. Strategic planning recommended.'
    },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <Brain className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">AI & Automation</h1>
            <p className="text-white/80">{city.name} • Intelligent CDP Analysis</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, idx) => {
          const Icon = insight.icon
          const colorClasses = {
            pink: 'bg-pink-50 border-pink-200 text-pink-600',
            rose: 'bg-rose-50 border-rose-200 text-rose-600',
            red: 'bg-red-50 border-red-200 text-red-600',
            green: 'bg-green-50 border-green-200 text-green-600',
          }
          return (
            <div
              key={idx}
              className={`rounded-xl border-2 p-5 ${colorClasses[insight.color].split(' ').slice(0, 2).join(' ')}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[insight.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                <Sparkles className="w-4 h-4 text-rose-500 ml-auto" />
              </div>
              <p className="text-gray-700">{insight.content}</p>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-pink-600" />
          Quick Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <p className="text-3xl font-bold text-pink-600">{totalActions}</p>
            <p className="text-sm text-gray-600">Climate Actions</p>
          </div>
          <div className="text-center p-4 bg-rose-50 rounded-lg">
            <p className="text-3xl font-bold text-rose-600">{totalTargets}</p>
            <p className="text-sm text-gray-600">Targets</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-3xl font-bold text-red-600">{totalHazards}</p>
            <p className="text-sm text-gray-600">Hazards</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{totalPlans}</p>
            <p className="text-sm text-gray-600">Plans</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200 p-6">
        <h3 className="font-semibold text-pink-800 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2" />
          AI Recommendations for {city.name}
        </h3>
        <ul className="space-y-2 text-gray-700">
          {totalTargets === 0 && (
            <li className="flex items-start gap-2">
              <span className="text-pink-500">•</span>
              Establish formal emission reduction targets aligned with national commitments
            </li>
          )}
          {totalActions < 3 && (
            <li className="flex items-start gap-2">
              <span className="text-pink-500">•</span>
              Expand climate action portfolio across mitigation and adaptation measures
            </li>
          )}
          {totalHazards > 3 && (
            <li className="flex items-start gap-2">
              <span className="text-pink-500">•</span>
              Prioritize adaptation strategies for high-impact climate hazards
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-pink-500">•</span>
            Enhance stakeholder engagement for climate initiatives
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500">•</span>
            Consider joining climate networks for knowledge sharing and best practices
          </li>
        </ul>
      </div>
    </div>
  )
}

export default JapanAIAutomation
