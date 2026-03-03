import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock products database (in production, this would be a real database)
let products = [
  {
    id: '1',
    name: 'IELTS Preparation Course',
    sku: 'IELTS-001',
    category: 'Courses',
    price: 299,
    cost: 150,
    stock: 999,
    status: 'active',
    image: '/images/n1.jpeg',
    description: 'Comprehensive IELTS preparation course with practice tests and expert guidance.',
    features: ['20+ hours of video', '10 practice tests', 'Personalized feedback'],
    sales: 234,
    revenue: 69966,
    rating: 4.8,
    reviews: 234,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'University Application Guide',
    sku: 'BOOK-001',
    category: 'Books',
    price: 49,
    cost: 20,
    stock: 150,
    status: 'active',
    image: '/images/n2.jpeg',
    description: 'Step-by-step guide to applying for universities abroad.',
    features: ['100+ university profiles', 'Sample essays', 'Interview tips'],
    sales: 178,
    revenue: 8722,
    rating: 4.6,
    reviews: 178,
    createdAt: '2024-01-20T14:20:00Z',
    updatedAt: '2024-03-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Visa Consultation Package',
    sku: 'SVC-001',
    category: 'Services',
    price: 599,
    cost: 300,
    stock: 50,
    status: 'active',
    image: '/images/n3.jpeg',
    description: 'Complete visa consultation and application assistance.',
    features: ['1-on-1 consultation', 'Document review', 'Interview prep'],
    sales: 156,
    revenue: 93444,
    rating: 4.9,
    reviews: 312,
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-03-13T09:15:00Z'
  },
  {
    id: '4',
    name: 'TOEFL Practice Tests',
    sku: 'TEST-001',
    category: 'Tests',
    price: 89,
    cost: 40,
    stock: 500,
    status: 'active',
    image: '/images/n4.jpeg',
    description: 'Full-length TOEFL practice tests with scoring and feedback.',
    features: ['10 full tests', 'Section-wise scoring', 'Progress tracking'],
    sales: 145,
    revenue: 12905,
    rating: 4.7,
    reviews: 156,
    createdAt: '2024-02-01T11:45:00Z',
    updatedAt: '2024-03-12T11:45:00Z'
  },
  {
    id: '5',
    name: 'Statement of Purpose Writing',
    sku: 'SVC-002',
    category: 'Services',
    price: 199,
    cost: 100,
    stock: 999,
    status: 'active',
    image: '/images/n5.jpeg',
    description: 'Professional SOP writing and editing service.',
    features: ['Personal consultation', 'Unlimited revisions', 'Native editors'],
    sales: 187,
    revenue: 37213,
    rating: 4.9,
    reviews: 445,
    createdAt: '2024-02-05T13:20:00Z',
    updatedAt: '2024-03-11T13:20:00Z'
  },
  {
    id: '6',
    name: 'Study Abroad Starter Kit',
    sku: 'KIT-001',
    category: 'Kits',
    price: 149,
    cost: 70,
    stock: 300,
    status: 'active',
    image: '/images/n6.jpeg',
    description: 'Complete starter kit with guides, checklists, and resources.',
    features: ['Country guides', 'University directory', 'Scholarship database'],
    sales: 98,
    revenue: 14602,
    rating: 4.8,
    reviews: 267,
    createdAt: '2024-02-10T16:30:00Z',
    updatedAt: '2024-03-10T16:30:00Z'
  },
  {
    id: '7',
    name: 'GRE Preparation Course',
    sku: 'GRE-001',
    category: 'Courses',
    price: 349,
    cost: 175,
    stock: 0,
    status: 'out_of_stock',
    image: '/images/n1.jpeg',
    description: 'Comprehensive GRE preparation with practice tests.',
    features: ['30+ hours of video', 'Full-length tests', 'Score analysis'],
    sales: 67,
    revenue: 23383,
    rating: 4.7,
    reviews: 89,
    createdAt: '2024-02-15T08:45:00Z',
    updatedAt: '2024-03-09T08:45:00Z'
  },
  {
    id: '8',
    name: 'Scholarship Guide Book',
    sku: 'BOOK-002',
    category: 'Books',
    price: 39,
    cost: 15,
    stock: 45,
    status: 'draft',
    image: '/images/n2.jpeg',
    description: 'Complete guide to finding and applying for scholarships.',
    features: ['1000+ scholarships', 'Application tips', 'Deadline tracker'],
    sales: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  }
]

