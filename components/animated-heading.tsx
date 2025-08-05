"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "slideUp" | "fadeIn" | "scaleIn" | "letterReveal" | "wordReveal"
}

export function AnimatedHeading({ children, className = "", delay = 0, animation = "slideUp" }: AnimatedHeadingProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay)
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
  }, [delay])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out"

    if (!isVisible) {
      switch (animation) {
        case "slideUp":
          return `${baseClasses} opacity-0 transform translate-y-8`
        case "fadeIn":
          return `${baseClasses} opacity-0`
        case "scaleIn":
          return `${baseClasses} opacity-0 transform scale-95`
        default:
          return `${baseClasses} opacity-0 transform translate-y-8`
      }
    }

    return `${baseClasses} opacity-100 transform translate-y-0 scale-100`
  }

  if (animation === "letterReveal" && typeof children === "string") {
    return (
      <div ref={elementRef} className={className}>
        <div className={`${getAnimationClasses()}`}>
          {children.split("").map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animationDelay: `${index * 0.05}s`,
                animation: isVisible ? "letterReveal 0.6s ease-out forwards" : "none",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (animation === "wordReveal" && typeof children === "string") {
    return (
      <div ref={elementRef} className={className}>
        <div className={`${getAnimationClasses()}`}>
          {children.split(" ").map((word, index) => (
            <span key={index} className="inline-block mr-2">
              <span
                className="inline-block"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animation: isVisible ? "wordSlideIn 0.4s ease-out forwards" : "none",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={elementRef} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  )
}

export default AnimatedHeading
