"use client"

import { useState, useEffect } from "react"
import { ArrowUp, MessageCircle } from "lucide-react"
import Link from "next/link"

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Contact FAB */}
      <Link href="/contact">
        <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </Link>

      {/* Scroll to Top FAB */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
