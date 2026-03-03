// User role types
export type UserRole = 'user' | 'admin' | 'super_admin'

// User status types
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

// User gender types
export type UserGender = 'male' | 'female' | 'other' | 'prefer_not_to_say'

// User preference interface
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  currency: string
  timezone: string
  dateFormat: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    orderUpdates: boolean
    promotions: boolean
    newsletter: boolean
  }
  privacy: {
    showEmail: boolean
    showPhone: boolean
    showLocation: boolean
    allowMessages: boolean
    allowFriendRequests: boolean
  }
}

// User address interface
export interface UserAddress {
  id: string
  type: 'home' | 'work' | 'shipping' | 'billing' | 'other'
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  instructions?: string
  createdAt: string
  updatedAt: string
}

// User payment method interface
export interface UserPaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank'
  isDefault: boolean
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  email?: string
  bankName?: string
  accountLast4?: string
  createdAt: string
  updatedAt: string
}

// User social profile interface
export interface UserSocialProfile {
  provider: 'google' | 'facebook' | 'twitter' | 'github' | 'linkedin'
  providerId: string
  profileUrl?: string
  avatar?: string
  connectedAt: string
}

// User activity interface
export interface UserActivity {
  id: string
  type: 'login' | 'logout' | 'order' | 'review' | 'profile_update' | 'password_change'
  description: string
  ip?: string
  userAgent?: string
  location?: string
  device?: string
  browser?: string
  os?: string
  createdAt: string
}

// User order summary interface
export interface UserOrderSummary {
  id: string
  orderNumber: string
  total: number
  status: string
  items: number
  createdAt: string
}

// User wishlist interface
export interface UserWishlist {
  id: string
  productId: string
  productName: string
  productSlug: string
  productImage?: string
  productPrice: number
  addedAt: string
}

// User review interface
export interface UserReview {
  id: string
  productId: string
  productName: string
  productImage?: string
  rating: number
  title?: string
  content: string
  helpful: number
  notHelpful: number
  createdAt: string
  updatedAt: string
}

// User notification interface
export interface UserNotification {
  id: string
  type: 'order' | 'promotion' | 'system' | 'message'
  title: string
  message: string
  isRead: boolean
  actionUrl?: string
  image?: string
  createdAt: string
}

// User session interface
export interface UserSession {
  id: string
  device: string
  browser: string
  os: string
  ip: string
  location?: string
  isCurrent: boolean
  lastActive: string
  createdAt: string
}

// Main User interface
export interface User {
  id: string
  email: string
  username?: string
  password?: string // Only included when needed, never in responses
  
  // Personal info
  firstName: string
  lastName: string
  fullName: string
  displayName?: string
  avatar?: string
  phone?: string
  gender?: UserGender
  dateOfBirth?: string
  
  // Account info
  role: UserRole
  status: UserStatus
  emailVerified: boolean
  phoneVerified: boolean
  twoFactorEnabled: boolean
  
  // Preferences
  preferences: UserPreferences
  
  // Addresses
  addresses: UserAddress[]
  defaultAddress?: UserAddress
  
  // Payment methods
  paymentMethods: UserPaymentMethod[]
  defaultPaymentMethod?: UserPaymentMethod
  
  // Social profiles
  socialProfiles: UserSocialProfile[]
  
  // Statistics
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderAt?: string
  wishlist: UserWishlist[]
  
  // Activity
  lastLoginAt?: string
  lastLoginIp?: string
  loginCount: number
  activities: UserActivity[]
  
  // Metadata
  notes?: string
  tags: string[]
  referralCode?: string
  referredBy?: string
  
  // Dates
  createdAt: string
  updatedAt: string
  deletedAt?: string
  
  // Metadata
  metadata?: Record<string, any>
}

