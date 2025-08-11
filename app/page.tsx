"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Users,
  Award,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ScrollHeader } from "@/components/scroll-header"
import { ScrollAnimation } from "@/components/scroll-animations"
import { EnhancedButton } from "@/components/enhanced-button"
import { InteractiveCard } from "@/components/interactive-card"
import { Footer } from "@/components/footer" // Assuming Footer component is in components/footer.js

// Dynamic imports for better performance
const ScrollProgress = dynamic(() => import("@/components/scroll-progress"), { ssr: false })
const ParallaxSection = dynamic(() => import("@/components/parallax-section"))
const FloatingActionButton = dynamic(() => import("@/components/floating-action-button").then(mod => ({ default: mod.FloatingActionButton })), { ssr: false })
const ProgressIndicator = dynamic(() => import("@/components/progress-indicator"), { ssr: false })
const SmoothScrollLink = dynamic(() => import("@/components/smooth-scroll-link").then(mod => ({ default: mod.SmoothScrollLink })), { ssr: false })
const TradingViewWidget = dynamic(() => import("@/components/trading-view-widget").then(mod => ({ default: mod.TradingViewWidget })), { ssr: false })

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(1) // 1 = Values, 2 = Vision

  const ourValues = [
    { name: "Innovation", description: "Driving creative solutions" },
    { name: "Resilience", bg: "white", description: "Adapting to challenges" },
    { name: "Integrity", bg: "white", description: "Building trust" },
    { name: "Excellence", bg: "blue", description: "Delivering quality" },
    { name: "Collaboration", bg: "blue", description: "Working together" },
    { name: "Sustainability", bg: "blue", description: "Future-focused" },
  ];
  
  const ourVision = [
    { name: "Empowering Africa as a Global Investment Hub", bg: "white" },
    { name: "Setting the Standard for Research-Driven Solutions", bg: "white" },
    { name: "Innovating for a Sustainable Future", bg: "white" },
    { name: "Elevating Businesses Through Excellence", bg: "blue" },
    { name: "Foster Innovation and Creativity", bg: "blue" },
    { name: "Empower Local Economies and Communities", bg: "blue" },
  ];
  

  return (
    <div className="min-h-screen">
      <ProgressIndicator />
      <ScrollProgress />
      <FloatingActionButton />

      {/* Scroll-responsive Header */}
      <ScrollHeader />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/landing-hero.jpg"
            alt="African landscape"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-left text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl ml-0 sm:ml-8 lg:ml-16">
            <div className="mb-8">
              <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                <Sparkles className="w-2 h-4 mr-2" />
                Innovation-Driven Solutions
              </span>
            </div>

            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-normal mb-8 lg:mb-10 leading-[1.1] opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
              Innovation-Driven Solutions for the Future
              <br />
              <span className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-normal bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                of Africa's Growth
              </span>
            </h1>

            <div className="mb-10 lg:mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_1s_forwards]">
              <p className="text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light text-white/95">
                We bridge investors with Africa's emerging market potential through innovative, strategic solutions.
              </p>
            </div>

            <div className="opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
              <Link href="/contact">
                <EnhancedButton
                  size="lg"
                  className="bg-white/95 text-slate-900 hover:bg-white px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-medium tracking-wide border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl"
                  glow
                  magneticEffect
                >
                  Partner with Us
                  <ArrowRight className="w-5 h-5 ml-3" />
                </EnhancedButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Trading View Widget Section */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <TradingViewWidget />
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Company Description */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-5xl mx-auto">
              <p className="text-xl md:text-1xl text-slate-700 leading-relaxed font-light mb-4">
              Gorilla Research And Investments is an African investment and management consultancy specialising in scalable, technology-driven infrastructure projects designed to address critical gaps in energy access and sustainable urban development across the continent. By applying Lean Six Sigma principles, we optimize project delivery, eliminate operational waste, and ensure cost efficiency without compromising quality, while integrating an advanced software stack for precision execution and cost reduction.
            </p>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Our Values Section */}
      <ParallaxSection speed={0.3}>
        <ScrollAnimation animation="scaleIn">
          <section className="py-32 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1/3">
              <Image
                src="/image.jpg"
                alt="Modern building"
                fill
                className="object-cover"
                loading="lazy"
                quality={95}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-100"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center lg:text-left">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">GRI</h2>
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-700">
                      {activeSection === 1 ? "Our Values" : "Our Vision"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setActiveSection(1)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === 1 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                        aria-label="Show Our Values"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-medium text-slate-600">
                        {activeSection === 1 ? "Values" : "Vision"}
                      </span>
                      <button 
                        onClick={() => setActiveSection(2)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === 2 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                        aria-label="Show Our Vision"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                  {(activeSection === 1 ? ourValues : ourVision).map((value, index) => {
                    const Icon = value.icon
                    const isBlue = value.bg === "blue"

                    return (
                      <button
                        key={`${activeSection}-${value.name}`}
                        onClick={() => setActiveSection(activeSection === 1 ? 2 : 1)}
                        className="w-full h-full"
                      >
                        <InteractiveCard
                          className={`${isBlue ? "bg-gradient-to-br from-blue-800 to-blue-900" : "bg-white/90 backdrop-blur-sm"} p-6 lg:p-8 rounded-xl shadow-lg border-0 hover:scale-105 transition-all duration-300 cursor-pointer w-full h-48 lg:h-56 relative`}
                        >
                          {/* Plus icon in top right corner */}
                          <div className="absolute top-4 right-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isBlue ? "bg-white/20" : "bg-blue-100"}`}>
                              <svg 
                                className={`w-3 h-3 ${isBlue ? "text-white" : "text-blue-600"}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                         <h4 className={`text-lg lg:text-xl font-semibold ${isBlue ? "text-white" : "text-slate-800"}`}>
                     {value.name}
                    </h4>
                 {value.description && (
                 <p className={`text-sm ${isBlue ? "text-blue-200" : "text-slate-600"}`}>
               {value.description}
                       </p>
                 )}
                          </div>
                        </InteractiveCard>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </ParallaxSection>

      {/* What We Do Section */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                
                <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
                  What We Do: Your Partner in 
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 bg-clip-text">
                    Africa's Growth Story
                  </span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-gray-200 leading-relaxed">
                    At GRI, we are driven by a single vision: to create lasting change by fostering strategic partnerships that promote sustainable development.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    We achieve this through a combination of expertise, and the relentless pursuit of innovative solutions. We help investors navigate Africa's complex and dynamic markets, offering tailored solutions that break from traditional molds.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                      <Shield className="w-5 h-5 text-blue-300" />
                      <span className="text-white font-medium">Strategic Partnerships</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                      <TrendingUp className="w-5 h-5 text-green-300" />
                      <span className="text-white font-medium">Market Navigation</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span className="text-white font-medium">Innovative Solutions</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Continental Focus</h4>
                          <p className="text-gray-300 text-sm">Specialized expertise in African markets and development challenges</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Sustainable Impact</h4>
                          <p className="text-gray-300 text-sm">Creating lasting change through responsible investment practices</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Innovation-Driven</h4>
                          <p className="text-gray-300 text-sm">Breaking traditional molds with cutting-edge solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Services Section */}
      <ScrollAnimation animation="fadeUp">
        <section
          id="services"
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-8">Our Services</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                We specialize in scalable, technology-driven infrastructure projects across key sectors in Africa
              </p>
              <h3 className="text-2xl md:text-3xl font-normal text-black mt-12 mb-8">Target Industries</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
              {[
                {
                  title: "CONSTRUCTION",
                  image: "/const.png",
                  description: "Sustainable infrastructure for Africa's growing cities",
                  color: "from-orange-500 to-red-600"
                },
                {
                  title: "AGRICULTURE",
                  image: "/agric.png",
                  description: "Modern farming solutions for food security",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  title: "ENERGY",
                  image: "/energy.png",
                  description: "Renewable energy for sustainable development",
                  color: "from-yellow-500 to-orange-600"
                },
                {
                  title: "FINTECH",
                  image: "/image2.jfif",
                  description: "Digital financial solutions for banking access",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  title: "MANUFACTURING",
                  image: "/manu.jfif",
                  description: "Industrial development for economic growth",
                  color: "from-gray-600 to-slate-700"
                },
                {
                  title: "MINING",
                  image: "/minig.jpg",
                  description: "Sustainable resource extraction and processing",
                  color: "from-amber-600 to-yellow-700"
                },
              ].map((service, index) => (
                <div
                  key={service.title}
                  className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105 transform"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Background Image */}
                  <div className="relative h-80 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                      quality={100}
                      priority={index < 3} // Load the first 3 images with priority
                      loading={index < 3 ? "eager" : "lazy"} // Eager loading for first 3 images
                      priority={index < 3} // Load the first 3 images with priority
                      loading={index < 3 ? "eager" : "lazy"} // Eager loading for first 3 images
                    />
                  </div>

                  {/* Subtle gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  
                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-wide drop-shadow-lg text-shadow-lg">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>


      {/* Ready to Invest CTA */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 mb-8">
              <Target className="w-4 h-4 mr-2 text-blue-200" />
              <span className="text-blue-100">Let's Partner</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              Ready to Invest in 
              <span className="block text-transparent bg-gradient-to-r from-cyan-300 via-blue-200 to-white bg-clip-text">
                Africa's Future?
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            GRI is here to guide you through the complexities of African markets. Let’s make it happen together.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <EnhancedButton
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-12 py-5 text-lg font-semibold tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-300"
                  glow
                  magneticEffect
                >
                  Get In Touch
                  <ArrowRight className="w-5 h-5 ml-3" />
                </EnhancedButton>
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}