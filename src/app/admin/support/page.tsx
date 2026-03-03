'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface Ticket {
  id: string
  ticketNumber: string
  customer: {
    name: string
    email: string
  }
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  lastUpdated: string
  messages: number
}

export default function AdminSupportPage() {
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock tickets data
        setTickets([
          {
            id: '1',
            ticketNumber: 'TKT-2024-001',
            customer: {
              name: 'Ahmed Khan',
              email: 'ahmed.khan@example.com'
            },
            subject: 'Unable to access course materials',
            category: 'Technical',
            priority: 'high',
            status: 'in-progress',
            lastUpdated: '10 minutes ago',
            messages: 5
          },
          {
            id: '2',
            ticketNumber: 'TKT-2024-002',
            customer: {
              name: 'Fatima Ali',
              email: 'fatima.ali@example.com'
            },
            subject: 'Payment not processed',
            category: 'Billing',
            priority: 'urgent',
            status: 'open',
            lastUpdated: '25 minutes ago',
            messages: 3
          },
          {
            id: '3',
            ticketNumber: 'TKT-2024-003',
            customer: {
              name: 'Omar Hassan',
              email: 'omar.h@example.com'
            },
            subject: 'Shipping delay inquiry',
            category: 'Shipping',
            priority: 'medium',
            status: 'resolved',
            lastUpdated: '1 hour ago',
            messages: 8
          },
          {
            id: '4',
            ticketNumber: 'TKT-2024-004',
            customer: {
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com'
            },
            subject: 'Account login issues',
            category: 'Technical',
            priority: 'low',
            status: 'closed',
            lastUpdated: '3 hours ago',
            messages: 4
          },
          {
            id: '5',
            ticketNumber: 'TKT-2024-005',
            customer: {
              name: 'Mike Wilson',
              email: 'mike.w@example.com'
            },
            subject: 'Refund request',
            category: 'Billing',
            priority: 'high',
            status: 'in-progress',
            lastUpdated: '5 hours ago',
            messages: 6
          },
          {
            id: '6',
            ticketNumber: 'TKT-2024-006',
            customer: {
              name: 'Aisha Rahman',
              email: 'aisha.r@example.com'
            },
            subject: 'Course enrollment problem',
            category: 'Technical',
            priority: 'medium',
            status: 'open',
            lastUpdated: '1 day ago',
            messages: 2
          }
        ])
      } catch (error) {
        console.log('Error loading tickets')
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [])

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'in-progress':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'resolved':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'closed':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length
  }

  const handleDelete = (id: string) => {
    setSelectedTicketId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedTicketId) {
      setTickets(tickets.filter(t => t.id !== selectedTicketId))
      setShowDeleteModal(false)
      setSelectedTicketId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading support tickets...</p>
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
            Support{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Tickets
            </span>
          </h1>
          <p className="text-gray-400">Manage customer support requests</p>
        </div>
        <Link
          href="/admin/support/new"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          New Ticket
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Tickets</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Open</p>
          <p className="text-2xl font-bold text-white">{stats.open}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">In Progress</p>
          <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Resolved</p>
          <p className="text-2xl font-bold text-white">{stats.resolved}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Urgent</p>
          <p className="text-2xl font-bold text-white">{stats.urgent}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by ticket #, customer, or subject..."
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
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 py-3 text-left text-gray-400">Ticket #</th>
                <th className="px-4 py-3 text-left text-gray-400">Customer</th>
                <th className="px-4 py-3 text-left text-gray-400">Subject</th>
                <th className="px-4 py-3 text-left text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-gray-400">Priority</th>
                <th className="px-4 py-3 text-left text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-gray-400">Messages</th>
                <th className="px-4 py-3 text-left text-gray-400">Last Updated</th>
                <th className="px-4 py-3 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link href={`/admin/support/${ticket.id}`} className="text-white hover:text-pink-400 font-medium">
                      {ticket.ticketNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white">{ticket.customer.name}</p>
                      <p className="text-sm text-gray-400">{ticket.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white truncate max-w-xs">{ticket.subject}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-white">
                      {ticket.messages}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{ticket.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/support/${ticket.id}`}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                        title="View Ticket"
                      >
                        👁️
                      </Link>
                      <Link
                        href={`/admin/support/${ticket.id}/reply`}
                        className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30"
                        title="Reply"
                      >
                        💬
                      </Link>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/admin/helpcenter"
          className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-white/20 hover:scale-105 transition-all text-center"
        >
          <span className="text-3xl block mb-2">📚</span>
          <h3 className="text-white font-medium">Help Center</h3>
          <p className="text-sm text-gray-400">Manage knowledge base</p>
        </Link>
        <Link
          href="/admin/support/faqs"
          className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20 hover:scale-105 transition-all text-center"
        >
          <span className="text-3xl block mb-2">❓</span>
          <h3 className="text-white font-medium">FAQs</h3>
          <p className="text-sm text-gray-400">Manage frequently asked questions</p>
        </Link>
        <Link
          href="/admin/support/templates"
          className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-white/20 hover:scale-105 transition-all text-center"
        >
          <span className="text-3xl block mb-2">📝</span>
          <h3 className="text-white font-medium">Templates</h3>
          <p className="text-sm text-gray-400">Manage response templates</p>
        </Link>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this ticket?</p>
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
          <p className="text-sm text-gray-400">Support Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}