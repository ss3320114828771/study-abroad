// Product status types
export type ProductStatus = 'active' | 'draft' | 'archived' | 'out_of_stock'

// Product category types (renamed to avoid conflict)
export type ProductCategoryType = 'courses' | 'books' | 'services' | 'kits' | 'tests' | 'other'

// Product type types
export type ProductType = 'physical' | 'digital' | 'service' | 'bundle'

// Product variant interface
export interface ProductVariant {
  id: string
  sku: string
  name?: string
  price: number
  compareAtPrice?: number
  cost?: number
  stock: number
  images?: string[]
  attributes: Record<string, string> // e.g., { size: 'L', color: 'red' }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Product image interface
export interface ProductImage {
  id: string
  url: string
  alt?: string
  position: number
  isPrimary: boolean
}

// Product review interface
export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title?: string
  content: string
  images?: string[]
  verified: boolean
  helpful: number
  notHelpful: number
  response?: {
    content: string
    user: string
    date: string
  }
  createdAt: string
  updatedAt: string
}

// Product specification interface
export interface ProductSpecification {
  id: string
  name: string
  value: string
  position: number
}

// Product feature interface
export interface ProductFeature {
  id: string
  content: string
  icon?: string
  position: number
}

// Product SEO interface
export interface ProductSEO {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
}

// Product pricing interface
export interface ProductPricing {
  price: number
  compareAtPrice?: number
  cost?: number
  profit?: number
  margin?: number
  taxRate?: number
  taxIncluded?: boolean
  currency: string
  minQuantity?: number
  maxQuantity?: number
  quantityPricing?: Array<{
    min: number
    max?: number
    price: number
  }>
}

// Product inventory interface
export interface ProductInventory {
  sku: string
  barcode?: string
  trackQuantity: boolean
  quantity: number
  lowStockAlert: number
  allowBackorder: boolean
  backorderLimit?: number
  soldIndividually: boolean
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'backorder'
  warehouse?: string
  location?: string
}

// Product shipping interface
export interface ProductShipping {
  weight?: number
  weightUnit: 'kg' | 'lb' | 'g' | 'oz'
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  shippingClass?: string
  freeShipping: boolean
  flatRate?: number
  requiresShipping: boolean
  isDigital: boolean
  downloadUrl?: string
  downloadLimit?: number
  downloadExpiry?: number
}

// Product category interface (renamed from ProductCategory to avoid conflict)
export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  children?: ProductCategory[]
  productCount: number
  position: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Product tag interface
export interface ProductTag {
  id: string
  name: string
  slug: string
  productCount: number
}

// Product related interface
export interface ProductRelated {
  id: string
  name: string
  slug: string
  image?: string
  price: number
  compareAtPrice?: number
  rating?: number
  reviewCount?: number
}

// Main Product interface
export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  barcode?: string
  type: ProductType
  status: ProductStatus
  
  // Basic info
  shortDescription?: string
  description: string
  features: ProductFeature[]
  specifications: ProductSpecification[]
  
  // Category & tags
  category: ProductCategory | string
  categories?: string[]
  tags: string[]
  brand?: string
  
  // Media
  images: ProductImage[]
  video?: string
  thumbnail: string
  
  // Pricing
  pricing: ProductPricing
  
  // Inventory
  inventory: ProductInventory
  variants: ProductVariant[]
  hasVariants: boolean
  
  // Shipping
  shipping: ProductShipping
  
  // SEO
  seo?: ProductSEO
  
  // Reviews
  rating: number
  reviewCount: number
  reviews?: ProductReview[]
  
  // Related products
  related?: ProductRelated[]
  upsell?: ProductRelated[]
  crossSell?: ProductRelated[]
  
  // Sales data
  totalSales: number
  totalRevenue: number
  
  // Dates
  createdAt: string
  updatedAt: string
  publishedAt?: string
  
  // Flags
  isNew: boolean
  isFeatured: boolean
  isOnSale: boolean
  isBestSeller: boolean
  
  // Metadata
  metadata?: Record<string, any>
}

