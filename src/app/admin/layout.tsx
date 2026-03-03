'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Bismillah from '@/components/ui/bismilliah'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { name: 'Users', href: '/admin/users', icon: '👥', color: 'from-green-500 to-teal-500' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒', color: 'from-purple-500 to-pink-500' },
    { name: 'Products', href: '/admin/products', icon: '📦', color: 'from-yellow-500 to-orange-500' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈', color: 'from-indigo-500 to-purple-500' },
    { name: 'Support', href: '/admin/support', icon: '🎫', color: 'from-red-500 to-pink-500' },
    { name: 'Help Center', href: '/admin/helpcenter', icon: '📚', color: 'from-emerald-500 to-green-500' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', color: 'from-gray-500 to-slate-500' },
  ]

  // Quick actions
  const quickActions = [
    { name: 'Add Product', href: '/admin/addproduct', icon: '➕', color: 'purple' },
    { name: 'New Order', href: '/admin/orders/new', icon: '📝', color: 'pink' },
    { name: 'Add User', href: '/admin/users/add', icon: '👤', color: 'blue' },
  ]

  // User info
  const user = {
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@example.com',
    avatar: '',
    role: 'Super Administrator'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-gray-900/95 to-purple-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <span className="text-white font-bold text-lg">AdminPanel</span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                <span className="inline-block px-2 py-0.5 bg-purple-600/30 text-purple-300 text-xs rounded-full mt-1">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="flex-1 font-medium">{item.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span>Back to Store</span>
            </Link>
            <button
              onClick={() => {/* Logout */}}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors mt-1"
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gradient-to-r from-gray-900/95 to-purple-900/95 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
              >
                <span className="text-xl">☰</span>
              </button>
              <div className="hidden md:block">
                <Bismillah />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:relative md:block">
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Messages */}
              <button className="relative w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
                <span className="text-xl">💬</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>

              {/* Profile dropdown - simplified */}
              <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">H</span>
                </div>
                <span className="hidden md:inline">Hafiz Sajid</span>
                <span className="text-xs">▼</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {/* Mobile Bismillah */}
          <div className="md:hidden mb-4">
            <Bismillah />
          </div>
          
          {children}
        </main>
      </div>
    </div>
  )
}