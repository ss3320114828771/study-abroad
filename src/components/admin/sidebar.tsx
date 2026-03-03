'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
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
    { name: 'Add Product', href: '/admin/addproduct', icon: '➕', color: 'from-indigo-500 to-purple-500' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈', color: 'from-red-500 to-pink-500' },
    { name: 'Support', href: '/admin/support', icon: '🎫', color: 'from-emerald-500 to-green-500' },
    { name: 'Help Center', href: '/admin/helpcenter', icon: '📚', color: 'from-cyan-500 to-blue-500' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', color: 'from-gray-500 to-slate-500' },
  ]

  // User info
  const user = {
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@example.com',
    role: 'Super Administrator'
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-gray-900/95 to-purple-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
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
                onClick={onClose}
                className="md:hidden w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0)}
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
                    onClick={() => isMobile && onClose()}
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

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Store Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Orders</span>
                  <span className="text-white font-medium">3,245</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Users</span>
                  <span className="text-white font-medium">5,678</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Products</span>
                  <span className="text-white font-medium">48</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Revenue</span>
                  <span className="text-green-400 font-medium">$245.8K</span>
                </div>
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
              onClick={() => {
                // Handle logout
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                window.location.href = '/auth/login'
              }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors mt-1"
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}