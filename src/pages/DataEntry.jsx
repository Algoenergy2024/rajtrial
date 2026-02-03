import React, { useState } from 'react'
import {
  Settings, Save, RefreshCw, Upload, Download, Plus, Trash2,
  Edit2, Check, X, Database, FileText, AlertCircle
} from 'lucide-react'

const initialMetrics = [
  { id: 1, category: 'Climate', metric: 'Scope 1 Emissions', value: '1,250', unit: 'tCO2e', period: '2023' },
  { id: 2, category: 'Climate', metric: 'Scope 2 Emissions', value: '2,800', unit: 'tCO2e', period: '2023' },
  { id: 3, category: 'Climate', metric: 'Green Bond Issuance', value: '600,000,000', unit: '€', period: '2023' },
  { id: 4, category: 'Climate', metric: 'Solar Capacity', value: '189.6', unit: 'kW', period: '2023' },
  { id: 5, category: 'Social', metric: 'Foundation Grants', value: '86,200', unit: '€', period: '2023' },
  { id: 6, category: 'Social', metric: 'Projects Supported', value: '27', unit: '', period: '2023' },
  { id: 7, category: 'Social', metric: 'Employee Count', value: '3,200', unit: '', period: '2023' },
  { id: 8, category: 'Governance', metric: 'Board Female %', value: '25', unit: '%', period: '2023' },
  { id: 9, category: 'Governance', metric: 'ESG Committees', value: '3', unit: '', period: '2023' },
  { id: 10, category: 'Customer', metric: 'ECO Loans', value: '5,800,000', unit: '€', period: '2023' },
  { id: 11, category: 'Customer', metric: 'SFDR Compliance', value: '81', unit: '%', period: '2023' }
]

const DataRow = ({ item, onEdit, onDelete, isEditing, onSave, onCancel, editData, setEditData }) => {
  if (isEditing) {
    return (
      <tr className="bg-blue-50">
        <td className="px-4 py-3">
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>Climate</option>
            <option>Social</option>
            <option>Governance</option>
            <option>Customer</option>
            <option>Risk</option>
          </select>
        </td>
        <td className="px-4 py-3">
          <input
            type="text"
            value={editData.metric}
            onChange={(e) => setEditData({ ...editData, metric: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </td>
        <td className="px-4 py-3">
          <input
            type="text"
            value={editData.value}
            onChange={(e) => setEditData({ ...editData, value: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </td>
        <td className="px-4 py-3">
          <input
            type="text"
            value={editData.unit}
            onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </td>
        <td className="px-4 py-3">
          <select
            value={editData.period}
            onChange={(e) => setEditData({ ...editData, period: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>2023</option>
            <option>2024</option>
            <option>Q1 2024</option>
            <option>Q2 2024</option>
          </select>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={onSave}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={onCancel}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  const categoryColors = {
    Climate: 'bg-green-100 text-green-700',
    Social: 'bg-purple-100 text-purple-700',
    Governance: 'bg-blue-100 text-blue-700',
    Customer: 'bg-yellow-100 text-yellow-700',
    Risk: 'bg-red-100 text-red-700'
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[item.category]}`}>
          {item.category}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-800">{item.metric}</td>
      <td className="px-4 py-3 font-semibold text-gray-800">{item.value}</td>
      <td className="px-4 py-3 text-gray-500">{item.unit}</td>
      <td className="px-4 py-3 text-gray-500">{item.period}</td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function DataEntry() {
  const [metrics, setMetrics] = useState(initialMetrics)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMetric, setNewMetric] = useState({
    category: 'Climate',
    metric: '',
    value: '',
    unit: '',
    period: '2023'
  })
  const [filter, setFilter] = useState('all')

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditData({ ...item })
  }

  const handleSave = () => {
    setMetrics(metrics.map(m => m.id === editingId ? editData : m))
    setEditingId(null)
    setEditData({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this metric?')) {
      setMetrics(metrics.filter(m => m.id !== id))
    }
  }

  const handleAddMetric = () => {
    if (!newMetric.metric || !newMetric.value) {
      alert('Please fill in all required fields')
      return
    }
    const newId = Math.max(...metrics.map(m => m.id)) + 1
    setMetrics([...metrics, { ...newMetric, id: newId }])
    setNewMetric({
      category: 'Climate',
      metric: '',
      value: '',
      unit: '',
      period: '2023'
    })
    setShowAddForm(false)
  }

  const filteredMetrics = filter === 'all'
    ? metrics
    : metrics.filter(m => m.category === filter)

  const categories = ['all', 'Climate', 'Social', 'Governance', 'Customer', 'Risk']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Data Entry & Management</h2>
            </div>
            <p className="mt-2 text-gray-300">
              Manage ESG metrics and data inputs
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <Database className="w-10 h-10 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Total Metrics</p>
              <p className="text-2xl font-bold text-gray-800">{metrics.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <FileText className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Climate Metrics</p>
              <p className="text-2xl font-bold text-gray-800">
                {metrics.filter(m => m.category === 'Climate').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <FileText className="w-10 h-10 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Social Metrics</p>
              <p className="text-2xl font-bold text-gray-800">
                {metrics.filter(m => m.category === 'Social').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-3">
            <FileText className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Governance Metrics</p>
              <p className="text-2xl font-bold text-gray-800">
                {metrics.filter(m => m.category === 'Governance').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filter:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  filter === cat
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Metric</span>
          </button>
        </div>

        {showAddForm && (
          <div className="p-4 bg-green-50 border-b border-green-100">
            <h4 className="font-medium text-green-800 mb-3">Add New Metric</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <select
                value={newMetric.category}
                onChange={(e) => setNewMetric({ ...newMetric, category: e.target.value })}
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option>Climate</option>
                <option>Social</option>
                <option>Governance</option>
                <option>Customer</option>
                <option>Risk</option>
              </select>
              <input
                type="text"
                placeholder="Metric Name"
                value={newMetric.metric}
                onChange={(e) => setNewMetric({ ...newMetric, metric: e.target.value })}
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Value"
                value={newMetric.value}
                onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Unit (optional)"
                value={newMetric.unit}
                onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
                className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddMetric}
                  className="flex-1 p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMetrics.map(item => (
                <DataRow
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isEditing={editingId === item.id}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  editData={editData}
                  setEditData={setEditData}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredMetrics.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No metrics found for this category</p>
          </div>
        )}
      </div>

      {/* Save Actions */}
      <div className="flex items-center justify-end space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Reset Changes</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>
    </div>
  )
}

export default DataEntry
