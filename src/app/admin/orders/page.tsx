'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  paymentMethod: 'card' | 'paypal' | 'bank'
  items: number
}

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock orders data
        setOrders([
          {
            id: '1',
            orderNumber: 'ORD-2024-001',
            customer: {
              name: 'Ahmed Khan',
              email: 'ahmed.khan@example.com'
            },
            date: '2024-03-15',
            total: 299,
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'card',
            items: 2
          },
          {
            id: '2',
            orderNumber: 'ORD-2024-002',
            customer: {
              name: 'Fatima Ali',
              email: 'fatima.ali@example.com'
            },
            date: '2024-03-14',
            total: 599,
            status: 'processing',
            paymentStatus: 'paid',
            paymentMethod: 'paypal',
            items: 1
          },
          {
            id: '3',
            orderNumber: 'ORD-2024-003',
            customer: {
              name: 'Omar Hassan',
              email: 'omar.h@example.com'
            },
            date: '2024-03-14',
            total: 149,
            status: 'pending',
            paymentStatus: 'unpaid',
            paymentMethod: 'bank',
            items: 3
          },
          {
            id: '4',
            orderNumber: 'ORD-2024-004',
            customer: {
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com'
            },
            date: '2024-03-13',
            total: 89,
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'card',
            items: 1
          },
          {
            id: '5',
            orderNumber: 'ORD-2024-005',
            customer: {
              name: 'Mike Wilson',
              email: 'mike.w@example.com'
            },
            date: '2024-03-13',
            total: 399,
            status: 'cancelled',
            paymentStatus: 'refunded',
            paymentMethod: 'paypal',
            items: 2
          },
          {
            id: '6',
            orderNumber: 'ORD-2024-006',
            customer: {
              name: 'Aisha Rahman',
              email: 'aisha.r@example.com'
            },
            date: '2024-03-12',
            total: 199,
            status: 'shipped',
            paymentStatus: 'paid',
            paymentMethod: 'card',
            items: 1
          }
        ])
      } catch (error) {
        console.log('Error loading orders')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    let matchesDate = true
    const orderDate = new Date(order.date)
    const today = new Date()
    if (dateRange === 'today') {
      matchesDate = orderDate.toDateString() === today.toDateString()
    } else if (dateRange === 'week') {
      const weekAgo = new Date(today.setDate(today.getDate() - 7))
      matchesDate = orderDate >= weekAgo
    } else if (dateRange === 'month') {
      const monthAgo = new Date(today.setMonth(today.getMonth() - 1))
      matchesDate = orderDate >= monthAgo
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'shipped':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'pending':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'unpaid':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'refunded':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getPaymentIcon = (method: string) => {
    switch(method) {
      case 'card': return '💳'
      case 'paypal': return '🅿️'
      case 'bank': return '🏦'
      default: return '💰'
    }
  }

  const stats = {
    total: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  }

  const handleDelete = (id: string) => {
    setSelectedOrderId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedOrderId) {
      setOrders(orders.filter(o => o.id !== selectedOrderId))
      setShowDeleteModal(false)
      setSelectedOrderId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading orders...</p>
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
            Orders{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-400">Manage and track customer orders</p>
        </div>
        <Link
          href="/admin/orders/new"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          New Order
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-white">${stats.revenue}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Processing</p>
          <p className="text-2xl font-bold text-white">{stats.processing}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Delivered</p>
          <p className="text-2xl font-bold text-white">{stats.delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by order # or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 py-3 text-left text-gray-400">Order #</th>
                <th className="px-4 py-3 text-left text-gray-400">Customer</th>
                <th className="px-4 py-3 text-left text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-gray-400">Total</th>
                <th className="px-4 py-3 text-left text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-gray-400">Payment</th>
                <th className="px-4 py-3 text-left text-gray-400">Items</th>
                <th className="px-4 py-3 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-white hover:text-pink-400">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white">{order.customer.name}</p>
                      <p className="text-sm text-gray-400">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{order.date}</td>
                  <td className="px-4 py-3 text-white font-bold">${order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getPaymentIcon(order.paymentMethod)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPaymentStatusBadge(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">{order.items}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                      >
                        👁️
                      </Link>
                      <Link
                        href={`/admin/orders/${order.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this order?</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Orders Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}