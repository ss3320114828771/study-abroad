'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg',
      secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
      outline: 'bg-transparent text-white border-2 border-white/30 hover:border-white/50',
      ghost: 'bg-transparent text-white hover:bg-white/10',
      danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:scale-105',
      success: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-105',
    }

    // Size styles
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-xl',
      lg: 'px-6 py-3 text-lg rounded-xl',
    }

    // Loading spinner
    const spinner = (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    return (
      <button
        ref={ref}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${disabled || isLoading ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
          font-medium transition-all duration-200 flex items-center justify-center gap-2
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && spinner}
        {!isLoading && icon && iconPosition === 'left' && <span className="text-lg">{icon}</span>}
        {children}
        {!isLoading && icon && iconPosition === 'right' && <span className="text-lg">{icon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button