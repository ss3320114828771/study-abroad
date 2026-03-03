'use client'

import { useState } from 'react'
import Bismillah from '@/components/ui/bismilliah'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'IELTS Preparation Course', price: 299, quantity: 1, image: '/n1.jpeg' },
    { id: 2, name: 'University Application Guide', price: 49, quantity: 2, image: '/n2.jpeg' },
    { id: 3, name: 'Visa Consultation Package', price: 599, quantity: 1, image: '/n3.jpeg' },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="space-y-8">
      <Bismillah />
      
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        Shopping{' '}
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Cart
        </span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Start adding some items to your cart!</p>
          <Link 
            href="/products" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-4 flex gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-pink-400 font-bold text-xl mb-2">${item.price}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-white/10 rounded-lg text-white hover:bg-white/20"
                    >
                      -
                    </button>
                    <span className="text-white w-12 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-white/10 rounded-lg text-white hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
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

            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all font-bold text-lg mb-3">
              Proceed to Checkout
            </button>

            <Link 
              href="/products" 
              className="block text-center text-gray-400 hover:text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}