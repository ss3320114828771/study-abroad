'use client'

import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'outline' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hover = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variants = {
      default: 'bg-white/5 border border-white/20',
      gradient: 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/20',
      outline: 'bg-transparent border-2 border-white/20',
      glass: 'bg-white/5 backdrop-blur-md border border-white/20',
    }

    // Padding styles
    const paddings = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4 md:p-6',
      lg: 'p-6 md:p-8',
    }

    // Hover styles
    const hoverStyles = hover ? 'hover:scale-105 transition-all duration-300 cursor-pointer' : ''

    return (
      <div
        ref={ref}
        className={`
          rounded-xl
          ${variants[variant]}
          ${paddings[padding]}
          ${hoverStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex justify-between items-start mb-4 ${className}`}
        {...props}
      >
        <div>
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          {children}
        </div>
        {action && <div>{action}</div>}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Body Component
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, noPadding = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${noPadding ? '' : 'space-y-4'} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardBody.displayName = 'CardBody'

// Card Footer Component
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  divider?: boolean
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, divider = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          mt-4 pt-4
          ${divider ? 'border-t border-white/10' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

// Card Image Component
interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  aspect?: 'square' | 'video' | 'portrait'
  overlay?: boolean
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt = '', aspect = 'video', overlay = false, className = '', ...props }, ref) => {
    const aspects = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
    }

    return (
      <div
        ref={ref}
        className={`
          relative overflow-hidden rounded-t-xl -mt-6 -mx-6 mb-4
          ${aspects[aspect]}
          ${className}
        `}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        )}
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'

// Card Stats Component
interface CardStatsProps extends HTMLAttributes<HTMLDivElement> {
  stats: Array<{
    label: string
    value: string | number
    icon?: React.ReactNode
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
  }>
  columns?: 2 | 3 | 4
}

const CardStats = forwardRef<HTMLDivElement, CardStatsProps>(
  ({ stats, columns = 3, className = '', ...props }, ref) => {
    const columnClasses = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
    }

    const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
      switch (trend) {
        case 'up': return 'text-green-400'
        case 'down': return 'text-red-400'
        default: return 'text-gray-400'
      }
    }

    const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
      switch (trend) {
        case 'up': return '↑'
        case 'down': return '↓'
        default: return '→'
      }
    }

    return (
      <div
        ref={ref}
        className={`grid ${columnClasses[columns]} gap-4 ${className}`}
        {...props}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            {stat.icon && <div className="text-2xl mb-2">{stat.icon}</div>}
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            {stat.trend && stat.trendValue && (
              <p className={`text-xs ${getTrendColor(stat.trend)} mt-1`}>
                {getTrendIcon(stat.trend)} {stat.trendValue}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }
)

CardStats.displayName = 'CardStats'

// Card List Component
interface CardListProps extends HTMLAttributes<HTMLUListElement> {
  items: Array<{
    id: string
    content: React.ReactNode
    secondary?: React.ReactNode
    icon?: React.ReactNode
    action?: React.ReactNode
  }>
  dividers?: boolean
}

const CardList = forwardRef<HTMLUListElement, CardListProps>(
  ({ items, dividers = true, className = '', ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={`space-y-2 ${className}`}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`
              flex items-center gap-3 p-2
              ${dividers && index < items.length - 1 ? 'border-b border-white/10 pb-2' : ''}
            `}
          >
            {item.icon && <span className="text-xl">{item.icon}</span>}
            <div className="flex-1">
              <div className="text-white">{item.content}</div>
              {item.secondary && (
                <div className="text-sm text-gray-400">{item.secondary}</div>
              )}
            </div>
            {item.action && <div>{item.action}</div>}
          </li>
        ))}
      </ul>
    )
  }
)

CardList.displayName = 'CardList'

export { Card, CardHeader, CardBody, CardFooter, CardImage, CardStats, CardList }
export default Card