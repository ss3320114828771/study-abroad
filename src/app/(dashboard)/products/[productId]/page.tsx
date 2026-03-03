'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Bismillah from '@/components/ui/bismilliah'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  description: string
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  stockQuantity: number
  rating: number
  reviews: number
  seller: {
    name: string
    rating: number
    products: number
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.productId as string
  
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

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
            images: ['/images/n1.jpeg', '/images/n2.jpeg', '/images/n3.jpeg'],
            category: 'Courses',
            description: 'Comprehensive IELTS preparation course with practice tests and expert guidance. This course covers all four modules: Listening, Reading, Writing, and Speaking. Includes 20+ hours of video content, practice tests, and personalized feedback.',
            features: [
              '20+ hours of video lessons',
              '10 full-length practice tests',
              'Personalized feedback on writing',
              'Speaking practice with AI',
              'Mobile app access',
              'Certificate of completion'
            ],
            specifications: {
              'Duration': '8 weeks',
              'Access': 'Lifetime',
              'Level': 'Beginner to Advanced',
              'Language': 'English',
              'Format': 'Video + PDF',
              'Instructor': 'Dr. Sarah Ahmed'
            },
            inStock: true,
            stockQuantity: 999,
            rating: 4.8,
            reviews: 234,
            seller: {
              name: 'StudyAbroad Academy',
              rating: 4.9,
              products: 45
            }
          },
          '2': {
            id: '2',
            name: 'University Application Guide',
            price: 49,
            image: '/images/n2.jpeg',
            images: ['/images/n2.jpeg', '/images/n3.jpeg', '/images/n4.jpeg'],
            category: 'Books',
            description: 'Step-by-step guide to applying for universities abroad. Includes tips for personal statements, recommendation letters, and interview preparation.',
            features: [
              '100+ university profiles',
              'Sample personal statements',
              'Interview tips and tricks',
              'Scholarship guide',
              'Visa application help',
              'Checklist templates'
            ],
            specifications: {
              'Pages': '250',
              'Format': 'PDF + Paperback',
              'Language': 'English',
              'Updated': '2024',
              'Author': 'Prof. John Smith',
              'Publisher': 'Global Education Press'
            },
            inStock: true,
            stockQuantity: 150,
            rating: 4.6,
            reviews: 178,
            seller: {
              name: 'Education Books',
              rating: 4.7,
              products: 89
            }
          },
          '3': {
            id: '3',
            name: 'Visa Consultation Package',
            price: 599,
            originalPrice: 799,
            image: '/images/n3.jpeg',
            images: ['/images/n3.jpeg', '/images/n4.jpeg', '/images/n5.jpeg'],
            category: 'Services',
            description: 'Complete visa consultation and application assistance. Our experts guide you through the entire visa process for your chosen country.',
            features: [
              '1-on-1 consultation',
              'Document review',
              'Application assistance',
              'Interview preparation',
              'Follow-up support',
              'Guaranteed response'
            ],
            specifications: {
              'Duration': 'Until visa decision',
              'Sessions': 'Unlimited',
              'Countries': 'USA, UK, Canada, Australia',
              'Support': 'Email + Phone',
              'Response time': '24 hours',
              'Success rate': '95%'
            },
            inStock: true,
            stockQuantity: 50,
            rating: 4.9,
            reviews: 312,
            seller: {
              name: 'Visa Experts',
              rating: 4.9,
              products: 12
            }
          },
          '4': {
            id: '4',
            name: 'TOEFL Practice Tests',
            price: 89,
            image: '/images/n4.jpeg',
            images: ['/images/n4.jpeg', '/images/n5.jpeg', '/images/n6.jpeg'],
            category: 'Courses',
            description: 'Full-length TOEFL practice tests with scoring and feedback. Simulate real test conditions and track your progress.',
            features: [
              '10 full tests',
              'Section-wise scoring',
              'Detailed explanations',
              'Progress tracking',
              'Mobile friendly',
              'Instant results'
            ],
            specifications: {
              'Tests': '10',
              'Questions': '500+',
              'Access': '6 months',
              'Format': 'Online',
              'Difficulty': 'Adaptive',
              'Updates': 'Monthly'
            },
            inStock: true,
            stockQuantity: 500,
            rating: 4.7,
            reviews: 156,
            seller: {
              name: 'Test Prep Pro',
              rating: 4.8,
              products: 23
            }
          },
          '5': {
            id: '5',
            name: 'Statement of Purpose Writing',
            price: 199,
            image: '/images/n5.jpeg',
            images: ['/images/n5.jpeg', '/images/n6.jpeg', '/images/n1.jpeg'],
            category: 'Services',
            description: 'Professional SOP writing and editing service. Our expert writers help you craft a compelling statement that stands out.',
            features: [
              'Personal consultation',
              'Unlimited revisions',
              'Native editors',
              'Plagiarism check',
              'Formatting help',
              'Fast delivery'
            ],
            specifications: {
              'Turnaround': '3-5 days',
              'Revisions': 'Unlimited',
              'Editors': 'Native English',
              'Format': 'Word + PDF',
              'Pages': '1-2 pages',
              'Guarantee': '100% satisfaction'
            },
            inStock: true,
            stockQuantity: 999,
            rating: 4.9,
            reviews: 445,
            seller: {
              name: 'SOP Writers',
              rating: 4.9,
              products: 8
            }
          },
          '6': {
            id: '6',
            name: 'Study Abroad Starter Kit',
            price: 149,
            originalPrice: 199,
            image: '/images/n6.jpeg',
            images: ['/images/n6.jpeg', '/images/n1.jpeg', '/images/n2.jpeg'],
            category: 'Kits',
            description: 'Complete starter kit with guides, checklists, and resources for your study abroad journey.',
            features: [
              'Country guides (10 countries)',
              'University directory',
              'Scholarship database',
              'Checklist templates',
              'Budget planner',
              'Packing list'
            ],
            specifications: {
              'Guides': '10 countries',
              'Universities': '500+',
              'Scholarships': '1000+',
              'Format': 'Digital',
              'Updates': '1 year',
              'Bonus': 'Webinars access'
            },
            inStock: true,
            stockQuantity: 300,
            rating: 4.8,
            reviews: 267,
            seller: {
              name: 'Starter Kits Co',
              rating: 4.8,
              products: 15
            }
          }
        }

        const foundProduct = mockProducts[productId] || mockProducts['1']
        setProduct(foundProduct)
        
        // Load related products
        const related = Object.values(mockProducts)
          .filter(p => p.id !== productId && p.category === foundProduct.category)
          .slice(0, 4)
        setRelatedProducts(related)
      } catch (error) {
        console.log('Error loading product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  const addToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const buyNow = () => {
    router.push(`/dashboard/products/${productId}/order`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading product details...</p>
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
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
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
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>›</span>
        <Link href="/products" className="hover:text-white">Products</Link>
        <span>›</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-white">{product.category}</Link>
        <span>›</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Product Main Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-white/20 overflow-hidden">
            <img 
              src={product.images?.[selectedImage] || product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-pink-500 scale-105' : 'border-white/20'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Stock */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
              {product.category}
            </span>
            {product.inStock ? (
              <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm border border-green-500/30">
                In Stock ({product.stockQuantity})
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm border border-red-500/30">
                Out of Stock
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xl ${
                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                }`}>★</span>
              ))}
              <span className="text-white ml-2">{product.rating}</span>
            </div>
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-pink-400">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded-full text-sm">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Features List */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Key Features:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div>
              <label className="block text-gray-400 mb-2">Quantity</label>
              <div className="flex items-center gap-2 w-32">
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

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all font-bold flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                Buy Now
              </button>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sold by</p>
                <p className="text-white font-medium">{product.seller.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Seller Rating</p>
                <p className="text-yellow-400">{product.seller.rating} ★</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-white/10">
          {['description', 'features', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-pink-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Product Description</h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
              <p className="text-gray-300 leading-relaxed">
                This comprehensive {product.category.toLowerCase()} is designed to help you achieve your study abroad goals. 
                Whether you're just starting your journey or looking to enhance your application, this product provides 
                all the tools and resources you need.
              </p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">All Features</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <span className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
                <button className="px-4 py-2 bg-pink-600/20 text-pink-300 rounded-lg hover:bg-pink-600/30">
                  Write a Review
                </button>
              </div>
              
              {/* Average Rating */}
              <div className="flex items-center gap-6 p-4 bg-white/5 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{product.rating}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                      }`}>★</span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{product.reviews} reviews</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 w-8">{star} ★</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-8">
                        {star === 5 ? '70%' : star === 4 ? '20%' : '5%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center text-white">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div>
                          <p className="text-white font-medium">Student {i}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <span key={j} className={j < 5 ? 'text-yellow-400' : 'text-gray-600'}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-gray-300">
                      Excellent product! Really helped me with my application process. Highly recommended!
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Related Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <Link 
                key={related.id}
                href={`/dashboard/products/${related.id}`}
                className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:scale-105 transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={related.image} alt={related.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-1 truncate">{related.name}</h3>
                  <p className="text-pink-400 font-bold">${related.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Product Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajidsyed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}