'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    { id: 1, src: '/n1.jpeg', alt: 'Study Abroad Session', category: 'Events' },
    { id: 2, src: '/n2.jpeg', alt: 'Students Consulting', category: 'Consulting' },
    { id: 3, src: '/n3.jpeg', alt: 'University Fair', category: 'Events' },
    { id: 4, src: '/n4.jpeg', alt: 'Success Stories', category: 'Students' },
    { id: 5, src: '/n5.jpeg', alt: 'Workshop', category: 'Events' },
    { id: 6, src: '/n6.jpeg', alt: 'Graduation', category: 'Students' },
  ]

  const categories = ['All', ...new Set(images.map(img => img.category))]
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Our{' '}
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Gallery
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Glimpses of our events, consultations, and student success stories
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium">{image.alt}</p>
                <p className="text-sm text-pink-400">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-pink-400"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          
          <div className="relative max-w-5xl w-full h-[80vh]">
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="w-full h-full object-contain"
            />
            
            {/* Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-pink-400"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(
                  selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1
                )
              }}
            >
              ←
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-pink-400"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(
                  selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1
                )
              }}
            >
              →
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-lg font-medium">{filteredImages[selectedImage].alt}</p>
              <p className="text-sm text-pink-400">{filteredImages[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}

      {/* View More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all inline-flex items-center gap-2">
          <span>📸</span>
          View Full Gallery
        </button>
      </div>
    </section>
  )
}