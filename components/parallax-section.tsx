"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const scrolled = window.scrollY
      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrolled

      if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + rect.height) {
        const yPos = -(scrolled - elementTop) * speed
        element.style.transform = `translateY(${yPos}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={elementRef} className={`parallax ${className}`}>
      {children}
    </div>
  )
}

export default ParallaxSection
