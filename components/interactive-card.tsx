"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  tiltEffect?: boolean
  glowOnHover?: boolean
  scaleOnHover?: boolean
}

export function InteractiveCard({
  children,
  className = "",
  tiltEffect = true,
  glowOnHover = true,
  scaleOnHover = true,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !tiltEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const tiltStyle =
    tiltEffect && isHovered
      ? {
          transform: `
      perspective(1000px) 
      rotateX(${(mousePosition.y - 150) / 10}deg) 
      rotateY(${(mousePosition.x - 150) / 10}deg)
      ${scaleOnHover ? "scale(1.02)" : ""}
    `,
        }
      : {}

  return (
    <Card
      ref={cardRef}
      className={`
        transition-all duration-300 cursor-pointer
        ${glowOnHover ? "hover:shadow-2xl hover:shadow-blue-500/10" : ""}
        ${scaleOnHover && !tiltEffect ? "hover:scale-105" : ""}
        ${className}
      `}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Animated Border */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-50 animate-pulse" />
      )}
    </Card>
  )
}
