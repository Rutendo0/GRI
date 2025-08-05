"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface EnhancedButtonProps extends ButtonProps {
  ripple?: boolean
  glow?: boolean
  magneticEffect?: boolean
}

export function EnhancedButton({
  children,
  className = "",
  ripple = true,
  glow = false,
  magneticEffect = false,
  onClick,
  ...props
}: EnhancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }

    onClick?.(e)
  }

  return (
    <Button
      className={`
        relative overflow-hidden transition-all duration-300 transform
        ${glow ? "shadow-lg hover:shadow-2xl hover:shadow-blue-500/25" : ""}
        ${magneticEffect ? "hover:scale-105 active:scale-95" : "hover:scale-102 active:scale-98"}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {children}

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: "0.6s",
          }}
        />
      ))}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Button>
  )
}