// Product summary interface (for listings)
export interface ProductSummary {
  id: string
  name: string
  slug: string
  sku: string
  thumbnail: string
  price: number
  compareAtPrice?: number
  category: string
  status: ProductStatus
  stock: number
  rating: number
  reviewCount: number
  sales: number
  revenue: number
  createdAt: string
  updatedAt: string
}

// Product creation input interface
export interface CreateProductInput {
  name: string
  slug?: string
  sku: string
  type: ProductType
  category: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  cost?: number
  stock: number
  images?: string[]
  features?: string[]
  specifications?: Record<string, string>
  tags?: string[]
  status?: ProductStatus
  isFeatured?: boolean
  seo?: Partial<ProductSEO>
  shipping?: Partial<ProductShipping>
  variants?: Array<Omit<ProductVariant, 'id' | 'createdAt' | 'updatedAt'>>
  metadata?: Record<string, any>
}

// Product update input interface
export interface UpdateProductInput {
  name?: string
  slug?: string
  sku?: string
  type?: ProductType
  category?: string
  description?: string
  shortDescription?: string
  price?: number
  compareAtPrice?: number
  cost?: number
  stock?: number
  images?: string[]
  features?: string[]
  specifications?: Record<string, string>
  tags?: string[]
  status?: ProductStatus
  isFeatured?: boolean
  seo?: Partial<ProductSEO>
  shipping?: Partial<ProductShipping>
  variants?: ProductVariant[]
  metadata?: Record<string, any>
}

// Product filter interface
export interface ProductFilter {
  category?: string | string[]
  status?: ProductStatus | ProductStatus[]
  type?: ProductType | ProductType[]
  tag?: string | string[]
  brand?: string | string[]
  search?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isFeatured?: boolean
  isOnSale?: boolean
  rating?: number
  sortBy?: keyof ProductSummary
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Product statistics interface
export interface ProductStatistics {
  total: number
  active: number
  draft: number
  archived: number
  outOfStock: number
  lowStock: number
  totalValue: number
  totalRevenue: number
  totalSales: number
  averagePrice: number
  averageRating: number
  byCategory: Array<{
    category: string
    count: number
    revenue: number
    sales: number
  }>
  byStatus: Record<ProductStatus, number>
  byType: Record<ProductType, number>
  topSelling: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
  topRated: Array<{
    id: string
    name: string
    rating: number
    reviews: number
  }>
}

// Product export format interface
export interface ProductExport {
  id: string
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  status: string
  sales: number
  revenue: number
  rating: number
  reviews: number
  createdAt: string
  updatedAt: string
}

// Product validation error interface
export interface ProductValidationError {
  field: string
  message: string
  code?: string
}

// Product API response interfaces
export interface ProductApiResponse {
  success: boolean
  data?: Product | Product[]
  summary?: ProductSummary[]
  statistics?: ProductStatistics
  error?: string
  errors?: ProductValidationError[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Product import interface
export interface ProductImport {
  id?: string
  name: string
  sku: string
  category: string
  price: number
  cost?: number
  stock: number
  description?: string
  status?: string
  images?: string[]
  tags?: string[]
  metadata?: Record<string, any>
  errors?: string[]
}

// Product bulk operation interface
export interface ProductBulkOperation {
  operation: 'delete' | 'publish' | 'unpublish' | 'update_category' | 'update_price' | 'update_stock'
  productIds: string[]
  data?: {
    category?: string
    price?: number
    stock?: number
    status?: ProductStatus
  }
}

// Product wishlist interface
export interface WishlistItem {
  id: string
  productId: string
  userId: string
  product: ProductSummary
  notes?: string
  createdAt: string
}

// Product comparison interface
export interface ProductComparison {
  products: ProductSummary[]
  differences: Array<{
    attribute: string
    values: Record<string, any>
  }>
}

// Product bundle interface
export interface ProductBundle {
  id: string
  name: string
  description?: string
  products: Array<{
    productId: string
    quantity: number
    discount?: number
  }>
  price: number
  savings: number
  savingsPercentage: number
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Product collection interface
export interface ProductCollection {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  products: string[]
  conditions?: {
    type: 'manual' | 'automated'
    rules?: Array<{
      attribute: string
      operator: 'equals' | 'contains' | 'greater' | 'less' | 'in'
      value: any
    }>
  }
  position: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}