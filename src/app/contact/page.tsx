'use client'

import { useState } from 'react'
import Bismillah from '@/components/ui/bismilliah'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Message sent! We\'ll get back to you soon.')
  }

  return (
    <div className="space-y-8">
      <Bismillah />
      
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        Contact{' '}
        <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Us
        </span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all font-bold text-lg"
            >
              Send Message ✨
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-2xl">📍</div>
                <div>
                  <p className="text-gray-400">Address</p>
                  <p className="text-white">123 Education Street, Knowledge City, 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center text-2xl">📞</div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="text-white">+1 (234) 567-890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-2xl">✉️</div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="text-white">info@studyabroad.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>
            <div className="flex gap-4">
              <a href="#" className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-all">📺</a>
              <a href="#" className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-all">📘</a>
              <a href="#" className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-all">💬</a>
              <a href="#" className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-all">📱</a>
              <a href="#" className="w-14 h-14 bg-gray-600/20 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-all">🐙</a>
            </div>
          </div>

          {/* Admin Info */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-white/20">
            <p className="text-sm text-gray-400">Contact Administrator</p>
            <p className="text-xl font-bold text-white">Hafiz Sajid Syed</p>
            <p className="text-gray-300">sajidsyed@gmail.com</p>
            <p className="text-gray-300">hafiz.sajid.syed@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}