'use client'

import { useState } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

export default function AdminHelpCenterPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <Bismillah />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Help Center{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-400">Manage knowledge base, FAQs, and support resources</p>
        </div>
        <Link
          href="/admin/support"
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <span>🎫</span>
          Support Tickets
        </Link>
      </div>

      {/* Simple Tabs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="flex border-b border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'articles', label: 'Articles', icon: '📝' },
            { id: 'faqs', label: 'FAQs', icon: '❓' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Welcome to Help Center</h2>
              <p className="text-gray-300">Manage your knowledge base and help articles.</p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-600/20 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-gray-400">Total Articles</p>
                </div>
                <div className="bg-purple-600/20 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-gray-400">Categories</p>
                </div>
                <div className="bg-green-600/20 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">94%</p>
                  <p className="text-gray-400">Helpfulness</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Articles</h2>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">
                  + New Article
                </button>
              </div>
              <p className="text-gray-400">Article management coming soon...</p>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">FAQs</h2>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">
                  + New FAQ
                </button>
              </div>
              <p className="text-gray-400">FAQ management coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Help Center Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}