"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { ScrollHeader } from '@/components/scroll-header'

const insights = [
  {
    id: 'unlocking-hidden-business-opportunities-in-zimbabwe',
    title: 'Unlocking Hidden Business Opportunities in Zimbabwe',
    excerpt: 'Exploring key hidden business opportunities across critical sectors and strategic pathways for sustainable development in Zimbabwe.',
    category: 'Business Strategy',
    image: '/image12.jpg'
  },
  {
    id: 'the-transformative-potential-of-blockchain-technology-in-industry',
    title: 'The Transformative Potential of Blockchain Technology in Industry',
    excerpt: 'How blockchain technology is reshaping industries from supply chains to finance, healthcare, and energy markets.',
    category: 'Technology',
    image: '/image13.jpg'
  },
  {
    id: 'how-zimbabwean-supermarkets-can-thrive-in-a-challenging-economy',
    title: 'How Zimbabwean Supermarkets Can Thrive in a Challenging Economy',
    excerpt: 'Strategic approaches for supermarkets to compete with informal traders and build sustainable retail models.',
    category: 'Retail Strategy',
    image: '/image14.jpg'
  }
]

export default function InsightsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ScrollHeader />

      {/* Hero Section with Background Image */}
      <section className="pt-24 relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/back.jpeg"
            alt="GRI Insights and Research"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Insights & Research
          </h1>
        </div>
      </section>

      {/* Insights Navigation */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
                Featured Research
              </h2>
              <p className="text-lg text-slate-600">
                Explore our latest insights and strategic analysis
              </p>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:border-slate-300 transition-colors"
              >
                <span className="text-lg font-medium text-slate-800">
                  Select an Insight
                </span>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-slate-500 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg mt-1 shadow-lg z-50">
                  {insights.map((insight, index) => (
                    <Link
                      key={insight.id}
                      href={`/insights/${insight.id}`}
                      className={`block p-4 hover:bg-slate-50 transition-colors ${
                        index !== insights.length - 1 ? 'border-b border-slate-100' : ''
                      }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={insight.image}
                            alt={insight.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            quality={95}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {insight.category}
                            </span>
                            <span className="text-sm text-slate-500">
                              {insight.readTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
                            {insight.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {insight.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {insights.map((insight) => (
                <Link
                  key={insight.id}
                  href={`/insights/${insight.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 text-slate-800 rounded-full">
                        {insight.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500">
                        {insight.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {insight.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get notified when we publish new research and strategic analysis on Africa's business landscape
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}