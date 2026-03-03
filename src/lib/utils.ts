/**
 * Utility functions for the application
 */

// Date formatting utilities
export const formatDate = {
  /**
   * Format date to YYYY-MM-DD
   */
  toISODate: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toISOString().split('T')[0]
  },

  /**
   * Format date to readable format (e.g., "January 1, 2024")
   */
  toReadable: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  /**
   * Format date to short format (e.g., "Jan 1, 2024")
   */
  toShort: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  },

  /**
   * Get relative time (e.g., "2 hours ago", "3 days ago")
   */
  toRelative: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    const diffYears = Math.floor(diffDays / 365)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
  }
}

// Number formatting utilities
export const formatNumber = {
  /**
   * Format number with commas (e.g., 1,234,567)
   */
  withCommas: (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  /**
   * Format number to K/M/B (e.g., 1.2K, 3.4M, 5.6B)
   */
  toCompact: (num: number): string => {
    if (num < 1000) return num.toString()
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
    return (num / 1000000000).toFixed(1) + 'B'
  },

  /**
   * Format percentage
   */
  toPercent: (num: number, decimals: number = 1): string => {
    return num.toFixed(decimals) + '%'
  },

  /**
   * Format currency
   */
  toCurrency: (num: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }
}

// String utilities
export const formatString = {
  /**
   * Capitalize first letter
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  /**
   * Capitalize each word
   */
  capitalizeWords: (str: string): string => {
    return str.replace(/\b\w/g, char => char.toUpperCase())
  },

  /**
   * Truncate string with ellipsis
   */
  truncate: (str: string, length: number = 50): string => {
    if (str.length <= length) return str
    return str.substring(0, length) + '...'
  },

  /**
   * Generate slug from string
   */
  toSlug: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
  },

  /**
   * Extract initials from name
   */
  getInitials: (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
}

// Validation utilities
export const validate = {
  /**
   * Check if email is valid
   */
  email: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  /**
   * Check if phone number is valid (simple check)
   */
  phone: (phone: string): boolean => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return re.test(phone)
  },

  /**
   * Check if URL is valid
   */
  url: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * Check if password is strong
   * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
   */
  password: (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return re.test(password)
  }
}

// Color utilities
export const colors = {
  /**
   * Generate random hex color
   */
  random: (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  },

  /**
   * Get contrast color (black or white) for background
   */
  getContrast: (hexcolor: string): string => {
    // Convert hex to RGB
    const r = parseInt(hexcolor.substr(1, 2), 16)
    const g = parseInt(hexcolor.substr(3, 2), 16)
    const b = parseInt(hexcolor.substr(5, 2), 16)
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    
    return luminance > 0.5 ? '#000000' : '#ffffff'
  },

  /**
   * Lighten color
   */
  lighten: (hexcolor: string, percent: number): string => {
    const r = parseInt(hexcolor.substr(1, 2), 16)
    const g = parseInt(hexcolor.substr(3, 2), 16)
    const b = parseInt(hexcolor.substr(5, 2), 16)
    
    const lighten = (color: number) => Math.min(255, Math.floor(color + (255 - color) * percent))
    
    const rr = lighten(r).toString(16).padStart(2, '0')
    const gg = lighten(g).toString(16).padStart(2, '0')
    const bb = lighten(b).toString(16).padStart(2, '0')
    
    return `#${rr}${gg}${bb}`
  },

  /**
   * Darken color
   */
  darken: (hexcolor: string, percent: number): string => {
    const r = parseInt(hexcolor.substr(1, 2), 16)
    const g = parseInt(hexcolor.substr(3, 2), 16)
    const b = parseInt(hexcolor.substr(5, 2), 16)
    
    const darken = (color: number) => Math.max(0, Math.floor(color * (1 - percent)))
    
    const rr = darken(r).toString(16).padStart(2, '0')
    const gg = darken(g).toString(16).padStart(2, '0')
    const bb = darken(b).toString(16).padStart(2, '0')
    
    return `#${rr}${gg}${bb}`
  }
}

// Array utilities
export const arrayUtils = {
  /**
   * Group array by key
   */
  groupBy: <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((groups, item) => {
      const groupKey = String(item[key])
      return {
        ...groups,
        [groupKey]: [...(groups[groupKey] || []), item]
      }
    }, {} as Record<string, T[]>)
  },

  /**
   * Sort array by key
   */
  sortBy: <T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...arr].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1
      } else {
        return a[key] < b[key] ? 1 : -1
      }
    })
  },

  /**
   * Get unique values by key
   */
  uniqueBy: <T>(arr: T[], key: keyof T): T[] => {
    const seen = new Set()
    return arr.filter(item => {
      const value = item[key]
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk: <T>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    )
  }
}

// Storage utilities (localStorage wrapper)
export const storage = {
  /**
   * Set item in localStorage
   */
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  /**
   * Get item from localStorage
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue || null
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

// Cookie utilities
export const cookies = {
  /**
   * Set cookie
   */
  set: (name: string, value: string, days: number = 7): void => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  },

  /**
   * Get cookie
   */
  get: (name: string): string | null => {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },

  /**
   * Delete cookie
   */
  remove: (name: string): void => {
    document.cookie = name + '=; Max-Age=-99999999;'
  }
}

// Debounce utility
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  limit: number
): ((...args: Parameters<F>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Class name merger utility (like clsx)
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Wait utility (for async operations)
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Generate random ID
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

// Check if object is empty
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0
}

// Get nested object property safely
export const get = <T>(obj: any, path: string, defaultValue?: T): T | undefined => {
  const value = path.split('.').reduce((acc, part) => acc?.[part], obj)
  return value !== undefined ? value : defaultValue
}