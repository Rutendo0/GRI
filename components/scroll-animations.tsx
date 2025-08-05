"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn"
  delay?: number
}

export function ScrollAnimation({ children, className = "", animation = "fadeUp", delay = 0 }: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in")

              // Add specific animation class
              switch (animation) {
                case "fadeUp":
                  entry.target.classList.add("fade-up")
                  break
                case "fadeLeft":
                  entry.target.classList.add("fade-left")
                  break
                case "fadeRight":
                  entry.target.classList.add("fade-right")
                  break
                case "scaleIn":
                  entry.target.classList.add("scale-in")
                  break
              }
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [animation, delay])

  return (
    <div ref={elementRef} className={`scroll-animate ${className}`}>
      {children}
    </div>
  )
}
