'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Bismillah from '@/components/ui/bismilliah'

export default function AdminAddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [variants, setVariants] = useState([{ id: 1, size: '', color: '', price: '', stock: '' }])
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    sku: '',
    category: '',
    subcategory: '',
    brand: '',
    description: '',
    shortDescription: '',
    
    // Pricing
    price: '',
    salePrice: '',
    cost: '',
    taxRate: '10',
    
    // Inventory
    stock: '',
    lowStockAlert: '5',
    trackInventory: true,
    
    // Shipping
    weight: '',
    length: '',
    width: '',
    height: '',
    shippingClass: 'standard',
    
    // SEO
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    slug: '',
    
    // Status
    status: 'draft',
    featured: false,
    digital: false,
    publishedAt: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })

    // Auto-generate slug from name
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }))
    }
  }

  const handleAddVariant = () => {
    setVariants([...variants, { id: variants.length + 1, size: '', color: '', price: '', stock: '' }])
  }

  const handleVariantChange = (id: number, field: string, value: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v))
  }

  const handleRemoveVariant = (id: number) => {
    setVariants(variants.filter(v => v.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    router.push('/admin/products?success=Product created successfully')
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <Bismillah />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Add New{' '}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Product
            </span>
          </h1>
          <p className="text-gray-400">Create a new product in your store</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            Cancel
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
        <div className="flex justify-between">
          {[
            { number: 1, title: 'Basic Info', icon: '📝' },
            { number: 2, title: 'Pricing', icon: '💰' },
            { number: 3, title: 'Media', icon: '🖼️' },
            { number: 4, title: 'Variants', icon: '🔄' },
            { number: 5, title: 'Shipping', icon: '📦' },
            { number: 6, title: 'SEO', icon: '🔍' },
          ].map((step) => (
            <div key={step.number} className="flex-1 text-center relative">
              <div className={`inline-block w-10 h-10 rounded-full flex items-center justify-center mb-2 mx-auto ${
                currentStep > step.number
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : currentStep === step.number
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}>
                {currentStep > step.number ? '✓' : step.icon}
              </div>
              <p className={`text-sm hidden md:block ${
                currentStep >= step.number ? 'text-white' : 'text-gray-500'
              }`}>{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., IELTS Preparation Course"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., IELTS-001"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select Category</option>
                  <option value="courses">Courses</option>
                  <option value="books">Books</option>
                  <option value="services">Services</option>
                  <option value="kits">Starter Kits</option>
                  <option value="tests">Practice Tests</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., IELTS, TOEFL"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., StudyAbroad"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Short Description</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Brief description for product cards"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Full Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Detailed product description..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pricing & Inventory */}
        {currentStep === 2 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Pricing & Inventory</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Regular Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Sale Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Cost Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Low Stock Alert</label>
                <input
                  type="number"
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="md:col-span-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="trackInventory"
                    checked={formData.trackInventory}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-white/10 border border-white/20 rounded"
                  />
                  <span className="text-white">Track inventory for this product</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Media */}
        {currentStep === 3 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product Images</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square bg-white/5 rounded-lg overflow-hidden group">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-600/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm"
                  >
                    ✕
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-purple-600/80 text-white text-xs rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}
              
              <label className="aspect-square bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-3xl text-gray-400 mb-1">+</span>
                <span className="text-xs text-gray-400 text-center">Upload Image</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <p className="text-sm text-gray-400">
              Upload up to 10 images. First image will be used as cover. Supported formats: JPG, PNG, GIF. Max size: 2MB each.
            </p>
          </div>
        )}

        {/* Step 4: Variants */}
        {currentStep === 4 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Product Variants</h2>
              <button
                type="button"
                onClick={handleAddVariant}
                className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors"
              >
                + Add Variant
              </button>
            </div>

            {variants.map((variant, index) => (
              <div key={variant.id} className="grid md:grid-cols-5 gap-4 mb-4 p-4 bg-white/5 rounded-lg relative">
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Size</label>
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                    placeholder="M, L, XL"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Color</label>
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                    placeholder="Red, Blue"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Price</label>
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Stock</label>
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                    placeholder="50"
                  />
                </div>
                <div className="flex items-end">
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(variant.id)}
                      className="px-3 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 text-sm w-full"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <p className="text-sm text-gray-400 mt-2">
              Add variants for different sizes, colors, or options. Leave empty if product has no variants.
            </p>
          </div>
        )}

        {/* Step 5: Shipping */}
        {currentStep === 5 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Shipping Details</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="0.5"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Length (cm)</label>
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Width (cm)</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="15"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Shipping Class</label>
                <select
                  name="shippingClass"
                  value={formData.shippingClass}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="standard">Standard Shipping</option>
                  <option value="express">Express Shipping</option>
                  <option value="overnight">Overnight Shipping</option>
                  <option value="freight">Freight Shipping</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: SEO & Publishing */}
        {currentStep === 6 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">SEO & Publishing</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="SEO title (50-60 characters)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="SEO description (150-160 characters)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Meta Keywords</label>
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="ielts, toefl, study abroad, education"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="product-url-slug"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Publish Date</label>
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    value={formData.publishedAt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-white/10 border border-white/20 rounded"
                  />
                  <span className="text-white">Feature this product on homepage</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="digital"
                    checked={formData.digital}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-white/10 border border-white/20 rounded"
                  />
                  <span className="text-white">This is a digital product</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg transition-all ${
              currentStep === 1
                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ← Previous
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Product...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Create Product
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl border border-white/20">
          <p className="text-sm text-gray-400">Product Added By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}