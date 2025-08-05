"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function ScrollHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link href="/" className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                <Image
                  src="/logo.png"
                  alt="GRI Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  sizes="48px"
                  quality={95}
                  priority
                />
              </div>
              <span className="font-bold text-xl sm:text-2xl text-white">
                GRI
              </span>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                <Image
                  src="/logo.png"
                  alt="GRI Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  sizes="48px"
                  quality={95}
                  priority
                />
              </div>
              <span className={`font-bold text-xl sm:text-2xl transition-colors duration-300 ${isScrolled ? "text-slate-900" : "text-white"}`}>
                GRI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/"
                className={`font-medium text-sm xl:text-base transition-all duration-200 hover:text-blue-600 hover:scale-105 ${
                  isScrolled ? "text-slate-700" : "text-blue-950"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`font-medium text-sm xl:text-base transition-all duration-200 hover:text-blue-600 hover:scale-105 ${
                  isScrolled ? "text-slate-700" : "text-blue-950"
                }`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`font-medium text-sm xl:text-base transition-all duration-200 hover:text-blue-600 hover:scale-105 ${
                  isScrolled ? "text-slate-700" : "text-blue-950"
                }`}
              >
                Services
              </Link>
              <Link
                href="/blog"
                className={`font-medium text-sm xl:text-base transition-all duration-200 hover:text-blue-600 hover:scale-105 ${
                  isScrolled ? "text-slate-700" : "text-blue-950"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="bg-blue-600 text-blue-950 px-4 xl:px-6 py-2 xl:py-2.5 rounded-full text-sm xl:text-base font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                isScrolled ? "text-slate-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 sm:top-18 left-0 right-0 bg-white shadow-2xl border-t border-gray-200">
            <nav className="px-4 sm:px-6 py-6 space-y-1">
              <Link
                href="/"
                className="block text-slate-700 font-medium py-4 px-4 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-slate-700 font-medium py-4 px-4 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="block text-slate-700 font-medium py-4 px-4 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="block text-slate-700 font-medium py-4 px-4 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/insights"
                className="block text-slate-700 font-medium py-4 px-4 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 text-center font-medium shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}