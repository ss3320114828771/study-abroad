'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface UserProfile {
  name: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  postalCode: string
  dateOfBirth: string
  gender: string
  avatar: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  orderUpdates: boolean
  promotions: boolean
  newsletter: boolean
  securityAlerts: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts'
  showEmail: boolean
  showPhone: boolean
  showLocation: boolean
  allowMessages: boolean
  allowFriendRequests: boolean
}

export default function DashboardSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})

  // Profile settings
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@example.com',
    phone: '+1 (234) 567-890',
    country: 'United States',
    city: 'New York',
    address: '123 Education Street',
    postalCode: '10001',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    avatar: ''
  })

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    securityAlerts: true
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    allowFriendRequests: true
  })

  // Password change
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        // Settings would be loaded from API here
      } catch (error) {
        console.log('Error loading settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value
    })
  }

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    })
  }

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy({
      ...privacy,
      [key]: value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords({
      ...passwords,
      [name]: value
    })
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.log('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!')
      return
    }
    if (passwords.new.length < 8) {
      alert('Password must be at least 8 characters!')
      return
    }
    
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowSuccess(true)
      setPasswords({ current: '', new: '', confirm: '' })
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.log('Error changing password')
    } finally {
      setSaving(false)
    }
  }

  const deleteAccount = () => {
    setShowConfirmModal(true)
    setConfirmAction(() => () => {
      // Delete account logic
      alert('Account deletion requested')
      setShowConfirmModal(false)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Bismillah />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Account{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-gray-400">Manage your account preferences and security</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <span>💾</span>
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {/* Settings Tabs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
        <div className="flex flex-wrap border-b border-white/10">
          {[
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'notifications', label: 'Notifications', icon: '🔔' },
            { id: 'privacy', label: 'Privacy', icon: '🔒' },
            { id: 'security', label: 'Security', icon: '🛡️' },
            { id: 'preferences', label: 'Preferences', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-pink-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
              
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    profile.name.charAt(0)
                  )}
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    Change Photo
                  </button>
                  <p className="text-sm text-gray-400 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Country</label>
                  <select
                    name="country"
                    value={profile.country}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={profile.postalCode}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via text message' },
                  { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about order status changes' },
                  { key: 'promotions', label: 'Promotions & Offers', desc: 'Receive promotional emails and offers' },
                  { key: 'newsletter', label: 'Newsletter', desc: 'Subscribe to our monthly newsletter' },
                  { key: 'securityAlerts', label: 'Security Alerts', desc: 'Get alerts about account security' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof NotificationSettings]}
                        onChange={() => handleNotificationChange(item.key as keyof NotificationSettings)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Privacy Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <label className="block text-gray-300 mb-2">Profile Visibility</label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="public">Public - Everyone can see</option>
                    <option value="contacts">Contacts Only - Only my contacts</option>
                    <option value="private">Private - Only me</option>
                  </select>
                </div>

                {[
                  { key: 'showEmail', label: 'Show Email', desc: 'Display your email on your profile' },
                  { key: 'showPhone', label: 'Show Phone', desc: 'Display your phone number on your profile' },
                  { key: 'showLocation', label: 'Show Location', desc: 'Display your location on your profile' },
                  { key: 'allowMessages', label: 'Allow Messages', desc: 'Allow others to send you messages' },
                  { key: 'allowFriendRequests', label: 'Allow Friend Requests', desc: 'Allow others to send you friend requests' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy[item.key as keyof PrivacySettings] as boolean}
                        onChange={(e) => handlePrivacyChange(item.key as keyof PrivacySettings, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
              
              {/* Change Password */}
              <div className="p-4 bg-white/5 rounded-lg space-y-4">
                <h4 className="text-lg font-medium text-white">Change Password</h4>
                
                <div>
                  <label className="block text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  onClick={changePassword}
                  disabled={saving}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:scale-105 transition-all"
                >
                  Update Password
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="p-4 bg-white/5 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30">
                  Enable
                </button>
              </div>

              {/* Active Sessions */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-4">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💻</span>
                      <div>
                        <p className="text-white">Current Session</p>
                        <p className="text-sm text-gray-400">Chrome on Windows • New York, USA</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">Active Now</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="text-white">Mobile App</p>
                        <p className="text-sm text-gray-400">iPhone • Last active 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="p-4 bg-red-600/10 rounded-lg border border-red-500/30">
                <h4 className="text-lg font-medium text-red-400 mb-2">Delete Account</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={deleteAccount}
                  className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">User Preferences</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Language</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="est">Eastern Time (EST)</option>
                    <option value="cst">Central Time (CST)</option>
                    <option value="mst">Mountain Time (MST)</option>
                    <option value="pst">Pacific Time (PST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Date Format</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="mdy">MM/DD/YYYY</option>
                    <option value="dmy">DD/MM/YYYY</option>
                    <option value="ymd">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Currency</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="aed">AED (د.إ)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-4">Theme Preferences</h4>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl flex-1">
                    Light Theme
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl flex-1 border-2 border-pink-500">
                    Dark Theme
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl flex-1">
                    System Default
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Action</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  confirmAction()
                  setShowConfirmModal(false)
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
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
          <p className="text-sm text-gray-400">Settings Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}