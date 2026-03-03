import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock users database (in production, this would be a real database)
let users = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@example.com',
    password: 'password123', // In production, this would be hashed
    role: 'super_admin',
    status: 'active',
    avatar: '',
    phone: '+1 (234) 567-890',
    address: '123 Education Street, New York, NY 10001',
    orders: 45,
    spent: 12500,
    joined: '2023-01-15T10:30:00Z',
    lastLogin: '2024-03-15T10:30:00Z',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    password: 'password123',
    role: 'admin',
    status: 'active',
    avatar: '',
    phone: '+1 (234) 567-891',
    address: '456 Oak Avenue, Los Angeles, CA 90001',
    orders: 23,
    spent: 5600,
    joined: '2023-03-20T14:20:00Z',
    lastLogin: '2024-03-14T14:20:00Z',
    createdAt: '2023-03-20T14:20:00Z',
    updatedAt: '2024-03-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    password: 'password123',
    role: 'user',
    status: 'active',
    avatar: '',
    phone: '+1 (234) 567-892',
    address: '789 Pine Street, Chicago, IL 60601',
    orders: 12,
    spent: 2300,
    joined: '2023-06-10T09:15:00Z',
    lastLogin: '2024-02-28T09:15:00Z',
    createdAt: '2023-06-10T09:15:00Z',
    updatedAt: '2024-02-28T09:15:00Z'
  },
  {
    id: '4',
    name: 'Omar Hassan',
    email: 'omar.h@example.com',
    password: 'password123',
    role: 'user',
    status: 'inactive',
    avatar: '',
    phone: '+1 (234) 567-893',
    address: '321 Maple Drive, Houston, TX 77001',
    orders: 3,
    spent: 450,
    joined: '2023-09-05T11:45:00Z',
    lastLogin: '2024-01-15T11:45:00Z',
    createdAt: '2023-09-05T11:45:00Z',
    updatedAt: '2024-01-15T11:45:00Z'
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    password: 'password123',
    role: 'user',
    status: 'active',
    avatar: '',
    phone: '+1 (234) 567-894',
    address: '654 Cedar Road, Miami, FL 33101',
    orders: 8,
    spent: 1200,
    joined: '2023-11-12T16:30:00Z',
    lastLogin: '2024-02-29T16:30:00Z',
    createdAt: '2023-11-12T16:30:00Z',
    updatedAt: '2024-02-29T16:30:00Z'
  },
  {
    id: '6',
    name: 'Mike Wilson',
    email: 'mike.w@example.com',
    password: 'password123',
    role: 'admin',
    status: 'active',
    avatar: '',
    phone: '+1 (234) 567-895',
    address: '987 Birch Lane, Seattle, WA 98101',
    orders: 34,
    spent: 8900,
    joined: '2023-02-08T13:20:00Z',
    lastLogin: '2024-03-13T13:20:00Z',
    createdAt: '2023-02-08T13:20:00Z',
    updatedAt: '2024-03-13T13:20:00Z'
  },
  {
    id: '7',
    name: 'Aisha Rahman',
    email: 'aisha.r@example.com',
    password: 'password123',
    role: 'user',
    status: 'suspended',
    avatar: '',
    phone: '+1 (234) 567-896',
    address: '147 Spruce Court, Denver, CO 80201',
    orders: 1,
    spent: 99,
    joined: '2024-01-20T08:45:00Z',
    lastLogin: '2024-02-10T08:45:00Z',
    createdAt: '2024-01-20T08:45:00Z',
    updatedAt: '2024-02-10T08:45:00Z'
  },
  {
    id: '8',
    name: 'John Smith',
    email: 'john.smith@example.com',
    password: 'password123',
    role: 'user',
    status: 'active',
    avatar: '',
    phone: '+1 (234) 567-897',
    address: '258 Willow Way, Boston, MA 02101',
    orders: 5,
    spent: 780,
    joined: '2023-12-01T10:00:00Z',
    lastLogin: '2024-02-25T10:00:00Z',
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z'
  }
]

