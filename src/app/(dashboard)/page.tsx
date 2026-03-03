'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface DashboardStats {
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  totalRevenue: number
  pendingOrders: number
  lowStock: number
  monthlyGrowth: number
  conversionRate: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  date: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
}

interface Activity {
  id: string
  type: 'order' | 'user' | 'product' | 'review'
  message: string
  time: string
  user: string
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 1254,
    totalProducts: 48,
    totalCustomers: 3456,
    totalRevenue: 89250,
    pendingOrders: 23,
    lowStock: 5,
    monthlyGrowth: 15.8,
    conversionRate: 3.2
  })

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    { id: '1', orderNumber: 'ORD-2024-001', customer: 'Ahmed Khan', amount: 299, status: 'completed', date: '2024-03-15' },
    { id: '2', orderNumber: 'ORD-2024-002', customer: 'Fatima Ali', amount: 599, status: 'processing', date: '2024-03-14' },
    { id: '3', orderNumber: 'ORD-2024-003', customer: 'Omar Hassan', amount: 149, status: 'pending', date: '2024-03-14' },
    { id: '4', orderNumber: 'ORD-2024-004', customer: 'Sarah Johnson', amount: 89, status: 'completed', date: '2024-03-13' },
    { id: '5', orderNumber: 'ORD-2024-005', customer: 'Mike Wilson', amount: 399, status: 'cancelled', date: '2024-03-13' },
  ])

  const [topProducts, setTopProducts] = useState<TopProduct[]>([
    { id: '1', name: 'IELTS Preparation Course', sales: 234, revenue: 69966, growth: 15 },
    { id: '2', name: 'Visa Consultation Package', sales: 156, revenue: 93444, growth: 22 },
    { id: '3', name: 'Study Abroad Starter Kit', sales: 142, revenue: 21158, growth: -3 },
    { id: '4', name: 'University Application Guide', sales: 98, revenue: 4802, growth: 12 },
    { id: '5', name: 'Statement of Purpose Writing', sales: 87, revenue: 17313, growth: 8 },
  ])

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', type: 'order', message: 'New order #ORD-2024-006 received', time: '5 minutes ago', user: 'John Doe' },
    { id: '2', type: 'user', message: 'New user registered: Emily Brown', time: '15 minutes ago', user: 'Emily Brown' },
    { id: '3', type: 'product', message: 'Product "TOEFL Practice Tests" updated', time: '1 hour ago', user: 'Admin' },
    { id: '4', type: 'review', message: 'New 5-star review on IELTS course', time: '2 hours ago', user: 'Sarah Chen' },
    { id: '5', type: 'order', message: 'Order #ORD-2024-003 marked as completed', time: '3 hours ago', user: 'System' },
    { id: '6', type: 'product', message: 'Low stock alert: "GRE Course" (3 left)', time: '5 hours ago', user: 'System' },
  ])

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Dashboard data would be loaded from API here
      } catch (error) {
        console.log('Error loading dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'order': return '🛒'
      case 'user': return '👤'
      case 'product': return '📦'
      case 'review': return '⭐'
      default: return '📌'
    }
  }

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'order': return 'from-blue-500 to-cyan-500'
      case 'user': return 'from-green-500 to-teal-500'
      case 'product': return 'from-purple-500 to-pink-500'
      case 'review': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Bismillah />
      
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Hafiz Sajid
            </span>
          </h1>
          <p className="text-gray-400">Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
            <span>📅</span>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-400 mt-2">↑ {stats.monthlyGrowth}% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
              <p className="text-sm text-blue-400 mt-2">{stats.pendingOrders} pending</p>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-2xl">
              🛒
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-3xl font-bold text-white">{stats.totalCustomers.toLocaleString()}</p>
              <p className="text-sm text-purple-400 mt-2">+124 this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">{stats.conversionRate}%</p>
              <p className="text-sm text-yellow-400 mt-2">↑ 0.8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center text-2xl">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="h-48 flex items-end gap-2">
            {[65, 45, 75, 55, 85, 70, 95, 80, 60, 90, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="relative w-full">
                  <div 
                    className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all group-hover:opacity-80"
                    style={{ height: `${height}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      ${Math.round(height * 100)}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Week {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Orders Overview</h3>
          <div className="h-48 flex items-end gap-2">
            {[45, 55, 35, 65, 45, 55, 75, 65, 45, 55, 65, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="relative w-full">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all group-hover:opacity-80"
                    style={{ height: `${height}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {height} orders
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Week {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
            <Link href="/dashboard/orders" className="text-sm text-pink-400 hover:text-pink-300">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/orders/${order.id}`} className="text-white hover:text-pink-400">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{order.customer}</td>
                    <td className="px-4 py-3 text-white font-medium">${order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Top Products</h3>
            <Link href="/dashboard/products" className="text-sm text-pink-400 hover:text-pink-300">
              View All →
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center text-white font-bold">
                  {product.id}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{product.name}</span>
                    <span className="text-white">${product.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400">{product.sales} sold</span>
                    <span className={`text-sm ${product.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.growth > 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed and Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/dashboard/products/add"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg hover:scale-105 transition-all border border-white/10"
            >
              <span className="w-8 h-8 bg-purple-600/30 rounded-lg flex items-center justify-center text-xl">➕</span>
              <div>
                <p className="text-white font-medium">Add New Product</p>
                <p className="text-xs text-gray-400">Create a new product listing</p>
              </div>
            </Link>

            <Link
              href="/dashboard/orders/new"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg hover:scale-105 transition-all border border-white/10"
            >
              <span className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center text-xl">📝</span>
              <div>
                <p className="text-white font-medium">Create Order</p>
                <p className="text-xs text-gray-400">Add a new manual order</p>
              </div>
            </Link>

            <Link
              href="/dashboard/customers"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg hover:scale-105 transition-all border border-white/10"
            >
              <span className="w-8 h-8 bg-green-600/30 rounded-lg flex items-center justify-center text-xl">👥</span>
              <div>
                <p className="text-white font-medium">View Customers</p>
                <p className="text-xs text-gray-400">Manage your customer base</p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg hover:scale-105 transition-all border border-white/10"
            >
              <span className="w-8 h-8 bg-yellow-600/30 rounded-lg flex items-center justify-center text-xl">📊</span>
              <div>
                <p className="text-white font-medium">View Analytics</p>
                <p className="text-xs text-gray-400">Check your store performance</p>
              </div>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-600/20 to-slate-600/20 rounded-lg hover:scale-105 transition-all border border-white/10"
            >
              <span className="w-8 h-8 bg-gray-600/30 rounded-lg flex items-center justify-center text-xl">⚙️</span>
              <div>
                <p className="text-white font-medium">Settings</p>
                <p className="text-xs text-gray-400">Configure your store</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Dashboard Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}