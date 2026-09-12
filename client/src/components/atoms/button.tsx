import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>, 
  React.PropsWithChildren, 
  VariantProps<typeof buttonVariants> 
{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

const buttonVariants = cva(
  'flex-1 font-medium border border-gray-300 rounded-lg cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'bg-white  text-gray-700 hover:bg-gray-50',
      },
      size: {
        small: 'text-xs px-2 py-1',
        medium: 'text-sm px-4 py-2 ',
        large: 'text-lg px-6 py-3',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    }
  }
)

function Button({ 
  variant = "primary",
  size = "medium",
  type = "button", 
  onClick, 
  children,
  className,
  ...props 
}: ButtonProps) {

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button