import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Mock user database (in production, this would be a real database)
const users = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@example.com',
    password: 'password123', // In production, this would be hashed
    role: 'super_admin',
    avatar: ''
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    avatar: ''
  }
]

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user (in production, check hashed password)
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Remove password from response
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }

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

// GET /api/auth/logout
export async function GET() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session')

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/auth/register
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // In production, hash password and save to database
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password, // In production, store hashed password
      role: 'user' as const,
      avatar: ''
    }

    // Add to mock database
    users.push(newUser)

    // Remove password from response
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    }

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

// PATCH /api/auth/verify
export async function PATCH() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    const sessionData = JSON.parse(session.value)
    const user = users.find(u => u.id === sessionData.userId)

    if (!user) {
      cookieStore.delete('session')
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // Remove password from response
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }

    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}

// DELETE /api/auth/reset-password
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // In production, send password reset email
    // For demo, just return success
    return NextResponse.json({
      success: true,
      message: 'Password reset email sent'
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}