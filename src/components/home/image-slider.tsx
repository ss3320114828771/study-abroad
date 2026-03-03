'use client'

import { useState, useEffect } from 'react'

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    { id: 1, src: '/images/n1.jpeg', title: 'Study Abroad Consultation' },
    { id: 2, src: '/images/n2.jpeg', title: 'University Selection' },
    { id: 3, src: '/images/n3.jpeg', title: 'Visa Assistance' },
    { id: 4, src: '/images/n4.jpeg', title: 'Student Success' },
    { id: 5, src: '/images/n5.jpeg', title: 'Workshops & Events' },
    { id: 6, src: '/images/n6.jpeg', title: 'Graduation Ceremony' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
            <p className="text-lg opacity-90">Your journey starts here</p>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-pink-500 w-6'
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}