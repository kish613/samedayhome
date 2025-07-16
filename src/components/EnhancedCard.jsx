import React from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'

// Enhanced card wrapper that adds subtle styling improvements
const EnhancedCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hoverEffect = true,
  ...props 
}) => {
  const baseStyles = 'transition-all duration-300 ease-out'
  
  const variantStyles = {
    default: 'shadow-sm hover:shadow-md border border-gray-100/60',
    benefit: 'shadow-sm hover:shadow-lg border border-gray-100/60 bg-white/80 backdrop-blur-sm',
    testimonial: 'shadow-md hover:shadow-xl border border-gray-200/40',
    faq: 'shadow-sm hover:shadow-md border border-gray-100/60 bg-white/90'
  }
  
  const hoverStyles = hoverEffect ? 'hover:-translate-y-1 hover:scale-[1.02]' : ''
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`
  
  return (
    <Card className={combinedClassName} {...props}>
      {children}
    </Card>
  )
}

// Enhanced card content with improved spacing
const EnhancedCardContent = ({ children, className = '', ...props }) => {
  return (
    <CardContent className={`relative ${className}`} {...props}>
      {children}
    </CardContent>
  )
}

export { EnhancedCard, EnhancedCardContent }