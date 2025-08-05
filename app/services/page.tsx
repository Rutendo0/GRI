"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollHeader } from "@/components/scroll-header"
import { ScrollAnimation } from "@/components/scroll-animations"
import { Footer } from "@/components/footer"

// Dynamic imports for better performance
const ScrollProgress = dynamic(() => import("@/components/scroll-progress"), { ssr: false })
const ParallaxSection = dynamic(() => import("@/components/parallax-section").then(mod => ({ default: mod.ParallaxSection })))

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      {/* Header */}
      <ScrollHeader />

      {/* Hero Section with Background Image Only */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/services-hero.jpg"
            alt="GRI Africa services overview"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 drop-shadow-lg">Our Services</h1>
        </div>
      </section>

      {/* Content Section Below Hero */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
              At GRI, we offer a comprehensive suite of services designed to empower investors and businesses in
              navigating Africa's dynamic markets. Our expertise bridges global capital with local opportunities,
              enabling sustainable growth and impactful investments.
            </p>
            <p className="text-lg text-slate-600">Explore how we can help you achieve your objectives:</p>
          </div>
        </div>
      </section>

      {/* Service Offerings Header */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white">Service Offerings</h2>
        </div>
      </section>

      {/* Foreign Direct Investment (FDI) Facilitation */}
      <ScrollAnimation animation="fadeRight">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                  Foreign Direct Investment (FDI) Facilitation
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Description:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Africa is a region of immense potential, but unlocking its opportunities requires local expertise and strategic partnerships. GRI connects international investors with high-growth ventures across Zimbabwe, Zambia, Botswana, and South Africa.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">How We Help:</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Identifying investment opportunities in key sectors.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Building connections with trusted local partners.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Developing customized market entry and expansion strategies.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Ensuring seamless navigation of regulatory frameworks.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Value Proposition:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We simplify the complex process of cross-border investment, enabling investors to focus on value creation while we handle the intricacies of market entry and deal structuring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="relative h-screen rounded-lg overflow-hidden">
                  <Image
                    src="/image5.jpg"
                    alt="African investment opportunities and partnerships"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 200vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Strategic Consultancy */}
      <ScrollAnimation animation="fadeLeft">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src="/image6.jpg"
                    alt="Business professional in consultation"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">Strategic Consultancy</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Description:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      In an environment of rapid change and shifting market dynamics, informed decisions are critical.
                      GRI's strategic consultancy services equip businesses and investors with the insights needed to
                      thrive in volatile markets.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">What We Offer:</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Market intelligence and trend analysis.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Investment risk assessments and mitigation strategies.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Advisory on navigating government policies and regulations.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Sector-specific insights tailored to your business goals.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Why Choose Us:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Our regionally grounded, globally informed approach ensures that your strategies are both
                      ambitious and achievable, laying the foundation for sustainable success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Project Management & Implementation */}
      <ScrollAnimation animation="fadeRight">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                  Project Management & Implementation
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Description:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      From groundbreaking ideas to successful execution, GRI manages every aspect of your projects. Our
                      meticulous approach ensures that your investments are realized efficiently, on time, and within
                      budget.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Our Expertise Includes:</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Project planning, coordination, and monitoring.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Budgeting, resource allocation, and performance tracking.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Compliance with regional and international regulatory standards.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        Stakeholder management and risk mitigation.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Why It Matters:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Our proven track record in overseeing large-scale projects allows you to focus on strategic
                      outcomes while we manage the operational details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src="/image7.jpg"
                    alt="Construction worker on project site"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Innovation Strategy */}
      <ParallaxSection speed={0.3}>
        <ScrollAnimation animation="fadeLeft">
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Image */}
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="/image8.jpg"
                      alt="Chess pieces representing strategic thinking"
                      fill
                      className="object-cover"
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Right Column - Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-6">Innovation Strategy</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Description:</h3>
                      <p className="text-slate-600 leading-relaxed">
                        In today's competitive landscape, innovation is not optional; it's essential. GRI helps
                        organizations redefine their operations, products, and strategies to build resilient,
                        future-ready businesses.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Key Focus Areas:</h3>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          Designing and implementing process improvements.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          Adopting advanced technologies for better efficiency.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          Crafting sustainable and profitable business models.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          Identifying disruptive trends and creating adaptive strategies.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Our Approach:</h3>
                      <p className="text-slate-600 leading-relaxed">
                        With a focus on creativity and pragmatism, we ensure that innovation aligns with your broader
                        business objectives, delivering tangible results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </ParallaxSection>

      {/* Key Benefits Section */}
      <ScrollAnimation animation="scaleIn">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-8">Why Choose GRI</h2>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
  <Card className="bg-gray-100 p-8 rounded-2xl text-left shadow-md hover:shadow-lg transition">
    <ul className="space-y-3">
      <li className="flex items-start gap-2">
        <span className="text-purple-700 mt-1">✔</span>
        <span className="text-lg font-medium text-gray-800">
          Extended credit for suppliers and buyers
        </span>
      </li>
    </ul>
  </Card>

  <Card className="bg-gray-100 p-8 rounded-2xl text-left shadow-md hover:shadow-lg transition">
    <ul className="space-y-3">
      <li className="flex items-start gap-2">
        <span className="text-purple-700 mt-1">✔</span>
        <span className="text-lg font-medium text-gray-800">
          Effective risk management of currency, credit and price
        </span>
      </li>
    </ul>
  </Card>

  <Card className="bg-gray-100 p-8 rounded-2xl text-left shadow-md hover:shadow-lg transition">
    <ul className="space-y-3">
      <li className="flex items-start gap-2">
        <span className="text-purple-700 mt-1">✔</span>
        <span className="text-lg font-medium text-gray-800">
          In-depth knowledge of operational markets
        </span>
      </li>
    </ul>
  </Card>
</div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Comprehensive Solutions */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow hover-lift scroll-animate fade-up stagger-1">
                <div className="relative h-48">
                  <Image
                    src="/image9.jpg"
                    alt="Comprehensive business solutions"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Comprehensive Solutions</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    From investment facilitation to project management, our services cover every stage of the investment
                    lifecycle.
                  </p>
                </CardContent>
              </Card>

              {/* Expertise Across Sectors */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow hover-lift scroll-animate fade-up stagger-2">
                <div className="relative h-48">
                  <Image
                    src="/const.png"
                    alt="Multi-sector expertise"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Expertise Across Sectors</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    With a focus on sectors like infrastructure, energy, agriculture, and technology, we bring
                    specialized insights and experience to each project.
                  </p>
                </CardContent>
              </Card>

              {/* Regional Depth, Global Perspective */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow hover-lift scroll-animate fade-up stagger-3">
                <div className="relative h-48">
                  <Image
                    src="/image11.jpg"
                    alt="Global network with local expertise"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Regional Depth, Global Perspective</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our local knowledge and international reach enable us to deliver strategies that are both regionally
                    grounded and globally competitive.
                  </p>
                </CardContent>
              </Card>

              {/* Sustainability First */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow hover-lift scroll-animate fade-up stagger-4">
                <div className="relative h-48">
                  <Image
                    src="/image10.png"
                    alt="Sustainability focus"
                    fill
                    className="object-cover"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Sustainability First</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    GRI prioritizes investments that deliver economic, social, and environmental benefits, ensuring
                    long-term value creation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Footer */}
      <Footer />
    </div>
  )
}