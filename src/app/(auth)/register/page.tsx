'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Bismillah from '@/components/ui/bismilliah'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <Bismillah />
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Account
            </span>
          </h1>
          <p className="text-gray-400">Join our community of global learners</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">👤</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">✓</span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-2">
              <div className="flex gap-1 h-1">
                <div className="flex-1 bg-red-500/30 rounded"></div>
                <div className="flex-1 bg-yellow-500/30 rounded"></div>
                <div className="flex-1 bg-green-500/30 rounded"></div>
                <div className="flex-1 bg-blue-500/30 rounded"></div>
              </div>
              <p className="text-xs text-gray-400">Password strength: Good</p>
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                required
                className="mt-1 w-4 h-4 bg-white/10 border border-white/20 rounded"
              />
              <span className="text-gray-300 text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-pink-400 hover:text-pink-300">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-pink-400 hover:text-pink-300">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.agreeTerms}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:scale-105 transition-all font-bold text-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Social Registration */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
                📘 Google
              </button>
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
                🐦 Twitter
              </button>
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
                👤 GitHub
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-green-400 hover:text-green-300 font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/20">
            <span className="text-2xl block mb-1">🎓</span>
            <span className="text-xs text-gray-300">Study Abroad</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/20">
            <span className="text-2xl block mb-1">📚</span>
            <span className="text-xs text-gray-300">Resources</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/20">
            <span className="text-2xl block mb-1">🌍</span>
            <span className="text-xs text-gray-300">Global Network</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/20">
            <span className="text-2xl block mb-1">💼</span>
            <span className="text-xs text-gray-300">Career Support</span>
          </div>
        </div>

        {/* Admin Info */}
        <div className="text-center">
          <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
            <p className="text-sm text-gray-400">Administrator</p>
            <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
            <p className="text-gray-400 text-sm">sajidsyed@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}