import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ZimbabweanSupermarketsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 ">
          <Image
            src="/image14.jpg"
            alt="Zimbabwean Supermarkets Strategy"
            fill
            className="object-contain"
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
                Zimbabwe's supermarkets find themselves at the epicentre of an economic landscape marked by intricate challenges that test their adaptability and resilience. From a dual currency system that adds complexity to pricing and revenue collection to fierce competition from informal traders operating with distinct cost advantages, these obstacles demand innovative solutions.
              </p>
            </div>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6">Understanding the Challenges</h2>
            
            <p>
              Zimbabwe's retail sector operates within a uniquely constrained environment, where supermarkets are burdened with structural, economic, and logistical challenges. These issues collectively undermine their competitiveness and push consumers toward informal alternatives.
            </p>

            <h3 className="text-2xl font-semibold text-slate-700 mb-4">1. Dual Currency and Exchange Rate Disparities</h3>
            
            <p>
              Zimbabwe's dual currency system, involving the Zimbabwean Gold (ZiG) and the U.S. dollar (USD), creates significant operational hurdles for supermarkets. Supermarkets are required to price goods at the official exchange rate of 26 ZiG to 1 USD, even as the black-market rate fluctuates between 37 and 45 ZiG to 1 USD.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 my-8">
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Key Statistics</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• 65% of consumers opt for informal markets due to lower prices</li>
                <li>• 12% drop in supermarket imports between 2022-2023</li>
                <li>• Informal trade accounts for over 60% of retail transactions</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-slate-700 mb-4">2. Informal Traders' Dominance</h3>
            
            <p>
              Informal traders leverage their unregulated status to offer unmatched affordability and convenience. They can sell goods at prices 15–20% lower than formal retail due to tax and duty evasion.
            </p>

            <h3 className="text-2xl font-semibold text-slate-700 mb-4">3. Traffic and Accessibility Issues</h3>
            
            <p>
              Harare ranks among the most congested cities in Southern Africa, with average travel times exceeding 40 minutes per trip during peak hours. 68% of consumers prefer to shop within walking distance of their homes.
            </p>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6 mt-12">The Neighbourhood Convenience Store Model</h2>
            
            <p>
              The neighbourhood convenience store model offers a promising solution by bringing formal retail closer to consumers and leveraging existing brand strengths to address the key advantages informal traders hold.
            </p>

            <h3 className="text-2xl font-semibold text-slate-700 mb-4">Key Features</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">1. Localized Stores</h4>
                <p className="text-slate-700 text-sm">
                  Smaller-format stores in high-density residential areas eliminate traffic concerns while retaining formal retail benefits like quality assurance and consistent pricing.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">2. Targeted Inventory</h4>
                <p className="text-slate-700 text-sm">
                  Focus on high-demand, fast-moving goods like cooking oil, mealie meal, sugar, and bread that are daily necessities for Zimbabwean households.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">3. Flexible Pricing</h4>
                <p className="text-slate-700 text-sm">
                  Lower overheads enable competitive pricing while maintaining profitability through USD pricing for key items where appropriate.
                </p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">4. Brand Differentiation</h4>
                <p className="text-slate-700 text-sm">
                  Emphasize quality, consistency, and safety to differentiate from informal traders and build consumer trust through established brand reputation.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-slate-800 mb-6 mt-12">Implementation Roadmap</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Step 1: Market Research</h3>
                <p className="text-slate-600">
                  Identify underserved neighborhoods like Mbare, Glen View, and Kuwadzana. Analyze consumer preferences and evaluate operational costs.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Step 2: Pilot Projects</h3>
                <p className="text-slate-600">
                  Launch 3-5 small-format stores in strategically selected neighborhoods to test assumptions and gather real-time feedback.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Step 3: Supply Chain</h3>
                <p className="text-slate-600">
                  Establish centralized warehouses and partner with local suppliers to reduce costs and maintain steady supply.
                </p>
              </div>
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Step 4: Staff Training</h3>
                <p className="text-slate-600">
                  Provide comprehensive training for customer service, inventory management, and dual-currency transactions.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Expected Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Increased Market Share</h3>
                  <p className="text-slate-600 text-sm">
                    Proximity and convenience will drive consumer preference, helping supermarkets compete directly with informal traders.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Higher Brand Loyalty</h3>
                  <p className="text-slate-600 text-sm">
                    Loyalty programs and community engagement will foster long-term relationships with customers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Improved Profitability</h3>
                  <p className="text-slate-600 text-sm">
                    Reduced overhead costs and optimized supply chains will improve margins despite economic challenges.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Economic Impact</h3>
                  <p className="text-slate-600 text-sm">
                    Job creation in local neighborhoods and support for local suppliers will benefit the broader economy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 mt-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Conclusion</h2>
              <p className="text-slate-700 mb-4">
                The economic challenges faced by Zimbabwe's supermarkets present an opportunity for innovation, not just survival. The neighbourhood convenience store model offers a practical solution that aligns with local community needs.
              </p>
              <p className="text-slate-700 font-semibold">
                Now is the time for supermarkets to act. With a clear strategy, you can reshape the retail landscape in Zimbabwe and create a sustainable, competitive ecosystem.
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
                href="/insights/unlocking-hidden-business-opportunities-in-zimbabwe"
                className="group bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  Unlocking Hidden Business Opportunities in Zimbabwe
                </h3>
                <p className="text-slate-600 text-sm">
                  Exploring key hidden business opportunities across critical sectors and strategic pathways for sustainable development in Zimbabwe.
                </p>
              </Link>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 