// User summary interface (for listings)
export interface UserSummary {
  id: string
  email: string
  fullName: string
  avatar?: string
  role: UserRole
  status: UserStatus
  totalOrders: number
  totalSpent: number
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

// User creation input interface
export interface CreateUserInput {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  gender?: UserGender
  dateOfBirth?: string
  role?: UserRole
  status?: UserStatus
  preferences?: Partial<UserPreferences>
  metadata?: Record<string, any>
}

// User update input interface
export interface UpdateUserInput {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  gender?: UserGender
  dateOfBirth?: string
  role?: UserRole
  status?: UserStatus
  preferences?: Partial<UserPreferences>
  metadata?: Record<string, any>
}

// User filter interface
export interface UserFilter {
  role?: UserRole | UserRole[]
  status?: UserStatus | UserStatus[]
  search?: string
  emailVerified?: boolean
  phoneVerified?: boolean
  twoFactorEnabled?: boolean
  dateFrom?: string
  dateTo?: string
  minOrders?: number
  maxOrders?: number
  minSpent?: number
  maxSpent?: number
  tags?: string[]
  sortBy?: keyof UserSummary
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// User statistics interface
export interface UserStatistics {
  total: number
  active: number
  inactive: number
  suspended: number
  pending: number
  verified: number
  unverified: number
  twoFactorEnabled: number
  byRole: Record<UserRole, number>
  byStatus: Record<UserStatus, number>
  newThisMonth: number
  newThisYear: number
  totalOrders: number
  totalSpent: number
  averageOrdersPerUser: number
  averageSpentPerUser: number
  topCustomers: Array<{
    id: string
    name: string
    email: string
    orders: number
    spent: number
  }>
  byLocation: Array<{
    country: string
    count: number
  }>
}

// User login history interface
export interface UserLoginHistory {
  id: string
  userId: string
  ip: string
  userAgent: string
  device: string
  browser: string
  os: string
  location?: string
  success: boolean
  failureReason?: string
  createdAt: string
}

// User password reset interface
export interface UserPasswordReset {
  id: string
  userId: string
  token: string
  expiresAt: string
  usedAt?: string
  createdAt: string
}

// User email verification interface
export interface UserEmailVerification {
  id: string
  userId: string
  token: string
  expiresAt: string
  verifiedAt?: string
  createdAt: string
}

// User API response interfaces
export interface UserApiResponse {
  success: boolean
  data?: User | User[]
  summary?: UserSummary[]
  statistics?: UserStatistics
  error?: string
  errors?: Array<{
    field: string
    message: string
    code?: string
  }>
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// User authentication response interface
export interface UserAuthResponse {
  success: boolean
  user?: User
  token?: string
  refreshToken?: string
  expiresIn?: number
  error?: string
}

// User context interface (for React context)
export interface UserContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: CreateUserInput) => Promise<void>
  updateProfile: (data: UpdateUserInput) => Promise<void>
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
}

// User permissions interface
export interface UserPermissions {
  canViewDashboard: boolean
  canManageUsers: boolean
  canManageOrders: boolean
  canManageProducts: boolean
  canManageSettings: boolean
  canViewAnalytics: boolean
  canManageSupport: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
}

// User export format interface
export interface UserExport {
  id: string
  email: string
  fullName: string
  role: string
  status: string
  totalOrders: number
  totalSpent: number
  emailVerified: boolean
  phoneVerified: boolean
  createdAt: string
  lastLoginAt?: string
}

// User import interface
export interface UserImport {
  id?: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role?: string
  status?: string
  password?: string
  metadata?: Record<string, any>
  errors?: string[]
}

// User bulk operation interface
export interface UserBulkOperation {
  operation: 'delete' | 'activate' | 'deactivate' | 'suspend' | 'change_role'
  userIds: string[]
  data?: {
    role?: UserRole
  }
}

// User device interface
export interface UserDevice {
  id: string
  userId: string
  deviceId: string
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'other'
  deviceName: string
  platform: string
  browser: string
  pushToken?: string
  isTrusted: boolean
  lastUsed: string
  createdAt: string
}

// User group interface
export interface UserGroup {
  id: string
  name: string
  description?: string
  permissions: string[]
  users: string[]
  createdAt: string
  updatedAt: string
}

// User note interface
export interface UserNote {
  id: string
  userId: string
  authorId: string
  authorName: string
  content: string
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}