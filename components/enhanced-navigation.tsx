'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Building2, Users, Newspaper, Cpu, Briefcase, BookOpen, Phone, Home } from 'lucide-react'

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-xl font-bold text-gray-900">GRI</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Building2 },
    { name: 'Services', href: '/services', icon: Briefcase },
    {
      name: 'Insights',
      href: '/insights',
      icon: BookOpen,
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Insights', href: '/insights', description: 'Browse all our insights' },
        { name: 'Business Opportunities', href: '/blog?category=business', description: 'Investment and market insights' },
        { name: 'Career Development', href: '/blog?category=careers', description: 'Professional growth opportunities' },
        { name: 'Industry News', href: '/blog?category=news', description: 'Latest market developments' },
        { name: 'Technology Trends', href: '/blog?category=technology', description: 'Innovation and digital transformation' },
      ]
    },
    { name: 'Blog', href: '/blog', icon: Newspaper },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <nav className={`relative z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' : 'bg-white'}`}>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">GRI</div>
            <span className="text-xl font-bold text-gray-900">GRI</span>
          </Link>
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.hasDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 text-slate-700 hover:text-blue-600 transition-colors data-[state=open]:text-blue-600"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 shadow-xl border-0 mt-2" align="start">
                    <Card className="shadow-xl border-0">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group/item"
                            >
                              <div className="font-medium text-slate-900 group-hover/item:text-blue-600 transition-colors">
                                {dropdownItem.name}
                              </div>
                              <div className="text-sm text-slate-600 mt-1">
                                {dropdownItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-slate-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 ${
                    pathname === item.href ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Beta</Badge>
          <Button className="rounded-full px-6">Get Started</Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">GRI</div>
          <span className="text-xl font-bold text-gray-900">GRI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-lg border z-50 lg:hidden"
          >
            <div className="p-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-left text-slate-700 hover:text-blue-600"
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </Button>

                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 mt-2 space-y-2 overflow-hidden"
                        >
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block p-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                              onClick={() => {
                                setIsOpen(false)
                                setActiveDropdown(null)
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 w-full p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg ${
                        pathname === item.href ? 'text-blue-600 font-medium bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setIsOpen(false)
                        setActiveDropdown(null)
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button className="w-full rounded-full px-6">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}