// GET /api/products - Get all products (with optional filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const inStock = searchParams.get('inStock')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '100')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    // Filter products
    let filteredProducts = [...products]

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }

    if (status) {
      filteredProducts = filteredProducts.filter(p => p.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice))
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice))
    }

    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.stock > 0)
    }

    // Sort products
    filteredProducts.sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1
      }
    })

    // Pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    // Calculate stats
    const stats = {
      total: filteredProducts.length,
      totalValue: filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0),
      totalRevenue: filteredProducts.reduce((sum, p) => sum + p.revenue, 0),
      totalSales: filteredProducts.reduce((sum, p) => sum + p.sales, 0),
      active: filteredProducts.filter(p => p.status === 'active').length,
      draft: filteredProducts.filter(p => p.status === 'draft').length,
      outOfStock: filteredProducts.filter(p => p.status === 'out_of_stock').length,
      categories: [...new Set(filteredProducts.map(p => p.category))].length
    }

    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      stats,
      pagination: {
        page,
        pageSize,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / pageSize)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/products/[id] - Get single product
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const product = products.find(p => p.id === id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, sku, category, price, cost, stock, 
      description, features, image, status 
    } = body

    // Validate required fields
    if (!name || !sku || !category || !price || !stock) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if SKU already exists
    const existingProduct = products.find(p => p.sku === sku)
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 409 }
      )
    }

    // Create new product
    const newProduct = {
      id: String(products.length + 1),
      name,
      sku,
      category,
      price: parseFloat(price),
      cost: cost ? parseFloat(cost) : 0,
      stock: parseInt(stock),
      status: status || 'draft',
      image: image || '/images/placeholder.jpg',
      description: description || '',
      features: features || [],
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock database
    products.push(newProduct)

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: 'Product created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/products - Update a product
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Find product
    const productIndex = products.findIndex(p => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check SKU uniqueness if updating
    if (updates.sku && updates.sku !== products[productIndex].sku) {
      const existingProduct = products.find(p => p.sku === updates.sku)
      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this SKU already exists' },
          { status: 409 }
        )
      }
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      ...updates,
      price: updates.price ? parseFloat(updates.price) : products[productIndex].price,
      cost: updates.cost ? parseFloat(updates.cost) : products[productIndex].cost,
      stock: updates.stock ? parseInt(updates.stock) : products[productIndex].stock,
      updatedAt: new Date().toISOString()
    }

    products[productIndex] = updatedProduct

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: 'Product updated successfully'
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/products - Delete a product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Find product
    const productIndex = products.findIndex(p => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Remove product
    products.splice(productIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/products - Bulk update products
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { productIds, status, price, category } = body

    if (!productIds || !productIds.length) {
      return NextResponse.json(
        { error: 'Product IDs are required' },
        { status: 400 }
      )
    }

    // Update multiple products
    const updates: any = {}
    if (status) updates.status = status
    if (price) updates.price = parseFloat(price)
    if (category) updates.category = category

    const updatedProducts = products.map(product => {
      if (productIds.includes(product.id)) {
        return {
          ...product,
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
      return product
    })

    products = updatedProducts as typeof products

    return NextResponse.json({
      success: true,
      message: `${productIds.length} products updated successfully`
    })
  } catch (error) {
    console.error('Error bulk updating products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/products/categories - Get all categories
export async function GET_CATEGORIES() {
  try {
    const categories = [...new Set(products.map(p => p.category))]
    
    const categoryStats = categories.map(category => {
      const categoryProducts = products.filter(p => p.category === category)
      return {
        name: category,
        count: categoryProducts.length,
        revenue: categoryProducts.reduce((sum, p) => sum + p.revenue, 0),
        sales: categoryProducts.reduce((sum, p) => sum + p.sales, 0)
      }
    })

    return NextResponse.json({
      success: true,
      categories: categoryStats
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/products/stats - Get product statistics
export async function GET_STATS() {
  try {
    const totalProducts = products.length
    const activeProducts = products.filter(p => p.status === 'active').length
    const outOfStock = products.filter(p => p.stock === 0).length
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length
    
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0)
    const totalSales = products.reduce((sum, p) => sum + p.sales, 0)
    
    const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length

    const topProduct = products.reduce((max, p) => p.sales > max.sales ? p : max, products[0])
    const worstProduct = products.reduce((min, p) => p.sales < min.sales ? p : min, products[0])

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        outOfStock,
        lowStock,
        totalValue,
        totalRevenue,
        totalSales,
        averageRating: parseFloat(averageRating.toFixed(1)),
        topProduct: {
          id: topProduct.id,
          name: topProduct.name,
          sales: topProduct.sales,
          revenue: topProduct.revenue
        },
        worstProduct: {
          id: worstProduct.id,
          name: worstProduct.name,
          sales: worstProduct.sales,
          revenue: worstProduct.revenue
        }
      }
    })
  } catch (error) {
    console.error('Error fetching product stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}