// GET /api/users - Get all users (with optional filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'joined'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    // Filter users
    let filteredUsers = users.map(user => {
      // Remove password from response
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    if (role) {
      filteredUsers = filteredUsers.filter(u => u.role === role)
    }

    if (status) {
      filteredUsers = filteredUsers.filter(u => u.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredUsers = filteredUsers.filter(u => 
        u.name.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        (u.phone && u.phone.includes(search))
      )
    }

    // Sort users
    filteredUsers.sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1
      }
    })

    // Pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // Calculate stats
    const stats = {
      total: filteredUsers.length,
      active: filteredUsers.filter(u => u.status === 'active').length,
      inactive: filteredUsers.filter(u => u.status === 'inactive').length,
      suspended: filteredUsers.filter(u => u.status === 'suspended').length,
      admins: filteredUsers.filter(u => u.role === 'admin' || u.role === 'super_admin').length,
      users: filteredUsers.filter(u => u.role === 'user').length,
      totalSpent: filteredUsers.reduce((sum, u) => sum + (u.spent || 0), 0),
      totalOrders: filteredUsers.reduce((sum, u) => sum + (u.orders || 0), 0)
    }

    return NextResponse.json({
      success: true,
      users: paginatedUsers,
      stats,
      pagination: {
        page,
        pageSize,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / pageSize)
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/users/[id] - Get single user
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const user = users.find(u => u.id === id)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, email, password, role, status, 
      phone, address 
    } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password, // In production, hash this
      role: role || 'user',
      status: status || 'active',
      avatar: '',
      phone: phone || '',
      address: address || '',
      orders: 0,
      spent: 0,
      joined: new Date().toISOString(),
      lastLogin: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock database
    users.push(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'User created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/users - Update a user
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Find user
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check email uniqueness if updating
    if (updates.email && updates.email !== users[userIndex].email) {
      const existingUser = users.find(u => u.email === updates.email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    users[userIndex] = updatedUser

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'User updated successfully'
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/users - Delete a user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Find user
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Don't allow deleting the last super_admin
    if (users[userIndex].role === 'super_admin') {
      const superAdmins = users.filter(u => u.role === 'super_admin')
      if (superAdmins.length === 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last super administrator' },
          { status: 400 }
        )
      }
    }

    // Remove user
    users.splice(userIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/users - Bulk update users
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { userIds, status, role } = body

    if (!userIds || !userIds.length) {
      return NextResponse.json(
        { error: 'User IDs are required' },
        { status: 400 }
      )
    }

    // Update multiple users
    const updates: any = {}
    if (status) updates.status = status
    if (role) updates.role = role

    const updatedUsers = users.map(user => {
      if (userIds.includes(user.id)) {
        return {
          ...user,
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
      return user
    })

    users = updatedUsers as typeof users

    return NextResponse.json({
      success: true,
      message: `${userIds.length} users updated successfully`
    })
  } catch (error) {
    console.error('Error bulk updating users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/users/login - User login (separate from auth route)
export async function POST_LOGIN(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 403 }
      )
    }

    // Update last login
    user.lastLogin = new Date().toISOString()

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('session', JSON.stringify({ userId: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/users/register - User registration
export async function POST_REGISTER(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, phone, address } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password, // In production, hash this
      role: 'user',
      status: 'active',
      avatar: '',
      phone: phone || '',
      address: address || '',
      orders: 0,
      spent: 0,
      joined: new Date().toISOString(),
      lastLogin: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    users.push(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Registration successful'
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/users/stats - Get user statistics
export async function GET_STATS() {
  try {
    const totalUsers = users.length
    const activeUsers = users.filter(u => u.status === 'active').length
    const inactiveUsers = users.filter(u => u.status === 'inactive').length
    const suspendedUsers = users.filter(u => u.status === 'suspended').length
    
    const admins = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length
    const regularUsers = users.filter(u => u.role === 'user').length
    
    const totalOrders = users.reduce((sum, u) => sum + (u.orders || 0), 0)
    const totalSpent = users.reduce((sum, u) => sum + (u.spent || 0), 0)
    
    const averageOrders = totalOrders / totalUsers
    const averageSpent = totalSpent / totalUsers

    // Users joined this month
    const now = new Date()
    const thisMonth = users.filter(u => {
      const joined = new Date(u.joined)
      return joined.getMonth() === now.getMonth() && joined.getFullYear() === now.getFullYear()
    }).length

    // Users joined this year
    const thisYear = users.filter(u => {
      const joined = new Date(u.joined)
      return joined.getFullYear() === now.getFullYear()
    }).length

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        suspendedUsers,
        admins,
        regularUsers,
        totalOrders,
        totalSpent,
        averageOrders: parseFloat(averageOrders.toFixed(1)),
        averageSpent: parseFloat(averageSpent.toFixed(2)),
        newThisMonth: thisMonth,
        newThisYear: thisYear
      }
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}