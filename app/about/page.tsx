"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollHeader } from "@/components/scroll-header"
import { ScrollAnimation } from "@/components/scroll-animations"
import { Footer } from "@/components/footer"

// Dynamic imports with proper type handling
const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then(mod => mod.default),
  { ssr: false }
)

const ParallaxSection = dynamic(
  () => import("@/components/parallax-section").then(mod => mod.default)
)

const AnimatedHeading = dynamic(
  () => import("@/components/animated-heading").then(mod => mod.default)
)

const TypewriterEffect = dynamic(
  () => import("@/components/typewriter-effect").then(mod => mod.default)
)

const SECTION_CONTENT = {
  hero: {
    title: "Our Story",
    image: "/about-hero.jpg",
    alt: "GRI Africa team collaboration"
  },
  about: {
    description: "Gorilla Research And Investments is an African investment and management consultancy specialising in scalable, technology-driven infrastructure projects designed to address critical gaps in energy access and sustainable urban development across the continent.",
    values: [
      {
        title: "Dual Ethos",
        content: "Our name represents a dual philosophy. The gorilla—specifically the silverback—epitomises strategic intelligence, resilience, and natural leadership, mirroring our ambition to be a leading and responsible force in Africa's infrastructure evolution."
      },
      {
        title: "Sustainable Development Focus",
        content: "Strategically aligned with global and continental development frameworks—including the United Nations Sustainable Development Goals (SDGs) 9 (Industry, Innovation, Infrastructure) and 11 (Sustainable Cities and Communities)."
      },
      {
        title: "Transformative Approach",
        content: "At Gorilla Research And Investments we operate at the intersection of ambition and pragmatism, transforming infrastructure challenges into opportunities for inclusive, long-term prosperity."
      }
    ]
  },
  approach: {
    title: "Our Approach",
    description: "At GRI, our strategic framework is built on four core pillars that differentiate us in the marketplace:",
    pillars: [
      {
        title: "Connecting Investors with High-Potential Opportunities",
        content: "We identify and connect global investors with high-growth opportunities across Africa. With access to an extensive network of local enterprises and key industry players, we facilitate cross-border investments that drive economic progress in the region."
      },
      {
        title: "Navigating Complex Regulatory Environments",
        content: "The regulatory landscape in Africa can be daunting for foreign investors. GRI leverages its in-depth knowledge of local laws, regulations, and policies to guide investors through the regulatory maze, ensuring compliance and minimising risk."
      },
      {
        title: "End-to-End Project Management",
        content: "From inception to execution, GRI oversees all aspects of project management, ensuring seamless delivery of investments. Our proven track record in managing large-scale projects — spanning industries such as infrastructure, energy, and technology — guarantees timely, cost-efficient outcomes."
      },
      {
        title: "Feasibility Studies and Analytical Insights",
        content: "GRI's data-driven approach to feasibility studies offers investors clear insights into market dynamics, risk assessments, and potential returns. Our analytical capabilities support sound decision-making by providing the rigorous, evidence-based insights needed to move forward with confidence."
      }
    ],
    image: {
      src: "/image3.jfif",
      alt: "African elephant"
    }
  },
  mission: {
    title: "Our Mission",
    content: "GRI accelerates Africa's sustainable development through innovative, tech-driven infrastructure in energy and urban growth. By merging Lean Six Sigma efficiency with advanced technology, we deliver affordable, resilient solutions that empower communities and align with global goals like the UN SDGs and African Union's Agenda 2063.",
    image: {
      src: "/image4.jpg",
      alt: "Modern office interior with mountain view"
    }
  },
  values: {
    title: "Our Core Values",
    cards: [
      {
        title: "Investment Facilitation",
        content: "We apply creative, forward-thinking solutions to address the unique challenges of Southern Africa's rapidly evolving markets. By thinking differently, we unlock new pathways to growth and value creation.",
        image: {
          src: "/image17.jfif",
          alt: "Investment Facilitation"
        }
      },
      {
        title: "Regulatory Guidance",
        content: "We thrive in complex, dynamic environments. Our resilience allows us to overcome obstacles, pivot when necessary, and deliver impactful solutions despite external challenges.",
        image: {
          src: "/image15.jpg",
          alt: "Regulatory Guidance"
        }
      },
      {
        title: "Project Management",
        content: "Our data-driven, research-backed approach ensures that every decision is based on the best available information. This enables us to offer actionable insights that deliver measurable results for both investors and local businesses.",
        image: {
          src: "/image16.jpg",
          alt: "Project Management"
        }
      },
      {
        title: "Feasibility Studies and Market Analytics",
        content: "We prioritize projects that deliver long-term, sustainable outcomes. Our work is designed not only to generate financial returns but also to positively impact local communities, economies, and ecosystems.",
        image: {
          src: "/image10.png",
          alt: "Feasibility Studies and Market Analytics"
        }
      }
    ]
  },
  expertise: {
    title: "Our Expertise",
    description: "As a consultancy and investment advisory firm, GRI is at the forefront of transforming Africa's investment landscape. Our core services include:",
    services: [
      {
        title: "Investment Facilitation",
        content: "We connect global investors to Africa's highest-potential investment opportunities. Leveraging our extensive local networks and deep understanding of the region's economies, we enable successful cross-border investments that drive long-term growth."
      },
      {
        title: "Regulatory Guidance",
        content: "Navigating regulatory landscapes in many African countries requires local expertise and a deep understanding of the legal frameworks in each country. GRI provides comprehensive advisory services to ensure that our clients meet all regulatory requirements and mitigate any compliance risks."
      },
      {
        title: "Project Management",
        content: "Our end-to-end project management services ensure that complex projects are delivered on time, within budget, and to the highest standards. Whether you are investing in infrastructure, renewable energy, or technology, we provide the oversight and expertise to deliver successful outcomes."
      },
      {
        title: "Feasibility Studies and Market Analytics",
        content: "We provide in-depth feasibility studies that offer our clients an accurate picture of the economic potential of their investments. By analyzing market trends, risks, and opportunities, we help our clients make informed, data-driven investment decisions."
      },
      {
        title: "Legal Structuring",
        content: "GRI's legal experts specialize in structuring investment deals that minimize risk while ensuring compliance with local and international laws. We manage all legal aspects of transactions, providing the clarity and structure needed to facilitate successful investments."
      }
    ],
    images: [
      { src: "/k1.jpg", alt: "African cityscape" },
      { src: "/k2.jfif", alt: "Modern buildings" },
      { src: "/k3.jpg", alt: "African wildlife" },
      { src: "/k4.jpg", alt: "Business meeting" }
    ]
  },
  why: {
    title: "Why GRI?",
    points: [
      "GRI stands out for its unparalleled combination of deep regional expertise, global connectivity, and a strategic, innovative approach to investment facilitation.",
      "Our proven track record in project management, feasibility analysis, and legal structuring positions us as the trusted partner for businesses and investors looking to make a significant impact in Africa."
    ]
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <ScrollHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={SECTION_CONTENT.hero.image}
            alt={SECTION_CONTENT.hero.alt}
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8"
            animation="letterReveal"
          >
            {SECTION_CONTENT.hero.title}
          </AnimatedHeading>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
              <TypewriterEffect
                text={SECTION_CONTENT.about.description}
                speed={20}
                delay={1000}
                showCursor={false}
              />
            </div>
            <div className="space-y-6">
              {SECTION_CONTENT.about.values.map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-800">
                      {value.title}:
                    </span>{" "}
                    {value.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <ScrollAnimation animation="fadeRight">
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedHeading className="text-4xl md:text-5xl font-light text-slate-800 mb-8" animation="wordReveal">
                  {SECTION_CONTENT.approach.title}
                </AnimatedHeading>
                <p className="text-lg text-slate-600 mb-8">
                  {SECTION_CONTENT.approach.description}
                </p>

                <div className="space-y-6">
                  {SECTION_CONTENT.approach.pillars.map((pillar, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {index + 1}. {pillar.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {pillar.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[800px] rounded-lg overflow-hidden">
                <Image
                  src={SECTION_CONTENT.approach.image.src}
                  alt={SECTION_CONTENT.approach.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Mission Section */}
      <ScrollAnimation animation="fadeUp">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={SECTION_CONTENT.mission.image.src}
                  alt={SECTION_CONTENT.mission.image.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <AnimatedHeading
                  className="text-4xl md:text-5xl font-light text-slate-800 mb-8"
                  animation="wordReveal"
                >
                  {SECTION_CONTENT.mission.title}
                </AnimatedHeading>
                <div className="text-lg text-slate-600 leading-relaxed">
                  <TypewriterEffect
                    text={SECTION_CONTENT.mission.content}
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

      {/* Values Section */}
      <ScrollAnimation animation="scaleIn">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <AnimatedHeading className="text-4xl md:text-5xl font-light text-slate-800 mb-4" animation="wordReveal">
                {SECTION_CONTENT.values.title}
              </AnimatedHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {SECTION_CONTENT.values.cards.map((card, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
                  <div className="relative h-64">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {card.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Expertise Section */}
      <ParallaxSection speed={0.2}>
        <ScrollAnimation animation="fadeLeft">
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-3">
                  {SECTION_CONTENT.expertise.images.map((image, index) => (
                    <div key={index} className="relative h-[600px] rounded-lg overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <AnimatedHeading
                    className="text-4xl md:text-5xl font-light text-slate-800 mb-8"
                    animation="wordReveal"
                  >
                    {SECTION_CONTENT.expertise.title}
                  </AnimatedHeading>
                  <p className="text-lg text-slate-600 mb-8 italic">
                    {SECTION_CONTENT.expertise.description}
                  </p>

                  <div className="space-y-6">
                    {SECTION_CONTENT.expertise.services.map((service, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                          {index + 1}. {service.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {service.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </ParallaxSection>

      {/* Why GRI Section */}
      <ScrollAnimation animation="fadeRight">
        <section className="py-20 bg-blue-950">
          <div className="container mx-auto px-4 text-center">
            <AnimatedHeading className="text-4xl md:text-5xl font-light text-white mb-12" animation="wordReveal">
              {SECTION_CONTENT.why.title}
            </AnimatedHeading>
            <div className="max-w-5xl mx-auto space-y-8">
              {SECTION_CONTENT.why.points.map((point, index) => (
                <div key={index} className="text-lg md:text-xl text-white leading-relaxed">
                  <TypewriterEffect
                    text={point}
                    speed={30}
                    delay={index === 0 ? 500 : 3000}
                    showCursor={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <div className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 h-px" />
      <Footer />
    </div>
  )
}