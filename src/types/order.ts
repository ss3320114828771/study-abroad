// Order status types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

// Payment status types
export type PaymentStatus = 'paid' | 'unpaid' | 'refunded' | 'failed' | 'pending'

// Payment method types
export type PaymentMethod = 'card' | 'paypal' | 'bank' | 'cod' | 'stripe'

// Shipping method types
export type ShippingMethod = 'standard' | 'express' | 'overnight' | 'freight'

// Order item interface
export interface OrderItem {
  id: string
  productId: string
  name: string
  sku: string
  quantity: number
  price: number
  total: number
  discount?: number
  image?: string
  options?: {
    size?: string
    color?: string
    [key: string]: any
  }
}

// Customer information interface
export interface OrderCustomer {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

// Shipping address interface
export interface ShippingAddress {
  street: string
  city: string
  state: string
  zip: string
  country: string
  addressLine2?: string
  instructions?: string
}

// Billing address interface
export interface BillingAddress {
  street: string
  city: string
  state: string
  zip: string
  country: string
  sameAsShipping?: boolean
}

// Payment details interface
export interface PaymentDetails {
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  paidAt?: string
  refundedAt?: string
  amount: number
  currency: string
  cardLast4?: string
  cardBrand?: string
  paypalEmail?: string
  bankName?: string
  bankAccount?: string
}

// Shipping details interface
export interface ShippingDetails {
  method: ShippingMethod
  carrier?: string
  trackingNumber?: string
  trackingUrl?: string
  estimatedDelivery?: string
  shippedAt?: string
  deliveredAt?: string
  cost: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
}

// Discount interface
export interface OrderDiscount {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  amount: number
  description?: string
}

// Tax interface
export interface OrderTax {
  id: string
  name: string
  rate: number
  amount: number
  region?: string
}

// Order timeline event interface
export interface OrderTimelineEvent {
  id: string
  type: 'created' | 'updated' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'note'
  status: OrderStatus
  description: string
  user?: string
  timestamp: string
  metadata?: Record<string, any>
}

// Order note interface
export interface OrderNote {
  id: string
  content: string
  type: 'public' | 'private'
  user: string
  createdAt: string
}

// Main Order interface
export interface Order {
  id: string
  orderNumber: string
  customer: OrderCustomer
  items: OrderItem[]
  
  // Financial details
  subtotal: number
  tax: OrderTax[]
  taxTotal: number
  shipping: ShippingDetails
  discount: OrderDiscount[]
  discountTotal: number
  total: number
  paid: number
  due: number
  currency: string
  
  // Addresses
  shippingAddress: ShippingAddress
  billingAddress: BillingAddress
  
  // Payment
  payment: PaymentDetails
  
  // Status
  status: OrderStatus
  paymentStatus: PaymentStatus
  fulfillmentStatus: 'pending' | 'partial' | 'fulfilled' | 'unfulfilled'
  
  // Dates
  createdAt: string
  updatedAt: string
  placedAt?: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
  cancelledAt?: string
  refundedAt?: string
  
  // Additional
  notes: OrderNote[]
  timeline: OrderTimelineEvent[]
  tags: string[]
  source?: 'website' | 'mobile' | 'admin' | 'api'
  ip?: string
  userAgent?: string
  
  // Metadata
  metadata?: Record<string, any>
}

// Order summary interface (for listings)
export interface OrderSummary {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
  }
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  items: number
  createdAt: string
  updatedAt: string
}

// Order creation input interface
export interface CreateOrderInput {
  customerId?: string
  customer: Omit<OrderCustomer, 'id'>
  items: Array<{
    productId: string
    quantity: number
    options?: Record<string, any>
  }>
  shippingAddress: ShippingAddress
  billingAddress?: BillingAddress
  paymentMethod: PaymentMethod
  shippingMethod: ShippingMethod
  notes?: string
  discountCodes?: string[]
  metadata?: Record<string, any>
}

// Order update input interface
export interface UpdateOrderInput {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  fulfillmentStatus?: 'pending' | 'partial' | 'fulfilled' | 'unfulfilled'
  trackingNumber?: string
  trackingUrl?: string
  carrier?: string
  estimatedDelivery?: string
  notes?: OrderNote[]
  metadata?: Record<string, any>
}

// Order filter interface
export interface OrderFilter {
  status?: OrderStatus | OrderStatus[]
  paymentStatus?: PaymentStatus | PaymentStatus[]
  customerId?: string
  customerEmail?: string
  dateFrom?: string
  dateTo?: string
  minTotal?: number
  maxTotal?: number
  search?: string
  tags?: string[]
  page?: number
  limit?: number
  sortBy?: keyof OrderSummary
  sortOrder?: 'asc' | 'desc'
}

// Order statistics interface
export interface OrderStatistics {
  total: number
  totalRevenue: number
  averageOrderValue: number
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  refunded: number
  paid: number
  unpaid: number
  refundedCount: number
  byStatus: Record<OrderStatus, number>
  byPaymentStatus: Record<PaymentStatus, number>
  byDay: Array<{
    date: string
    count: number
    revenue: number
  }>
  byMonth: Array<{
    month: string
    count: number
    revenue: number
  }>
  topProducts: Array<{
    productId: string
    name: string
    quantity: number
    revenue: number
  }>
  topCustomers: Array<{
    customerId: string
    name: string
    orders: number
    spent: number
  }>
}

// Order export format interface
export interface OrderExport {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  items: string
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: string
  paymentStatus: string
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

// Order validation errors interface
export interface OrderValidationError {
  field: string
  message: string
  code?: string
}

// Order API response interfaces
export interface OrderApiResponse {
  success: boolean
  data?: Order | Order[]
  summary?: OrderSummary[]
  statistics?: OrderStatistics
  error?: string
  errors?: OrderValidationError[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Order status change event interface
export interface OrderStatusChangeEvent {
  orderId: string
  from: OrderStatus
  to: OrderStatus
  by: string
  at: string
  reason?: string
}

// Order refund interface
export interface OrderRefund {
  id: string
  orderId: string
  amount: number
  reason: string
  method: PaymentMethod
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
  items?: Array<{
    itemId: string
    quantity: number
    amount: number
  }>
  notes?: string
  requestedBy: string
  processedBy?: string
  createdAt: string
  processedAt?: string
}

// Order shipment interface
export interface OrderShipment {
  id: string
  orderId: string
  trackingNumber: string
  carrier: string
  method: ShippingMethod
  status: 'pending' | 'shipped' | 'delivered' | 'returned'
  items: Array<{
    itemId: string
    quantity: number
  }>
  shippingAddress: ShippingAddress
  cost: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  shippedAt?: string
  deliveredAt?: string
  estimatedDelivery?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Order invoice interface
export interface OrderInvoice {
  id: string
  orderId: string
  invoiceNumber: string
  issuedAt: string
  dueAt?: string
  paidAt?: string
  items: OrderItem[]
  subtotal: number
  tax: OrderTax[]
  taxTotal: number
  shipping: number
  discount: OrderDiscount[]
  discountTotal: number
  total: number
  paid: number
  due: number
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled'
  notes?: string
  pdf?: string
}

// Order template interface (for recurring orders)
export interface OrderTemplate {
  id: string
  name: string
  customerId: string
  items: Array<{
    productId: string
    quantity: number
    options?: Record<string, any>
  }>
  shippingAddress: ShippingAddress
  billingAddress?: BillingAddress
  paymentMethod: PaymentMethod
  shippingMethod: ShippingMethod
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  nextOrder: string
  lastOrder?: string
  active: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}