'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-purple-900 border-t border-white/10 mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🌍</span>
              </div>
              <span className="text-white font-bold text-xl">StudyAbroad</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for study abroad opportunities. 
              We help students achieve their dreams of international education.
            </p>
            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-600/30 hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                📺
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-600/30 hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-600/30 hover:scale-110 transition-all"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/20 hover:scale-110 transition-all"
                aria-label="Vercel"
              >
                ▲
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-600/30 hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                🐙
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/directions" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Study Destinations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/helpcenter" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Support Tickets
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span className="text-pink-400">›</span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Newsletter</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get updates on new courses, destinations, and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all font-medium"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm animate-pulse">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                Website managed by{' '}
                <span className="text-pink-400 font-medium">Hafiz Sajid Syed</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                sajidsyed@gmail.com | hafiz.sajid.syed@gmail.com
              </p>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} StudyAbroad Agency. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-pink-400 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-pink-400 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-pink-400 transition-colors">
              Cookies
            </Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-pink-400 transition-colors">
              Sitemap
            </Link>
            <span>•</span>
            <Link href="/accessibility" className="hover:text-pink-400 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}