"use client"

import { useEffect, useRef, useState } from "react"

interface TypewriterEffectProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  showCursor?: boolean
  cursorClassName?: string
}

export function TypewriterEffect({
  text,
  className = "",
  delay = 0,
  speed = 100,
  showCursor = true,
  cursorClassName = "animate-pulse",
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

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

  useEffect(() => {
    if (!isVisible) return

    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [isVisible, text, speed])

  return (
    <span ref={elementRef} className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className={`inline-block w-0.5 h-1em bg-current ml-1 ${cursorClassName}`}>|</span>
      )}
    </span>
  )
}

export default TypewriterEffect