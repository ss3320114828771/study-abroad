'use client'

import { useState, useEffect } from 'react'
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
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
}

export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Categories
  const categories = [
    { id: 'all', name: 'All Products', icon: '📦' },
    { id: 'courses', name: 'Courses', icon: '🎓' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'services', name: 'Services', icon: '💼' },
    { id: 'kits', name: 'Starter Kits', icon: '🎁' },
    { id: 'tests', name: 'Practice Tests', icon: '📝' },
  ]

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock products data
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'IELTS Preparation Course',
            price: 299,
            originalPrice: 399,
            image: '/images/n1.jpeg',
            category: 'courses',
            description: 'Comprehensive IELTS preparation with practice tests and expert guidance.',
            rating: 4.8,
            reviews: 234,
            inStock: true,
            isFeatured: true,
            isNew: false
          },
          {
            id: '2',
            name: 'University Application Guide',
            price: 49,
            image: '/images/n2.jpeg',
            category: 'books',
            description: 'Step-by-step guide to applying for universities abroad.',
            rating: 4.6,
            reviews: 178,
            inStock: true,
            isFeatured: true,
            isNew: false
          },
          {
            id: '3',
            name: 'Visa Consultation Package',
            price: 599,
            originalPrice: 799,
            image: '/images/n3.jpeg',
            category: 'services',
            description: 'Complete visa consultation and application assistance.',
            rating: 4.9,
            reviews: 312,
            inStock: true,
            isFeatured: true,
            isNew: true
          },
          {
            id: '4',
            name: 'TOEFL Practice Tests',
            price: 89,
            image: '/images/n4.jpeg',
            category: 'tests',
            description: 'Full-length TOEFL practice tests with scoring and feedback.',
            rating: 4.7,
            reviews: 156,
            inStock: true,
            isFeatured: false,
            isNew: false
          },
          {
            id: '5',
            name: 'Statement of Purpose Writing',
            price: 199,
            image: '/images/n5.jpeg',
            category: 'services',
            description: 'Professional SOP writing and editing service.',
            rating: 4.9,
            reviews: 445,
            inStock: true,
            isFeatured: true,
            isNew: false
          },
          {
            id: '6',
            name: 'Study Abroad Starter Kit',
            price: 149,
            originalPrice: 199,
            image: '/images/n6.jpeg',
            category: 'kits',
            description: 'Complete starter kit with guides, checklists, and resources.',
            rating: 4.8,
            reviews: 267,
            inStock: true,
            isFeatured: false,
            isNew: true
          },
          {
            id: '7',
            name: 'GRE Preparation Course',
            price: 349,
            originalPrice: 449,
            image: '/images/n1.jpeg',
            category: 'courses',
            description: 'Comprehensive GRE preparation with practice tests.',
            rating: 4.7,
            reviews: 189,
            inStock: true,
            isFeatured: false,
            isNew: false
          },
          {
            id: '8',
            name: 'Scholarship Guide Book',
            price: 39,
            image: '/images/n2.jpeg',
            category: 'books',
            description: 'Complete guide to finding and applying for scholarships.',
            rating: 4.5,
            reviews: 98,
            inStock: true,
            isFeatured: false,
            isNew: true
          },
          {
            id: '9',
            name: 'MBA Application Package',
            price: 499,
            originalPrice: 599,
            image: '/images/n3.jpeg',
            category: 'services',
            description: 'Complete MBA application consulting service.',
            rating: 4.9,
            reviews: 67,
            inStock: true,
            isFeatured: false,
            isNew: false
          },
          {
            id: '10',
            name: 'PTE Practice Tests',
            price: 79,
            image: '/images/n4.jpeg',
            category: 'tests',
            description: 'Full-length PTE practice tests with scoring.',
            rating: 4.6,
            reviews: 123,
            inStock: true,
            isFeatured: false,
            isNew: false
          },
          {
            id: '11',
            name: 'Country Guide Bundle',
            price: 99,
            originalPrice: 149,
            image: '/images/n5.jpeg',
            category: 'kits',
            description: 'Detailed guides for top 10 study destinations.',
            rating: 4.8,
            reviews: 234,
            inStock: true,
            isFeatured: true,
            isNew: false
          },
          {
            id: '12',
            name: 'Resume Building Service',
            price: 149,
            image: '/images/n6.jpeg',
            category: 'services',
            description: 'Professional resume and CV writing service.',
            rating: 4.8,
            reviews: 189,
            inStock: true,
            isFeatured: false,
            isNew: true
          }
        ]

        setProducts(mockProducts)
        setFilteredProducts(mockProducts)
      } catch (error) {
        console.log('Error loading products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    )

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (a.isNew ? -1 : 1))
        break
      default: // featured
        filtered.sort((a, b) => (a.isFeatured ? -1 : 1))
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchQuery, sortBy, priceRange])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Bismillah />
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Our{' '}
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Products
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover our comprehensive range of study abroad resources, courses, and services
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-pink-600/30 text-pink-300' 
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-pink-600/30 text-pink-300' 
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              ≡ List
            </button>
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-white/10 rounded-lg text-white"
          >
            {showFilters ? 'Hide Filters ↑' : 'Show Filters ↓'}
          </button>
        </div>

        {/* Filters (Desktop always visible, Mobile toggle) */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mt-4`}>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-all flex items-center gap-1 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-400">Price:</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-32"
              />
              <span className="text-sm text-white">${priceRange.max}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          Showing <span className="text-white">{filteredProducts.length}</span> of{' '}
          <span className="text-white">{products.length}</span> products
        </p>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-pink-400 hover:text-pink-300 text-sm"
          >
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Products Found</h2>
          <p className="text-gray-400">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/dashboard/products/${product.id}`}
              className={`group ${
                viewMode === 'grid'
                  ? 'bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:scale-105 transition-all'
                  : 'bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-4 hover:scale-102 transition-all block'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div>
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    {product.isNew && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-600/80 text-white text-xs rounded-full">
                        New
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-red-600/80 text-white text-xs rounded-full">
                        Sale
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">{categories.find(c => c.id === product.category)?.icon}</span>
                      <span className="text-xs text-gray-400 capitalize">{product.category}</span>
                    </div>
                    <h3 className="text-white font-bold mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                          }`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-pink-400">${product.price}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm hover:scale-105 transition-all">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">{categories.find(c => c.id === product.category)?.icon}</span>
                        <span className="text-xs text-gray-400 capitalize">{product.category}</span>
                        {product.isNew && (
                          <span className="px-2 py-0.5 bg-green-600/20 text-green-300 text-xs rounded-full">New</span>
                        )}
                      </div>
                      <h3 className="text-white font-bold">{product.name}</h3>
                      <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                            }`}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-2xl font-bold text-pink-400">${product.price}</span>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all whitespace-nowrap">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Featured Categories */}
      <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.filter(c => c.id !== 'all').map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-4xl mb-2 group-hover:scale-110 transition-all group-hover:bg-white/20">
                {category.icon}
              </div>
              <p className="text-white font-medium">{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Products Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajidsyed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}