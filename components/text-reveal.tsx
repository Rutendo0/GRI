"use client"

import { useEffect, useRef, useState } from "react"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  type?: "letter" | "word"
  trigger?: "scroll" | "immediate"
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  speed = 50,
  type = "letter",
  trigger = "scroll",
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)

  const elements = type === "letter" ? text.split("") : text.split(" ")

  useEffect(() => {
    if (trigger === "immediate") {
      setTimeout(() => setIsVisible(true), delay)
      return
    }

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
  }, [delay, trigger])

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= elements.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(timer)
  }, [isVisible, elements.length, speed])

  return (
    <span ref={elementRef} className={className}>
      {elements.map((element, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${
            index < revealedCount ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
          style={{
            transitionDelay: `${index * (speed / 1000)}s`,
          }}
        >
          {element}
          {type === "word" && index < elements.length - 1 && " "}
        </span>
      ))}
    </span>
  )
}
