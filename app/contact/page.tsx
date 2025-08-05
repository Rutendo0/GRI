"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail } from "lucide-react"
import { ScrollHeader } from "@/components/scroll-header"
import { ScrollAnimation } from "@/components/scroll-animations"
import { Footer } from "@/components/footer"

// Dynamic imports for better performance
const ScrollProgress = dynamic(() => import("@/components/scroll-progress"), { ssr: false })

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      {/* Header */}
      <ScrollHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">Get in touch with GRI</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Let's Work Together to Drive Innovation and Investment Across Africa.
          </p>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">Contact Options</h2>
          </div>

          <ScrollAnimation animation="fadeUp">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* General Contact Information */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">General Contact Information</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    For general inquiries, partnership and employment opportunities,
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">Email:</p>
                        <a
                          href="mailto:info@griafrica.com"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          info@griafrica.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-slate-800 mb-1">Address (Zimbabwe HQ):</p>
                        <p className="text-slate-600">
                          7 George Silundika ave, Harare CBD,
                          <br />
                          Harare, Zimbabwe
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-slate-700 text-sm">
                      Visit us at our headquarters in Harare to discuss your investment and consultancy needs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Regional Offices */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">Regional Offices</h3>

                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-slate-800">South Africa Office:</h4>
                      </div>
                      <p className="text-slate-600 ml-8">Midrand, Johannesburg, South Africa</p>
                      <span className="inline-block ml-8 mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                        Opening Soon
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-slate-800">Zambia Office:</h4>
                      </div>
                      <p className="text-slate-600 ml-8">Lusaka, Zambia</p>
                      <span className="inline-block ml-8 mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                        Opening Soon
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="scaleIn">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
                  Let's Shape the Future of Africa Together
                </h2>
                <p className="text-lg text-slate-600">
                  Contact us today to explore transformative opportunities in investment and consultancy
                </p>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="investment">Investment Opportunities</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="employment">Employment Opportunities</option>
                        <option value="consultancy">Consultancy Services</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                        placeholder="Tell us about your project or inquiry..."
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-medium tracking-wide"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeLeft">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-800 mb-4">Visit Our Headquarters</h2>
              <p className="text-slate-600">7 George Silundika ave, Harare CBD, Harare, Zimbabwe</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">Google Maps integration would go here</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}