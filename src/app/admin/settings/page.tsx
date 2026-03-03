'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface Settings {
  store: {
    name: string
    email: string
    phone: string
    address: string
    currency: string
    timezone: string
    dateFormat: string
  }
  appearance: {
    theme: 'light' | 'dark' | 'system'
    accentColor: string
    logo: string
    favicon: string
  }
  notifications: {
    emailNotifications: boolean
    orderUpdates: boolean
    newUserAlerts: boolean
    lowStockAlerts: boolean
    weeklyReports: boolean
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    ipWhitelist: string[]
  }
  payment: {
    stripeEnabled: boolean
    paypalEnabled: boolean
    codEnabled: boolean
    taxRate: number
    shippingFee: number
    freeShippingThreshold: number
  }
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [showSuccess, setShowSuccess] = useState(false)
  const [newIpAddress, setNewIpAddress] = useState('')

  const [settings, setSettings] = useState<Settings>({
    store: {
      name: 'StudyAbroad Store',
      email: 'info@studyabroad.com',
      phone: '+1 (234) 567-890',
      address: '123 Education Street, New York, NY 10001',
      currency: 'USD',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY'
    },
    appearance: {
      theme: 'dark',
      accentColor: 'purple',
      logo: '/logo.png',
      favicon: '/favicon.ico'
    },
    notifications: {
      emailNotifications: true,
      orderUpdates: true,
      newUserAlerts: true,
      lowStockAlerts: true,
      weeklyReports: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      ipWhitelist: ['127.0.0.1', '192.168.1.1']
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: false,
      codEnabled: true,
      taxRate: 10,
      shippingFee: 5.99,
      freeShippingThreshold: 50
    }
  })

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Settings would be loaded from API here
      } catch (error) {
        console.log('Error loading settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      store: {
        ...settings.store,
        [name]: value
      }
    })
  }

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    })
  }

  const handleSecurityChange = (key: keyof typeof settings.security, value: any) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: value
      }
    })
  }

  const handlePaymentChange = (key: keyof typeof settings.payment, value: any) => {
    setSettings({
      ...settings,
      payment: {
        ...settings.payment,
        [key]: value
      }
    })
  }

  const addIpToWhitelist = () => {
    if (newIpAddress && !settings.security.ipWhitelist.includes(newIpAddress)) {
      setSettings({
        ...settings,
        security: {
          ...settings.security,
          ipWhitelist: [...settings.security.ipWhitelist, newIpAddress]
        }
      })
      setNewIpAddress('')
    }
  }

  const removeIpFromWhitelist = (ip: string) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        ipWhitelist: settings.security.ipWhitelist.filter(i => i !== ip)
      }
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
    <div className="space-y-6">
      <Bismillah />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Store{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-gray-400">Configure your store preferences</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
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
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="flex flex-wrap border-b border-white/10">
          {[
            { id: 'general', label: 'General', icon: '🏪' },
            { id: 'appearance', label: 'Appearance', icon: '🎨' },
            { id: 'notifications', label: 'Notifications', icon: '🔔' },
            { id: 'security', label: 'Security', icon: '🔒' },
            { id: 'payment', label: 'Payment', icon: '💳' },
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
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Store Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Store Name</label>
                  <input
                    type="text"
                    name="name"
                    value={settings.store.name}
                    onChange={handleStoreChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Store Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.store.email}
                    onChange={handleStoreChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={settings.store.phone}
                    onChange={handleStoreChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Currency</label>
                  <select
                    name="currency"
                    value={settings.store.currency}
                    onChange={handleStoreChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (د.إ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Timezone</label>
                  <select
                    name="timezone"
                    value={settings.store.timezone}
                    onChange={handleStoreChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Date Format</label>
                  <select
                    name="dateFormat"
                    value={settings.store.dateFormat}
                    onChange={handleStoreChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Store Address</label>
                  <textarea
                    name="address"
                    value={settings.store.address}
                    onChange={handleStoreChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Theme Settings</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Theme</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={settings.appearance.theme === 'light'}
                        onChange={() => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, theme: 'light' }
                        })}
                        className="w-4 h-4"
                      />
                      <span className="text-white">Light</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={settings.appearance.theme === 'dark'}
                        onChange={() => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, theme: 'dark' }
                        })}
                        className="w-4 h-4"
                      />
                      <span className="text-white">Dark</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="theme"
                        value="system"
                        checked={settings.appearance.theme === 'system'}
                        onChange={() => setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, theme: 'system' }
                        })}
                        className="w-4 h-4"
                      />
                      <span className="text-white">System</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Accent Color</label>
                  <select
                    value={settings.appearance.accentColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, accentColor: e.target.value }
                    })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="purple">Purple</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="pink">Pink</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
              
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email notifications' },
                { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about new orders' },
                { key: 'newUserAlerts', label: 'New User Alerts', desc: 'Alert when new users register' },
                { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when stock is low' },
                { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly sales reports' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                      onChange={() => handleNotificationChange(item.key as keyof typeof settings.notifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => handleSecurityChange('maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">IP Whitelist</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newIpAddress}
                      onChange={(e) => setNewIpAddress(e.target.value)}
                      placeholder="Enter IP address"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                    <button
                      onClick={addIpToWhitelist}
                      className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {settings.security.ipWhitelist.map((ip, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <span className="text-white">{ip}</span>
                        <button
                          onClick={() => removeIpFromWhitelist(ip)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Payment Settings</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { key: 'stripeEnabled', label: 'Stripe', icon: '💳' },
                  { key: 'paypalEnabled', label: 'PayPal', icon: '🅿️' },
                  { key: 'codEnabled', label: 'Cash on Delivery', icon: '💵' },
                ].map((method) => (
                  <div key={method.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-white">{method.label}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.payment[method.key as keyof typeof settings.payment] as boolean}
                        onChange={(e) => handlePaymentChange(method.key as keyof typeof settings.payment, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.payment.taxRate}
                    onChange={(e) => handlePaymentChange('taxRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Shipping Fee ($)</label>
                  <input
                    type="number"
                    value={settings.payment.shippingFee}
                    onChange={(e) => handlePaymentChange('shippingFee', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Free Shipping Threshold ($)</label>
                  <input
                    type="number"
                    value={settings.payment.freeShippingThreshold}
                    onChange={(e) => handlePaymentChange('freeShippingThreshold', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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