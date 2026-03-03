'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] rounded-3xl overflow-hidden">
      {/* Background with gradient and image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-pink-900/90 z-10"></div>
        <img 
          src="/images/n1.jpeg" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Gateway to{' '}
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Global Education
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Expert guidance for studying abroad. Premium resources, courses, and consultancy services to make your dreams come true.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/products" 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:scale-105 transition-all font-bold text-lg shadow-2xl"
            >
              Explore Shop
            </Link>
            <Link 
              href="/directions" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all font-bold text-lg border border-white/20"
            >
              Study Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 right-10 z-20 hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/30 animate-pulse">
              <img src={`/images/n${num}.jpeg`} alt={`Feature ${num}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}