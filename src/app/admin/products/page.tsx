'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'out_of_stock'
  image: string
  sales: number
  revenue: number
  rating: number
}

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock products data
        setProducts([
          {
            id: '1',
            name: 'IELTS Preparation Course',
            sku: 'IELTS-001',
            category: 'Courses',
            price: 299,
            stock: 999,
            status: 'active',
            image: '/images/n1.jpeg',
            sales: 234,
            revenue: 69966,
            rating: 4.8
          },
          {
            id: '2',
            name: 'University Application Guide',
            sku: 'BOOK-001',
            category: 'Books',
            price: 49,
            stock: 150,
            status: 'active',
            image: '/images/n2.jpeg',
            sales: 178,
            revenue: 8722,
            rating: 4.6
          },
          {
            id: '3',
            name: 'Visa Consultation Package',
            sku: 'SVC-001',
            category: 'Services',
            price: 599,
            stock: 50,
            status: 'active',
            image: '/images/n3.jpeg',
            sales: 156,
            revenue: 93444,
            rating: 4.9
          },
          {
            id: '4',
            name: 'TOEFL Practice Tests',
            sku: 'TEST-001',
            category: 'Tests',
            price: 89,
            stock: 500,
            status: 'active',
            image: '/images/n4.jpeg',
            sales: 145,
            revenue: 12905,
            rating: 4.7
          },
          {
            id: '5',
            name: 'Statement of Purpose Writing',
            sku: 'SVC-002',
            category: 'Services',
            price: 199,
            stock: 999,
            status: 'active',
            image: '/images/n5.jpeg',
            sales: 187,
            revenue: 37213,
            rating: 4.9
          },
          {
            id: '6',
            name: 'Study Abroad Starter Kit',
            sku: 'KIT-001',
            category: 'Kits',
            price: 149,
            stock: 300,
            status: 'active',
            image: '/images/n6.jpeg',
            sales: 98,
            revenue: 14602,
            rating: 4.8
          },
          {
            id: '7',
            name: 'GRE Preparation Course',
            sku: 'GRE-001',
            category: 'Courses',
            price: 349,
            stock: 0,
            status: 'out_of_stock',
            image: '/images/n1.jpeg',
            sales: 67,
            revenue: 23383,
            rating: 4.7
          },
          {
            id: '8',
            name: 'Scholarship Guide Book',
            sku: 'BOOK-002',
            category: 'Books',
            price: 39,
            stock: 45,
            status: 'draft',
            image: '/images/n2.jpeg',
            sales: 0,
            revenue: 0,
            rating: 0
          }
        ])
      } catch (error) {
        console.log('Error loading products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(p => p.category))]

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'out_of_stock':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock > 100) return 'text-green-400'
    if (stock > 10) return 'text-yellow-400'
    if (stock > 0) return 'text-orange-400'
    return 'text-red-400'
  }

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
    draft: products.filter(p => p.status === 'draft').length,
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    totalSales: products.reduce((sum, p) => sum + p.sales, 0)
  }

  const handleDelete = (id: string) => {
    setSelectedProductId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedProductId) {
      setProducts(products.filter(p => p.id !== selectedProductId))
      setShowDeleteModal(false)
      setSelectedProductId(null)
    }
  }

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
    <div className="space-y-6">
      <Bismillah />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Products{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-gray-400">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/addproduct"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Products</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Active</p>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Draft</p>
          <p className="text-2xl font-bold text-white">{stats.draft}</p>
        </div>
        <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Out of Stock</p>
          <p className="text-2xl font-bold text-white">{stats.outOfStock}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Sales</p>
          <p className="text-2xl font-bold text-white">{stats.totalSales}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 py-3 text-left text-gray-400">Product</th>
                <th className="px-4 py-3 text-left text-gray-400">SKU</th>
                <th className="px-4 py-3 text-left text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-gray-400">Price</th>
                <th className="px-4 py-3 text-left text-gray-400">Stock</th>
                <th className="px-4 py-3 text-left text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-gray-400">Sales</th>
                <th className="px-4 py-3 text-left text-gray-400">Revenue</th>
                <th className="px-4 py-3 text-left text-gray-400">Rating</th>
                <th className="px-4 py-3 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{product.sku}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-bold">${product.price}</td>
                  <td className="px-4 py-3">
                    <span className={getStockStatus(product.stock)}>
                      {product.stock > 0 ? product.stock : 'Out'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(product.status)}`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{product.sales}</td>
                  <td className="px-4 py-3 text-white">${product.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {product.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white">{product.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                      >
                        👁️
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Bulk Actions:</span>
          <button className="px-3 py-1 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30">
            Publish Selected
          </button>
          <button className="px-3 py-1 bg-yellow-600/20 text-yellow-300 rounded-lg hover:bg-yellow-600/30">
            Move to Draft
          </button>
          <button className="px-3 py-1 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30">
            Delete Selected
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
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
          <p className="text-sm text-gray-400">Products Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}