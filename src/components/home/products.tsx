'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'IELTS Preparation Course', price: 299, image: '/images/n1.jpeg', category: 'Courses' },
    { id: 2, name: 'University Application Guide', price: 49, image: '/images/n2.jpeg', category: 'Books' },
    { id: 3, name: 'Visa Consultation Package', price: 599, image: '/images/n3.jpeg', category: 'Services' },
    { id: 4, name: 'TOEFL Practice Tests', price: 89, image: '/images/n4.jpeg', category: 'Courses' },
    { id: 5, name: 'Statement of Purpose Writing', price: 199, image: '/images/n5.jpeg', category: 'Services' },
    { id: 6, name: 'Study Abroad Starter Kit', price: 149, image: '/images/n6.jpeg', category: 'Kits' },
  ])

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">
          Featured{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Products
          </span>
        </h2>
        <Link href="/products" className="text-pink-400 hover:text-pink-300 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:scale-105 transition-all">
            <div className="relative h-48">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600/80 rounded-lg text-white text-xs">
                {product.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-400">${product.price}</span>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}