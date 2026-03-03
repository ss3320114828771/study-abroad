import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock orders database (in production, this would be a real database)
let orders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      id: '1',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@example.com'
    },
    items: [
      {
        id: '1',
        name: 'IELTS Preparation Course',
        quantity: 1,
        price: 299,
        total: 299
      }
    ],
    subtotal: 299,
    tax: 29.9,
    shipping: 5.99,
    discount: 0,
    total: 334.89,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      id: '2',
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com'
    },
    items: [
      {
        id: '3',
        name: 'Visa Consultation Package',
        quantity: 1,
        price: 599,
        total: 599
      }
    ],
    subtotal: 599,
    tax: 59.9,
    shipping: 0,
    discount: 0,
    total: 658.9,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    createdAt: '2024-03-14T14:20:00Z',
    updatedAt: '2024-03-14T14:20:00Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      id: '3',
      name: 'Omar Hassan',
      email: 'omar.h@example.com'
    },
    items: [
      {
        id: '6',
        name: 'Study Abroad Starter Kit',
        quantity: 1,
        price: 149,
        total: 149
      }
    ],
    subtotal: 149,
    tax: 14.9,
    shipping: 5.99,
    discount: 0,
    total: 169.89,
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: 'bank',
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    createdAt: '2024-03-14T09:15:00Z',
    updatedAt: '2024-03-14T09:15:00Z'
  }
]

// GET /api/orders - Get all orders (with optional filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const customerId = searchParams.get('customerId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = searchParams.get('limit')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    // Filter orders
    let filteredOrders = [...orders]

    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status)
    }

    if (customerId) {
      filteredOrders = filteredOrders.filter(o => o.customer.id === customerId)
    }

    if (startDate) {
      filteredOrders = filteredOrders.filter(o => o.createdAt >= startDate)
    }

    if (endDate) {
      filteredOrders = filteredOrders.filter(o => o.createdAt <= endDate)
    }

    // Sort by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    // Calculate stats
    const stats = {
      total: filteredOrders.length,
      totalRevenue: filteredOrders.reduce((sum, o) => sum + o.total, 0),
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      processing: filteredOrders.filter(o => o.status === 'processing').length,
      shipped: filteredOrders.filter(o => o.status === 'shipped').length,
      delivered: filteredOrders.filter(o => o.status === 'delivered').length,
      cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
      paid: filteredOrders.filter(o => o.paymentStatus === 'paid').length,
      unpaid: filteredOrders.filter(o => o.paymentStatus === 'unpaid').length,
      refunded: filteredOrders.filter(o => o.paymentStatus === 'refunded').length
    }

    return NextResponse.json({
      success: true,
      orders: paginatedOrders,
      stats,
      pagination: {
        page,
        pageSize,
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / pageSize)
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer, items, shippingAddress, paymentMethod, notes } = body

    // Validate required fields
    if (!customer || !items || !items.length || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.1 // 10% tax
    const shipping = subtotal > 100 ? 0 : 5.99 // Free shipping over $100
    const total = subtotal + tax + shipping

    // Generate order number
    const orderCount = orders.length + 1
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount).padStart(3, '0')}`

    // Create new order
    const newOrder = {
      id: String(orders.length + 1),
      orderNumber,
      customer,
      items,
      subtotal,
      tax,
      shipping,
      discount: 0,
      total,
      status: 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'unpaid' : 'paid',
      paymentMethod,
      shippingAddress,
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock database
    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/orders - Update order status
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { orderId, status, paymentStatus, trackingNumber } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Find order
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update order
    const updatedOrder = {
      ...orders[orderIndex],
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...(trackingNumber && { trackingNumber }),
      updatedAt: new Date().toISOString()
    }

    orders[orderIndex] = updatedOrder

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Order updated successfully'
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/orders - Delete an order
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Find order
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Remove order
    orders.splice(orderIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/orders - Bulk update orders
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { orderIds, status } = body

    if (!orderIds || !orderIds.length || !status) {
      return NextResponse.json(
        { error: 'Order IDs and status are required' },
        { status: 400 }
      )
    }

    // Update multiple orders
    const updatedOrders = orders.map(order => {
      if (orderIds.includes(order.id)) {
        return {
          ...order,
          status,
          updatedAt: new Date().toISOString()
        }
      }
      return order
    })

    orders = updatedOrders as typeof orders

    return NextResponse.json({
      success: true,
      message: `${orderIds.length} orders updated successfully`
    })
  } catch (error) {
    console.error('Error bulk updating orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}