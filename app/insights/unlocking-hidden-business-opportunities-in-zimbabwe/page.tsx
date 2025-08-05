import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ZimbabweOpportunitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/image12.jpg"
            alt="Zimbabwe Business Opportunities"
            fill
            className="object-contain w-full h-full"
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>

      </section>

      {/* Back to Insights */}
      <section className="py-4 bg-slate-50 border-b">
        <div className="container mx-auto px-4">
          <Link 
            href="/insights"
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
            <div className="bg-slate-50 rounded-xl p-8 mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-0">
                Zimbabwe's economy, despite its challenges, harbors significant untapped potential for investors and entrepreneurs. The country's strategic location, abundant natural resources, and improving regulatory frameworks position it as a promising frontier for growth. This report explores key hidden business opportunities across critical sectors and outlines strategic pathways for sustainable development.
              </p>
            </div>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6">1. Horticulture: A Blossoming Sector</h2>
            
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Overview</h3>
            <p>
              Zimbabwe's horticultural sector is emerging as a high-growth area, particularly in the cultivation of export-oriented crops such as blueberries, avocados, and citrus fruits. Favorable climatic conditions, coupled with increasing global demand, create a strong foundation for expansion.
            </p>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Key Statistics:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Growth in Blueberry Exports:</strong> Production doubled to 7,000 metric tons in 2023, generating over $100 million in annual revenue (Reuters, 2024).
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Global Market Opportunity:</strong> The global blueberry market is projected to grow at a CAGR of 7.3%, reaching $11.8 billion by 2027 (Statista, 2023).
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Challenges:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Limited access to affordable finance.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Underdeveloped cold chain infrastructure.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Strategic Recommendations:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Establish public-private partnerships to enhance cold storage and logistics.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Develop microfinance solutions tailored for smallholder farmers.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6 mt-12">2. Rail Transportation: Revitalizing Infrastructure</h2>
            
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Overview</h3>
            <p>
              Zimbabwe's rail network has been in decline, with freight volumes dropping from 12 million tons in the 1990s to less than 3 million tons today. The government has opened the sector to private players to restore capacity and capitalize on growing mineral exports.
            </p>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Key Statistics:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Mineral Exports:</strong> Zimbabwe is the world's third-largest producer of platinum and a significant exporter of lithium and gold.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Infrastructure Investment Needs:</strong> Revamping rail infrastructure requires an estimated $1 billion in investment.
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Current Developments:</h3>
            <p>
              South Africa's Grindrod has partnered with the National Railways of Zimbabwe (NRZ) to enhance freight services (Reuters, 2024).
            </p>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Strategic Recommendations:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Invest in modernizing rail systems with digital tracking and automated scheduling.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Partner with regional players to integrate Zimbabwe's rail network with SADC trade corridors.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6 mt-12">3. Formalizing the Informal Sector</h2>
            
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Overview</h3>
            <p>
              Zimbabwe's informal sector employs approximately 80% of the workforce, representing a vast and underutilized economic resource. Formalization could unlock productivity gains and expand the tax base.
            </p>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Key Statistics:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Economic Contribution:</strong> The informal economy contributes an estimated 60% to GDP (FactCheckZW, 2023).
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Financial Access:</strong> Only 18% of informal businesses have access to formal financial services.
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Challenges:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>High costs and bureaucratic hurdles for business registration.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Limited financial literacy and digital adoption.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Strategic Recommendations:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Simplify registration processes with digital platforms.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Offer incentives such as tax holidays for newly formalized businesses.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Develop targeted financial products to support small enterprises.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6 mt-12">4. Renewable Energy: Powering Growth</h2>
            
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Overview</h3>
            <p>
              Zimbabwe faces chronic power shortages, exacerbated by drought-induced declines in hydropower output. Renewable energy offers a sustainable solution to bridge the energy gap and drive industrial growth.
            </p>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Key Statistics:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Current Energy Deficit:</strong> Power generation meets only 70% of demand, with regular outages affecting productivity.
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <div>
                  <strong>Renewable Potential:</strong> Zimbabwe has an estimated solar potential of 16-20 MJ/m²/day and significant hydro resources along the Zambezi River.
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Current Developments:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>The government's National Renewable Energy Policy aims to achieve 1,100 MW of renewable capacity by 2025.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Several private-sector initiatives are underway, including solar farms and mini-grids.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-700 mb-4">Strategic Recommendations:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Expand incentives for private renewable energy projects, such as feed-in tariffs.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span>Leverage international climate finance to support large-scale solar and wind projects.</span>
              </li>
            </ul>

            <div className="bg-blue-50 rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Conclusion: Seizing the Opportunity</h2>
              <p className="text-slate-700 mb-4">
                Zimbabwe's hidden business opportunities span multiple sectors with significant growth potential. By addressing key challenges such as infrastructure deficits, regulatory barriers, and access to finance, investors can unlock substantial economic value. Strategic collaboration between government, private sector, and international partners will be critical to realizing these opportunities and driving sustainable development.
              </p>
              
              <h3 className="text-xl font-semibold text-slate-700 mb-4">Key Takeaways:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Horticulture, rail transportation, the informal sector, and renewable energy are high-potential areas for investment.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Addressing structural barriers and fostering innovation will ensure long-term growth.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Zimbabwe's economic transformation requires a concerted effort to integrate untapped resources into the formal economy.</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-200 mt-12 pt-8">
              <p className="text-sm text-slate-500">
                <strong>Sources:</strong> Reuters, FactCheckZW, Statista, Government of Zimbabwe reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Insights */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">
              Related Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                href="/insights/the-transformative-potential-of-blockchain-technology-in-industry"
                className="group bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  The Transformative Potential of Blockchain Technology in Industry
                </h3>
                <p className="text-slate-600 text-sm">
                  How blockchain technology is reshaping industries from supply chains to finance, healthcare, and energy markets.
                </p>
              </Link>
              <Link 
                href="/insights/how-zimbabwean-supermarkets-can-thrive-in-a-challenging-economy"
                className="group bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  How Zimbabwean Supermarkets Can Thrive in a Challenging Economy
                </h3>
                <p className="text-slate-600 text-sm">
                  Strategic approaches for supermarkets to compete with informal traders and build sustainable retail models.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 