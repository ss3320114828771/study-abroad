'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  inStock: boolean
}

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.productId as string
  
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    notes: ''
  })

  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock product data based on ID
        const mockProducts: Record<string, Product> = {
          '1': {
            id: '1',
            name: 'IELTS Preparation Course',
            price: 299,
            originalPrice: 399,
            image: '/images/n1.jpeg',
            category: 'Courses',
            description: 'Comprehensive IELTS preparation course with practice tests and expert guidance.',
            inStock: true
          },
          '2': {
            id: '2',
            name: 'University Application Guide',
            price: 49,
            image: '/images/n2.jpeg',
            category: 'Books',
            description: 'Step-by-step guide to applying for universities abroad.',
            inStock: true
          },
          '3': {
            id: '3',
            name: 'Visa Consultation Package',
            price: 599,
            originalPrice: 799,
            image: '/images/n3.jpeg',
            category: 'Services',
            description: 'Complete visa consultation and application assistance.',
            inStock: true
          },
          '4': {
            id: '4',
            name: 'TOEFL Practice Tests',
            price: 89,
            image: '/images/n4.jpeg',
            category: 'Courses',
            description: 'Full-length TOEFL practice tests with scoring and feedback.',
            inStock: true
          },
          '5': {
            id: '5',
            name: 'Statement of Purpose Writing',
            price: 199,
            image: '/images/n5.jpeg',
            category: 'Services',
            description: 'Professional SOP writing and editing service.',
            inStock: true
          },
          '6': {
            id: '6',
            name: 'Study Abroad Starter Kit',
            price: 149,
            originalPrice: 199,
            image: '/images/n6.jpeg',
            category: 'Kits',
            description: 'Complete starter kit with guides, checklists, and resources.',
            inStock: true
          }
        }

        setProduct(mockProducts[productId] || mockProducts['1'])
      } catch (error) {
        console.log('Error loading product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPlacing(true)
    
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setPlacing(false)
    router.push('/dashboard/orders/success')
  }

  const subtotal = product ? product.price * quantity : 0
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">The product you're trying to order doesn't exist.</p>
          <Link 
            href="/products" 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all"
          >
            Browse Products
          </Link>
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
            Place Your{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-gray-400">Complete your purchase of {product.name}</p>
        </div>
        <Link 
          href={`/products/${productId}`}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          ← Back to Product
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Summary */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Product Summary</h2>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-pink-400 font-bold text-xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="USA"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
                ].map((method) => (
                  <label key={method.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-pink-500"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-white">{method.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Additional Notes</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Any special instructions or requirements..."
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            
            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white/10 rounded-lg text-white hover:bg-white/20"
                >
                  -
                </button>
                <span className="flex-1 text-center text-white text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-white/10 rounded-lg text-white hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-white">${product.price} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (10%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-pink-400 font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={placing}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all font-bold text-lg disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
            >
              {placing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <span>🔒</span>
                  Place Order
                </>
              )}
            </button>

            {/* Security Info */}
            <p className="text-xs text-gray-400 text-center">
              🔒 Secure payment. Your information is encrypted.
            </p>

            {/* Admin Info */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">Order Processed By</p>
              <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}