'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StatsProps {
  timeframe?: 'day' | 'week' | 'month' | 'year'
  showDetails?: boolean
}

interface StatsData {
  revenue: {
    total: number
    growth: number
    chart: number[]
  }
  orders: {
    total: number
    growth: number
    pending: number
    completed: number
    cancelled: number
  }
  users: {
    total: number
    growth: number
    new: number
    active: number
  }
  products: {
    total: number
    lowStock: number
    outOfStock: number
    views: number
  }
  traffic: {
    visitors: number
    pageViews: number
    bounceRate: number
    avgSession: string
  }
}

export default function AdminStats({ timeframe = 'month', showDetails = false }: StatsProps) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsData>({
    revenue: {
      total: 245890,
      growth: 18.5,
      chart: [18500, 22000, 19800, 24500, 27800, 30200, 28500, 31200, 33500, 35800, 37200, 38900]
    },
    orders: {
      total: 3245,
      growth: 12.3,
      pending: 23,
      completed: 2890,
      cancelled: 110
    },
    users: {
      total: 5678,
      growth: 15.2,
      new: 128,
      active: 2345
    },
    products: {
      total: 48,
      lowStock: 5,
      outOfStock: 2,
      views: 23456
    },
    traffic: {
      visitors: 4567,
      pageViews: 23456,
      bounceRate: 32.5,
      avgSession: '4:32'
    }
  })

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        // In production, fetch from API
        // const response = await fetch(`/api/admin/stats?timeframe=${timeframe}`)
        // const data = await response.json()
        // setStats(data)
      } catch (error) {
        console.log('Error loading stats')
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [timeframe])

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/20 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
            <div className="h-8 bg-white/10 rounded w-32 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-20"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(stats.revenue.total)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(stats.revenue.growth)} text-sm font-medium`}>
                  ↑ {stats.revenue.growth}%
                </span>
                <span className="text-xs text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
          {showDetails && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Daily avg: {formatCurrency(stats.revenue.total / 30)}</span>
                <span>Target: 95%</span>
              </div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Orders Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-white">{formatNumber(stats.orders.total)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(stats.orders.growth)} text-sm font-medium`}>
                  ↑ {stats.orders.growth}%
                </span>
                <span className="text-xs text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-2xl">
              🛒
            </div>
          </div>
          {showDetails && (
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-green-400 font-medium">{stats.orders.completed}</p>
                <p className="text-gray-400">Completed</p>
              </div>
              <div>
                <p className="text-yellow-400 font-medium">{stats.orders.pending}</p>
                <p className="text-gray-400">Pending</p>
              </div>
              <div>
                <p className="text-red-400 font-medium">{stats.orders.cancelled}</p>
                <p className="text-gray-400">Cancelled</p>
              </div>
            </div>
          )}
        </div>

        {/* Users Card */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-white">{formatNumber(stats.users.total)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${getGrowthColor(stats.users.growth)} text-sm font-medium`}>
                  ↑ {stats.users.growth}%
                </span>
                <span className="text-xs text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
          {showDetails && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div>
                <p className="text-green-400 font-medium">{formatNumber(stats.users.new)}</p>
                <p className="text-gray-400">New</p>
              </div>
              <div>
                <p className="text-blue-400 font-medium">{formatNumber(stats.users.active)}</p>
                <p className="text-gray-400">Active</p>
              </div>
            </div>
          )}
        </div>

        {/* Products Card */}
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Products</p>
              <p className="text-3xl font-bold text-white">{stats.products.total}</p>
              <p className="text-xs text-red-400 mt-2">{stats.products.lowStock} low in stock</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center text-2xl">
              📦
            </div>
          </div>
          {showDetails && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div>
                <p className="text-yellow-400 font-medium">{stats.products.lowStock}</p>
                <p className="text-gray-400">Low Stock</p>
              </div>
              <div>
                <p className="text-red-400 font-medium">{stats.products.outOfStock}</p>
                <p className="text-gray-400">Out of Stock</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Traffic Stats (if showDetails is true) */}
      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Visitors */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-xl">
                👁️
              </div>
              <div>
                <p className="text-sm text-gray-400">Visitors</p>
                <p className="text-xl font-bold text-white">{formatNumber(stats.traffic.visitors)}</p>
              </div>
            </div>
          </div>

          {/* Page Views */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-xl">
                📄
              </div>
              <div>
                <p className="text-sm text-gray-400">Page Views</p>
                <p className="text-xl font-bold text-white">{formatNumber(stats.traffic.pageViews)}</p>
              </div>
            </div>
          </div>

          {/* Bounce Rate */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center text-xl">
                📉
              </div>
              <div>
                <p className="text-sm text-gray-400">Bounce Rate</p>
                <p className="text-xl font-bold text-white">{stats.traffic.bounceRate}%</p>
              </div>
            </div>
          </div>

          {/* Avg Session */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center text-xl">
                ⏱️
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg Session</p>
                <p className="text-xl font-bold text-white">{stats.traffic.avgSession}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Chart (if showDetails is true) */}
      {showDetails && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <div className="flex gap-2">
              {['Day', 'Week', 'Month'].map((period) => (
                <button
                  key={period}
                  className="px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-lg hover:bg-white/20"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-32 flex items-end gap-1">
            {stats.revenue.chart.map((value, index) => {
              const max = Math.max(...stats.revenue.chart)
              const height = (value / max) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full">
                    <div 
                      className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t transition-all"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {formatCurrency(value)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="flex justify-between items-center text-sm">
        <Link href="/admin/analytics" className="text-pink-400 hover:text-pink-300">
          View Detailed Analytics →
        </Link>
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white">Refresh</button>
          <button className="text-gray-400 hover:text-white">Export</button>
        </div>
      </div>
    </div>
  )
}