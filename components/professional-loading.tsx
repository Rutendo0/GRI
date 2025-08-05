"use client"

import { cn } from "@/lib/utils"

interface ProfessionalLoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "skeleton" | "pulse"
  text?: string
}

export function ProfessionalLoading({ 
  className,
  size = "md",
  variant = "spinner",
  text = "Loading..."
}: ProfessionalLoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="loading-skeleton h-4 rounded w-3/4"></div>
        <div className="loading-skeleton h-4 rounded w-1/2"></div>
        <div className="loading-skeleton h-4 rounded w-5/6"></div>
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: "0.1s"}}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizeClasses[size]
      )}></div>
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  )
}