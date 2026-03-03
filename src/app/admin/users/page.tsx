'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  orders: number
  spent: number
  joined: string
  lastLogin: string
  avatar?: string
}

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock users data
        setUsers([
          {
            id: '1',
            name: 'Hafiz Sajid Syed',
            email: 'sajid.syed@example.com',
            role: 'super_admin',
            status: 'active',
            orders: 45,
            spent: 12500,
            joined: '2023-01-15',
            lastLogin: '2024-03-02'
          },
          {
            id: '2',
            name: 'Ahmed Khan',
            email: 'ahmed.khan@example.com',
            role: 'admin',
            status: 'active',
            orders: 23,
            spent: 5600,
            joined: '2023-03-20',
            lastLogin: '2024-03-01'
          },
          {
            id: '3',
            name: 'Fatima Ali',
            email: 'fatima.ali@example.com',
            role: 'user',
            status: 'active',
            orders: 12,
            spent: 2300,
            joined: '2023-06-10',
            lastLogin: '2024-02-28'
          },
          {
            id: '4',
            name: 'Omar Hassan',
            email: 'omar.h@example.com',
            role: 'user',
            status: 'inactive',
            orders: 3,
            spent: 450,
            joined: '2023-09-05',
            lastLogin: '2024-01-15'
          },
          {
            id: '5',
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            role: 'user',
            status: 'active',
            orders: 8,
            spent: 1200,
            joined: '2023-11-12',
            lastLogin: '2024-02-29'
          },
          {
            id: '6',
            name: 'Mike Wilson',
            email: 'mike.w@example.com',
            role: 'admin',
            status: 'active',
            orders: 34,
            spent: 8900,
            joined: '2023-02-08',
            lastLogin: '2024-03-02'
          },
          {
            id: '7',
            name: 'Aisha Rahman',
            email: 'aisha.r@example.com',
            role: 'user',
            status: 'suspended',
            orders: 1,
            spent: 99,
            joined: '2024-01-20',
            lastLogin: '2024-02-10'
          },
          {
            id: '8',
            name: 'John Smith',
            email: 'john.smith@example.com',
            role: 'user',
            status: 'active',
            orders: 5,
            spent: 780,
            joined: '2023-12-01',
            lastLogin: '2024-02-25'
          }
        ])
      } catch (error) {
        console.log('Error loading users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    admins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length,
    totalSpent: users.reduce((sum, u) => sum + u.spent, 0)
  }

  // Handle delete
  const handleDelete = (id: string) => {
    setSelectedUserId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedUserId) {
      setUsers(users.filter(u => u.id !== selectedUserId))
      setShowDeleteModal(false)
      setSelectedUserId(null)
    }
  }

  // Get role badge color
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'super_admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'admin':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'suspended':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading users...</p>
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
            Users{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-400">Manage your customers and administrators</p>
        </div>
        <Link
          href="/admin/users/add"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          Add User
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Active</p>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Inactive</p>
          <p className="text-2xl font-bold text-white">{stats.inactive}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Suspended</p>
          <p className="text-2xl font-bold text-white">{stats.suspended}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Admins</p>
          <p className="text-2xl font-bold text-white">{stats.admins}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Spent</p>
          <p className="text-2xl font-bold text-white">${stats.totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 py-3 text-left text-gray-400">User</th>
                <th className="px-4 py-3 text-left text-gray-400">Role</th>
                <th className="px-4 py-3 text-left text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-gray-400">Orders</th>
                <th className="px-4 py-3 text-left text-gray-400">Spent</th>
                <th className="px-4 py-3 text-left text-gray-400">Joined</th>
                <th className="px-4 py-3 text-left text-gray-400">Last Login</th>
                <th className="px-4 py-3 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center text-white font-bold">
                        {user.avatar ? user.avatar : user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getRoleBadge(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{user.orders}</td>
                  <td className="px-4 py-3 text-white">${user.spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-300">{user.joined}</td>
                  <td className="px-4 py-3 text-gray-300">{user.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                        title="View Details"
                      >
                        👁️
                      </Link>
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30"
                        title="Edit User"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Bulk Actions:</span>
          <button className="px-3 py-1 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30">
            Activate Selected
          </button>
          <button className="px-3 py-1 bg-yellow-600/20 text-yellow-300 rounded-lg hover:bg-yellow-600/30">
            Deactivate Selected
          </button>
          <button className="px-3 py-1 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30">
            Suspend Selected
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
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
          <p className="text-sm text-gray-400">Users Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}