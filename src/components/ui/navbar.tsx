'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-4 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Main Navbar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🌍</span>
            </div>
            <span className="text-white font-bold text-xl hidden md:block">StudyAbroad</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            {[
              { name: 'Home', href: '/', icon: '🏠' },
              { name: 'About', href: '/about', icon: '📚' },
              { name: 'Shop', href: '/products', icon: '🛍️' },
              { name: 'Directions', href: '/directions', icon: '🧭' },
              { name: 'Contact', href: '/contact', icon: '📞' },
              { name: 'Cart', href: '/cart', icon: '🛒' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all hover:scale-110 border border-white/20 flex items-center gap-2 group"
              >
                <span className="text-xl group-hover:rotate-12 transition-transform">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white text-2xl flex items-center justify-center"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {[
              { name: 'Home', href: '/', icon: '🏠' },
              { name: 'About', href: '/about', icon: '📚' },
              { name: 'Shop', href: '/products', icon: '🛍️' },
              { name: 'Directions', href: '/directions', icon: '🧭' },
              { name: 'Contact', href: '/contact', icon: '📞' },
              { name: 'Cart', href: '/cart', icon: '🛒' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 text-lg"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}