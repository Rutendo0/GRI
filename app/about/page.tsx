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
const AnimatedHeading = dynamic(() => import("@/components/animated-heading").then(mod => ({ default: mod.AnimatedHeading })))
const TypewriterEffect = dynamic(() => import("@/components/typewriter-effect").then(mod => ({ default: mod.TypewriterEffect })))

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      {/* Header */}
      <ScrollHeader />

      {/* Our Story Hero Section */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about-hero.jpg"
            alt="GRI Africa team collaboration"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* Hero Title Only */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8"
            animation="letterReveal"
          >
            Our Story
          </AnimatedHeading>
        </div>
      </section>

      {/* Content Section - Below the background image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
              <TypewriterEffect
                text="Gorilla Research And Investments is an African investment and management consultancy specialising in scalable, technology-driven infrastructure projects designed to address critical gaps in energy access and sustainable urban development across the continent."
                speed={20}
                delay={1000}
                showCursor={false}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-800">
                    Dual Ethos:
                  </span>{" "}
                  Our name represents a dual philosophy. The gorilla—specifically the silverback—epitomises strategic
                  intelligence, resilience, and natural leadership, mirroring our ambition to be a leading and responsible
                  force in Africa's infrastructure evolution.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-800">
                    Sustainable Development Focus:
                  </span>{" "}
                  Strategically aligned with global and continental development frameworks—including the United Nations
                  Sustainable Development Goals (SDGs) 9 (Industry, Innovation, Infrastructure) and 11 (Sustainable Cities
                  and Communities).
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-800">
                    Transformative Approach:
                  </span>{" "}
                  At Gorilla Research And Investments we operate at the intersection of ambition and pragmatism,
                  transforming infrastructure challenges into opportunities for inclusive, long-term prosperity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <ScrollAnimation animation="fadeRight">
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <AnimatedHeading className="text-4xl md:text-5xl font-light text-slate-800 mb-8" animation="wordReveal">
                  Our Approach
                </AnimatedHeading>
                <p className="text-lg text-slate-600 mb-8">
                  At{" "}
                  <span className="font-semibold">
                    GRI
                  </span>
                  , our strategic framework is built on four core pillars that differentiate us in the marketplace:
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      1. Connecting Investors with High-Potential Opportunities:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      We identify and connect global investors with high-growth opportunities across Africa. With access
                      to an extensive network of local enterprises and key industry players, we facilitate cross-border
                      investments that drive economic progress in the region.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      2. Navigating Complex Regulatory Environments:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      The regulatory landscape in Africa can be daunting for foreign investors. GRI leverages its
                      in-depth knowledge of local laws, regulations, and policies to guide investors through the
                      regulatory maze, ensuring compliance and minimising risk.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      3. End-to-End Project Management:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      From inception to execution, GRI oversees all aspects of project management, ensuring seamless
                      delivery of investments. Our proven track record in managing large-scale projects — spanning
                      industries such as infrastructure, energy, and technology — guarantees timely, cost-efficient
                      outcomes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      4. Feasibility Studies and Analytical Insights:
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      GRI's data-driven approach to feasibility studies offers investors clear insights into market
                      dynamics, risk assessments, and potential returns. Our analytical capabilities support sound
                      decision-making by providing the rigorous, evidence-based insights needed to move forward with
                      confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src="/image3.jfif"
                    alt="African elephant"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Our Mission Section */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image */}
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src="/image4.jpg"
                    alt="Modern office interior with mountain view"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div>
                <AnimatedHeading
                  className="text-4xl md:text-5xl font-light text-slate-800 mb-8"
                  animation="letterReveal"
                >
                  Our Mission
                </AnimatedHeading>
                <div className="text-lg text-slate-600 leading-relaxed">
                  <TypewriterEffect
                    text="GRI accelerates Africa's sustainable development through innovative, tech-driven infrastructure in energy and urban growth. By merging Lean Six Sigma efficiency with advanced technology, we deliver affordable, resilient solutions that empower communities and align with global goals like the UN SDGs and African Union's Agenda 2063."
                    speed={25}
                    delay={500}
                    showCursor={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Our Core Values Section */}
      <ScrollAnimation animation="scaleIn">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <AnimatedHeading className="text-4xl md:text-5xl font-light text-slate-800 mb-4" animation="wordReveal">
                Our Core values
              </AnimatedHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Investment Facilitation */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="relative h-64">
                  <Image
                    src="/image17.jfif"
                    alt="Investment Facilitation"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    Investment Facilitation
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We apply creative, forward-thinking solutions to address the unique challenges of Southern Africa's
                    rapidly evolving markets. By thinking differently, we unlock new pathways to growth and value
                    creation.
                  </p>
                </CardContent>
              </Card>

              {/* Regulatory Guidance */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="relative h-64">
                  <Image
                    src="/image15.jpg"
                    alt="Regulatory Guidance"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    Regulatory Guidance
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We thrive in complex, dynamic environments. Our resilience allows us to overcome obstacles, pivot
                    when necessary, and deliver impactful solutions despite external challenges.
                  </p>
                </CardContent>
              </Card>

              {/* Project Management */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="relative h-64">
                  <Image
                    src="/image16.jpg"
                    alt="Project Management"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    Project Management
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our data-driven, research-backed approach ensures that every decision is based on the best available
                    information. This enables us to offer actionable insights that deliver measurable results for both
                    investors and local businesses.
                  </p>
                </CardContent>
              </Card>

              {/* Feasibility Studies */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="relative h-64">
                  <Image
                    src="/image10.png"
                    alt="Feasibility Studies and Market Analytics"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    Feasibility Studies and Market Analytics
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We prioritize projects that deliver long-term, sustainable outcomes. Our work is designed not only
                    to generate financial returns but also to positively impact local communities, economies, and
                    ecosystems.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Our Expertise Section */}
      <ParallaxSection speed={0.2}>
        <ScrollAnimation animation="fadeLeft">
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/k1.jpg"
                        alt="African cityscape"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src="/k2.jfif"
                        alt="Modern buildings"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src="/k3.jpg"
                        alt="African wildlife"
                        fill
                        className="object-cover"
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/k4.jpg"
                        alt="Business meeting"
                        fill
                        className="object-cover"
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div>
                  <AnimatedHeading
                    className="text-4xl md:text-5xl font-light text-slate-800 mb-8"
                    animation="letterReveal"
                  >
                    Our Expertise
                  </AnimatedHeading>
                  <p className="text-lg text-slate-600 mb-8 italic">
                    As a <em>consultancy and investment advisory firm</em>,
                    GRI 
                    is at the forefront of transforming Africa's investment landscape. Our core services include:
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        1. Investment Facilitation:
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        We connect global investors to Africa's highest-potential investment opportunities. Leveraging
                        our extensive local networks and deep understanding of the region's economies, we enable
                        successful cross-border investments that drive long-term growth.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        2. Regulatory Guidance:
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Navigating regulatory landscapes in many African countries requires local expertise and a deep
                        understanding of the legal frameworks in each country. GRI provides comprehensive advisory
                        services to ensure that our clients meet all regulatory requirements and mitigate any compliance
                        risks.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        3. Project Management:
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Our end-to-end project management services ensure that complex projects are delivered on time,
                        within budget, and to the highest standards. Whether you are investing in infrastructure,
                        renewable energy, or technology, we provide the oversight and expertise to deliver successful
                        outcomes.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        4. Feasibility Studies and Market Analytics:
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        We provide in-depth feasibility studies that offer our clients an accurate picture of the
                        economic potential of their investments. By analyzing market trends, risks, and opportunities,
                        we help our clients make informed, data-driven investment decisions.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        5. Legal Structuring:
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        <span className="font-semibold">GRI's</span> legal experts specialize in structuring investment
                        deals that minimize risk while ensuring compliance with local and international laws. We manage
                        all legal aspects of transactions, providing the clarity and structure needed to facilitate
                        successful investments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </ParallaxSection>

      {/* Why GRI Section */}
      <ScrollAnimation animation="fadeRight">
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 text-center">
            <AnimatedHeading className="text-4xl md:text-5xl font-light text-white mb-12" animation="wordReveal">
              Why GRI?
            </AnimatedHeading>
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-lg md:text-xl text-white leading-relaxed">
                <TypewriterEffect
                  text="GRI stands out for its unparalleled combination of deep regional expertise, global connectivity, and a strategic, innovative approach to investment facilitation."
                  speed={30}
                  delay={500}
                  showCursor={false}
                />
              </div>
              <div className="text-lg md:text-xl text-white leading-relaxed">
                <TypewriterEffect
                  text="Our proven track record in project management, feasibility analysis, and legal structuring positions us as the trusted partner for businesses and investors looking to make a significant impact in Africa."
                  speed={25}
                  delay={3000}
                  showCursor={false}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Footer */}
      <Footer />
    </div>
  )
}