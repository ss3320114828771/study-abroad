'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface AnalyticsData {
  revenue: {
    total: number
    growth: number
    chart: number[]
    daily: number[]
    weekly: number[]
    monthly: number[]
  }
  orders: {
    total: number
    growth: number
    chart: number[]
    completed: number
    pending: number
    cancelled: number
  }
  customers: {
    total: number
    growth: number
    chart: number[]
    new: number
    returning: number
    active: number
  }
  products: {
    total: number
    growth: number
    sold: number
    views: number
    conversion: number
  }
}

interface TopProduct {
  id: string
  name: string
  category: string
  sales: number
  revenue: number
  views: number
  conversion: number
  growth: number
}

interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  conversion: number
  revenue: number
}

interface UserActivity {
  date: string
  visitors: number
  pageViews: number
  avgTime: string
  bounceRate: number
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [dateRange, setDateRange] = useState({ start: '2024-03-01', end: '2024-03-31' })

  // Analytics data states
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    revenue: { 
      total: 245890, 
      growth: 18.5, 
      chart: [18500, 22000, 19800, 24500, 27800, 30200, 28500, 31200, 33500, 35800, 37200, 38900],
      daily: [5200, 5800, 6100, 5900, 6300, 6800, 7200],
      weekly: [38500, 41200, 39800, 42500, 45200],
      monthly: [185000, 198000, 212000, 225000, 245890]
    },
    orders: { 
      total: 3245, 
      growth: 12.3, 
      chart: [245, 267, 289, 302, 315, 334, 356, 378, 389, 401, 423, 445],
      completed: 2890,
      pending: 245,
      cancelled: 110
    },
    customers: { 
      total: 5678, 
      growth: 15.2, 
      chart: [320, 345, 368, 392, 415, 438, 462, 485, 508, 532, 555, 578],
      new: 890,
      returning: 4788,
      active: 2345
    },
    products: { 
      total: 48, 
      growth: 8.7, 
      sold: 4567,
      views: 23456,
      conversion: 3.2
    }
  })

  const [topProducts, setTopProducts] = useState<TopProduct[]>([
    { id: '1', name: 'IELTS Preparation Course', category: 'Courses', sales: 234, revenue: 69966, views: 3456, conversion: 6.8, growth: 15 },
    { id: '2', name: 'Visa Consultation Package', category: 'Services', sales: 156, revenue: 93444, views: 2345, conversion: 6.7, growth: 22 },
    { id: '3', name: 'Study Abroad Starter Kit', category: 'Kits', sales: 142, revenue: 21158, views: 1890, conversion: 7.5, growth: -3 },
    { id: '4', name: 'University Application Guide', category: 'Books', sales: 98, revenue: 4802, views: 1456, conversion: 6.7, growth: 12 },
    { id: '5', name: 'TOEFL Practice Tests', category: 'Tests', sales: 87, revenue: 7743, views: 1234, conversion: 7.0, growth: 8 },
    { id: '6', name: 'Statement of Purpose Writing', category: 'Services', sales: 76, revenue: 15124, views: 987, conversion: 7.7, growth: 5 },
  ])

  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([
    { source: 'Direct', visitors: 4567, percentage: 28, conversion: 3.8, revenue: 45678 },
    { source: 'Google Search', visitors: 3890, percentage: 24, conversion: 4.2, revenue: 52340 },
    { source: 'Social Media', visitors: 3120, percentage: 19, conversion: 2.5, revenue: 25670 },
    { source: 'Email', visitors: 1890, percentage: 12, conversion: 5.1, revenue: 32450 },
    { source: 'Referrals', visitors: 1450, percentage: 9, conversion: 3.4, revenue: 18760 },
    { source: 'Other', visitors: 1280, percentage: 8, conversion: 1.9, revenue: 8760 },
  ])

  const [userActivity, setUserActivity] = useState<UserActivity[]>([
    { date: '2024-03-25', visitors: 456, pageViews: 1234, avgTime: '4:32', bounceRate: 32 },
    { date: '2024-03-26', visitors: 523, pageViews: 1456, avgTime: '4:45', bounceRate: 30 },
    { date: '2024-03-27', visitors: 489, pageViews: 1321, avgTime: '4:28', bounceRate: 31 },
    { date: '2024-03-28', visitors: 612, pageViews: 1678, avgTime: '5:02', bounceRate: 28 },
    { date: '2024-03-29', visitors: 578, pageViews: 1543, avgTime: '4:56', bounceRate: 29 },
    { date: '2024-03-30', visitors: 634, pageViews: 1789, avgTime: '5:12', bounceRate: 27 },
    { date: '2024-03-31', visitors: 701, pageViews: 1987, avgTime: '5:24', bounceRate: 26 },
  ])

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Analytics would be loaded from API here
      } catch (error) {
        console.log('Error loading analytics')
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [timeframe])

  // Export data
  const exportData = () => {
    const data = {
      analytics,
      topProducts,
      trafficSources,
      userActivity,
      timeframe,
      dateRange,
      exportedAt: new Date().toISOString(),
      exportedBy: 'Hafiz Sajid Syed'
    }

    if (exportFormat === 'csv') {
      exportToCSV(data)
    } else if (exportFormat === 'json') {
      exportToJSON(data)
    } else {
      // PDF export would be implemented here
      alert('PDF export feature coming soon!')
    }
    
    setShowExportModal(false)
  }

  const exportToCSV = (data: any) => {
    let csv = 'Metric,Value,Growth\n'
    csv += `Total Revenue,${analytics.revenue.total},${analytics.revenue.growth}%\n`
    csv += `Total Orders,${analytics.orders.total},${analytics.orders.growth}%\n`
    csv += `Total Customers,${analytics.customers.total},${analytics.customers.growth}%\n`
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const exportToJSON = (data: any) => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `analytics-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const getMetricColor = (metric: string) => {
    switch(metric) {
      case 'revenue': return 'from-green-500 to-emerald-500'
      case 'orders': return 'from-blue-500 to-cyan-500'
      case 'customers': return 'from-purple-500 to-pink-500'
      case 'products': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 10) return 'text-green-400'
    if (growth > 0) return 'text-green-300'
    if (growth < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const formatPercentage = (value: number) => {
    return value.toFixed(1) + '%'
  }

  const renderChart = (data: number[], color: string, height: number = 200) => {
    const max = Math.max(...data)
    
    return (
      <div className="flex items-end h-48 gap-1 mt-4">
        {data.map((value, index) => {
          const barHeight = (value / max) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="relative w-full">
                <div 
                  className={`bg-gradient-to-t ${color} rounded-t-lg transition-all duration-300 group-hover:opacity-80`}
                  style={{ height: `${barHeight}%`, minHeight: '4px' }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {selectedMetric === 'revenue' ? formatCurrency(value) : value}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {index + 1}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Bismillah />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Analytics{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-400">Track your store's performance and growth metrics</p>
        </div>
        <div className="flex gap-3">
          {/* Time Range Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
            <option value="custom">Custom Range</option>
          </select>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>📊</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(analytics.revenue.total)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(analytics.revenue.growth)} text-sm font-medium`}>
                  ↑ {analytics.revenue.growth}%
                </span>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Daily avg: {formatCurrency(analytics.revenue.total / 30)}</span>
              <span>Goal: 95%</span>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-white">{formatNumber(analytics.orders.total)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(analytics.orders.growth)} text-sm font-medium`}>
                  ↑ {analytics.orders.growth}%
                </span>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-2xl">
              🛒
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-green-400 font-medium">{analytics.orders.completed}</p>
              <p className="text-gray-400">Completed</p>
            </div>
            <div>
              <p className="text-yellow-400 font-medium">{analytics.orders.pending}</p>
              <p className="text-gray-400">Pending</p>
            </div>
            <div>
              <p className="text-red-400 font-medium">{analytics.orders.cancelled}</p>
              <p className="text-gray-400">Cancelled</p>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-3xl font-bold text-white">{formatNumber(analytics.customers.total)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(analytics.customers.growth)} text-sm font-medium`}>
                  ↑ {analytics.customers.growth}%
                </span>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div>
              <p className="text-green-400 font-medium">{formatNumber(analytics.customers.new)}</p>
              <p className="text-gray-400">New</p>
            </div>
            <div>
              <p className="text-blue-400 font-medium">{formatNumber(analytics.customers.returning)}</p>
              <p className="text-gray-400">Returning</p>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Products Performance</p>
              <p className="text-3xl font-bold text-white">{analytics.products.total}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(analytics.products.growth)} text-sm font-medium`}>
                  ↑ {analytics.products.growth}%
                </span>
                <span className="text-xs text-gray-500">active products</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center text-2xl">
              📦
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div>
              <p className="text-green-400 font-medium">{formatNumber(analytics.products.sold)}</p>
              <p className="text-gray-400">Sold</p>
            </div>
            <div>
              <p className="text-blue-400 font-medium">{formatNumber(analytics.products.views)}</p>
              <p className="text-gray-400">Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <div className="flex gap-2">
              {['daily', 'weekly', 'monthly'].map((period) => (
                <button
                  key={period}
                  className="px-2 py-1 text-xs bg-white/10 rounded-lg text-gray-300 hover:bg-white/20"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          {renderChart(analytics.revenue.chart, 'from-green-500 to-emerald-500')}
        </div>

        {/* Orders Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Orders Trend</h3>
            <div className="flex gap-2">
              <button className="px-2 py-1 text-xs bg-pink-600/30 text-pink-300 rounded-lg">Monthly</button>
            </div>
          </div>
          {renderChart(analytics.orders.chart, 'from-blue-500 to-cyan-500')}
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Top Performing Products</h3>
          <Link href="/admin/products" className="text-sm text-pink-400 hover:text-pink-300">
            View All Products →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Sales</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Views</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Conv. %</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 w-5">{index + 1}.</span>
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-white">{formatNumber(product.sales)}</td>
                  <td className="px-4 py-3 text-right text-white">{formatCurrency(product.revenue)}</td>
                  <td className="px-4 py-3 text-right text-white">{formatNumber(product.views)}</td>
                  <td className="px-4 py-3 text-right text-white">{product.conversion}%</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`${product.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.growth > 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Traffic Sources & User Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{source.source}</span>
                  <span className="text-white">{formatNumber(source.visitors)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-12">{source.percentage}%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Conversion: {source.conversion}%</span>
                  <span>Revenue: {formatCurrency(source.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-xs">
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Visitors</th>
                  <th className="text-right py-2">Page Views</th>
                  <th className="text-right py-2">Avg Time</th>
                  <th className="text-right py-2">Bounce %</th>
                </tr>
              </thead>
              <tbody>
                {userActivity.map((day) => (
                  <tr key={day.date} className="border-t border-white/5">
                    <td className="py-2 text-white text-sm">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-2 text-right text-white">{formatNumber(day.visitors)}</td>
                    <td className="py-2 text-right text-white">{formatNumber(day.pageViews)}</td>
                    <td className="py-2 text-right text-white">{day.avgTime}</td>
                    <td className="py-2 text-right text-white">{day.bounceRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Average bounce rate</span>
              <span className="text-white font-medium">29.4%</span>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[71%] bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Export Report</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="csv">CSV Spreadsheet</option>
                  <option value="json">JSON Data</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Include Data</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Key Metrics</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Charts & Graphs</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Top Products</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Traffic Sources</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={exportData}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Export
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Analytics Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}