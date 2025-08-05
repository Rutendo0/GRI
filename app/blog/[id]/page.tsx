"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlogPost as BlogPostType } from "@/lib/types/blog";
import { useAdmin } from "@/contexts/AdminContext";
import { AdminToggle } from "@/components/blog/AdminToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Star,
  Edit,
  Trash2,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { ProfessionalLoading } from "@/components/professional-loading";

// Demo data - matches the main blog page exactly
const demoBlogs: BlogPostType[] = [
  {
    id: "5",
    title: "Investment Analyst Internship (Harare) - Join GRI",
    content: `# Investment Analyst Internship (Harare)

**Location:** Harare, Zimbabwe  
**Duration:** 3–6 Months (Strong possibility of full-time conversion)  
**Start Date:** Rolling Intake  
**Application Deadline:** Continuous review until position filled

Are you an exceptional attachment-year student or recent graduate driven by numbers, strategy, and predicting future economic outcomes?

**Join us:** Move beyond theory and apply your analytical skills to real-world financial challenges.

## CORE RESPONSIBILITIES

### Deal Valuation
Build and stress-test financial models (DCF, IRR, ROI) for live transactions

### M&A Analysis
Develop merger models and accretion/dilution forecasts

### Profitability Optimisation
Analyse segment-level P&Ls to identify margin drivers

### Strategic Storytelling
Transform complex data into executive-ready insights

## REQUIRED QUALIFICATIONS

### 1. Academic Background
- **Essential:** Attachment-year/recent graduate in Data Science, Finance, Actuarial Science, or Applied Mathematics or an other related field
- **Preferred:** Data Science Economics (Quantitative), Financial Engineering, or Industrial Engineering with finance focus
- **Asset:** Progress toward CFA Level 1/FMVA or financial modeling certifications

### 2. Technical Expertise
- **Non-negotiable:** Advanced Excel (scenario modeling, XNPV/XIRR), DCF/IRR mastery, basic statistics
- **Valued:** Python/R, Power BI/Tableau exposure
- **Bonus:** Knowledge of term sheets, joint ventures, or Zimbabwean regulatory frameworks

### 3. Critical Competencies
- **Analytical Rigor:** Deconstruct ambiguous problems into data-driven solutions
- **Precision:** Meticulous approach to financial modeling
- **Executive Communication:** Translate technical analyses into persuasive narratives
- **Agile Mindset:** Thrive in Zimbabwe's dynamic business environment

### 4. Experience Profile
- **Top candidates:** Finance/consulting internships, case competitions, modeling projects
- **Secondary:** Kaggle, quantitative research, or market analysis roles

## How to Apply

Ready to accelerate your finance career with real-world experience? This internship offers hands-on exposure to investment analysis, financial modeling, and strategic decision-making in one of Africa's most dynamic investment firms.

**What We Offer:**
- Mentorship from experienced investment professionals
- Exposure to live deal transactions and market analysis
- Professional development and networking opportunities
- Competitive compensation and potential for full-time conversion
- Direct involvement in shaping Africa's investment landscape

Join GRI and be part of driving innovation and investment across Africa. Apply today to start your journey in investment analysis and financial consulting.`,
    excerpt: "Join GRI as an Investment Analyst Intern in Harare. 3-6 month internship with strong possibility of full-time conversion. Apply your analytical skills to real-world financial challenges.",
    author: "GRI Careers Team",
    publishedAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
    tags: ["careers", "internship", "investment", "finance", "harare"],
    featured: true,
    readingTime: 5,
    featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    imageAlt: "Professional working on financial analysis and investment models"
  },
  {
    id: "1",
    title: "Top Investment Opportunities in African Infrastructure Development",
    content: `# Top Investment Opportunities in African Infrastructure Development

Africa's infrastructure gap presents unprecedented investment opportunities for forward-thinking investors. With growing populations and expanding economies, the continent needs massive infrastructure investment across multiple sectors.

## Key Investment Sectors

### Transportation Infrastructure
- **Highway Development**: Continental highway networks connecting major cities
- **Railway Systems**: High-speed rail connecting economic hubs
- **Ports and Airports**: Modernizing logistics and trade facilitation
- **Urban Transit**: Metro systems for rapidly growing cities

### Energy Infrastructure
- **Renewable Energy**: Solar and wind farms across the continent
- **Grid Modernization**: Smart grid technology implementation
- **Off-grid Solutions**: Decentralized energy for rural communities
- **Energy Storage**: Battery technology and pumped hydro storage

### Digital Infrastructure
- **5G Networks**: Next-generation connectivity infrastructure
- **Data Centers**: Cloud computing and digital transformation
- **Fiber Optic Networks**: High-speed internet backbone
- **Fintech Infrastructure**: Digital payment and banking systems

## Market Opportunities

The African Development Bank estimates that Africa needs $130-170 billion annually in infrastructure investment. This massive funding gap creates opportunities for:

- **Public-Private Partnerships (PPPs)**
- **Green bonds and sustainable financing**
- **Technology transfer and innovation**
- **Local capacity building and job creation**

## Investment Returns

Infrastructure investments in Africa typically offer:
- **Long-term stable returns** (8-12% annually)
- **Inflation protection** through indexed contracts
- **Currency diversification** across multiple African markets
- **ESG compliance** with sustainable development goals

The key to success lies in partnering with experienced local operators and understanding regulatory frameworks across different African markets.`,
    excerpt: "Exploring the most promising infrastructure investment opportunities across Africa's rapidly developing markets.",
    author: "Michael Okoye",
    publishedAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z",
    tags: ["business", "investment", "infrastructure", "africa"],
    featured: true,
    readingTime: 8,
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageAlt: "Modern African city skyline with construction cranes"
  },
  {
    id: "2",
    title: "Career Opportunities in Africa's Renewable Energy Boom",
    content: `# Career Opportunities in Africa's Renewable Energy Boom

Africa is experiencing a renewable energy revolution that's creating thousands of new career opportunities across the continent. From solar installations in Morocco to wind farms in Kenya, the green energy sector is rapidly expanding.

## High-Demand Career Paths

### Technical Roles
- **Solar PV Engineers**: Design and install solar systems
- **Wind Turbine Technicians**: Maintain and repair wind installations
- **Energy Storage Specialists**: Battery and grid storage experts
- **Grid Integration Engineers**: Connect renewable sources to existing grids

### Project Management
- **Renewable Project Managers**: Oversee large-scale installations
- **Environmental Impact Assessors**: Ensure sustainable development
- **Community Liaison Officers**: Manage stakeholder relationships
- **Construction Supervisors**: Lead installation teams

### Business Development
- **Business Development Managers**: Identify new market opportunities
- **Investment Analysts**: Evaluate renewable energy investments
- **Policy Advisors**: Shape government renewable energy policies
- **Sales Engineers**: Promote renewable energy solutions

## Skills in Demand

**Technical Skills:**
- Engineering expertise in renewable technologies
- Project management certification (PMP, PRINCE2)
- Environmental assessment capabilities
- Grid integration knowledge

**Soft Skills:**
- Cross-cultural communication
- Stakeholder management
- Problem-solving in challenging environments
- Adaptability to diverse markets

## Career Growth Potential

The renewable energy sector in Africa offers:
- **Rapid career advancement** due to sector growth
- **International experience** across multiple countries
- **Competitive salaries** often 20-30% above market rates
- **Meaningful impact** on sustainable development

## Getting Started

To enter this field:
1. Develop relevant technical skills through certification programs
2. Gain experience in emerging markets
3. Build networks with international development organizations
4. Consider specialized training in African market dynamics

The renewable energy boom in Africa is just beginning, making now the perfect time to build a career in this transformative sector.`,
    excerpt: "Discover the exciting career opportunities emerging from Africa's rapid transition to renewable energy sources.",
    author: "Aisha Patel",
    publishedAt: "2024-01-18T11:30:00Z",
    updatedAt: "2024-01-18T11:30:00Z",
    tags: ["careers", "renewable-energy", "africa", "employment"],
    featured: true,
    readingTime: 6,
    featuredImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    imageAlt: "Solar panels with African landscape in background"
  },
  {
    id: "3",
    title: "Breaking: Major Mining Discoveries Reshape African Investment Landscape",
    content: `# Breaking: Major Mining Discoveries Reshape African Investment Landscape

Recent mineral discoveries across Africa are attracting billions in foreign investment and reshaping the continent's economic prospects. From lithium deposits in Zimbabwe to rare earth elements in Madagascar, new findings are creating unprecedented opportunities.

## Recent Major Discoveries

### Zimbabwe's Lithium Boom
Zimbabwe has emerged as a major lithium producer with several world-class deposits:
- **Arcadia Lithium Project**: 25-year mine life with production starting 2024
- **Bikita Lithium Mine**: Expanded operations targeting EV battery market
- **Prospect Resources**: Multiple lithium projects under development

### Madagascar's Rare Earth Potential
Madagascar's rare earth deposits are gaining international attention:
- **Tantalus Rare Earths**: High-grade deposits for tech manufacturing
- **Critical Materials**: Essential for renewable energy technologies
- **Strategic Importance**: Reducing dependency on Chinese supply chains

### Ghana's Bauxite Expansion
Ghana is positioning itself as a major bauxite supplier:
- **Integrated Aluminum Industry**: Value-addition through local processing
- **Infrastructure Development**: Ports and railways for efficient export
- **Environmental Standards**: Sustainable mining practices implementation

## Investment Implications

These discoveries are driving:

**Foreign Direct Investment (FDI)**
- Billions in new mining investment commitments
- Technology transfer from international mining companies
- Local partnership requirements creating opportunities

**Infrastructure Development**
- New railway lines connecting mines to ports
- Power generation projects to support mining operations
- Water management systems for sustainable operations

**Economic Diversification**
- Reduced dependence on traditional commodity exports
- Development of downstream processing industries
- Creation of high-skilled employment opportunities

## Market Impact

The mining boom is affecting:
- **Currency strengthening** in countries with major discoveries
- **Stock market performance** of mining companies
- **Regional trade dynamics** with new supply chains
- **Geopolitical positioning** in global supply chains

## Looking Ahead

Analysts predict that these discoveries will:
- Position Africa as a critical supplier for the green energy transition
- Attract $50+ billion in mining investment over the next decade
- Create hundreds of thousands of new jobs
- Strengthen Africa's position in global commodity markets

The challenge now lies in ensuring that these resources benefit local communities while maintaining environmental standards and sustainable development practices.`,
    excerpt: "Latest mining discoveries across Africa are attracting massive investment and creating new economic opportunities across the continent.",
    author: "David Mwangi",
    publishedAt: "2024-01-16T08:15:00Z",
    updatedAt: "2024-01-16T14:22:00Z",
    tags: ["news", "mining", "investment", "economy"],
    featured: false,
    readingTime: 7,
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    imageAlt: "Mining operation in African landscape"
  },
  {
    id: "4",
    title: "How AI and Blockchain are Transforming African Agriculture",
    content: `# How AI and Blockchain are Transforming African Agriculture

Technology is revolutionizing agriculture across Africa, with artificial intelligence and blockchain leading the charge. From precision farming to supply chain transparency, these innovations are helping farmers increase yields while ensuring food security.

## AI Applications in African Agriculture

### Precision Agriculture
- **Satellite Imagery Analysis**: Monitor crop health and predict yields
- **Weather Prediction Models**: Optimize planting and harvesting timing
- **Soil Analysis**: AI-powered soil testing for optimal fertilizer application
- **Pest and Disease Detection**: Early warning systems using computer vision

### Smart Irrigation
- **Water Usage Optimization**: AI algorithms reduce water waste by 30-40%
- **Sensor Networks**: Real-time monitoring of soil moisture levels
- **Automated Systems**: Smart irrigation based on weather and crop data
- **Drought Prediction**: Early warning systems for water scarcity

### Market Intelligence
- **Price Prediction**: AI models forecast commodity prices
- **Demand Forecasting**: Optimize crop selection based on market needs
- **Supply Chain Optimization**: Reduce post-harvest losses through better logistics
- **Quality Assessment**: AI-powered grading and certification systems

## Blockchain in Agricultural Supply Chains

### Traceability and Transparency
- **Farm-to-Fork Tracking**: Complete supply chain visibility
- **Quality Certification**: Immutable records of farming practices
- **Organic Verification**: Blockchain-based organic certification
- **Fair Trade Compliance**: Transparent farmer compensation tracking

### Financial Inclusion
- **Smart Contracts**: Automated payments based on delivery milestones
- **Crop Insurance**: Blockchain-based parametric insurance products
- **Microfinance**: Decentralized lending platforms for smallholder farmers
- **Supply Chain Financing**: Improved access to working capital

## Success Stories Across Africa

### Kenya's iCow Platform
- SMS-based AI advisor for dairy farmers
- Provides personalized farming advice via mobile phones
- Reached over 2 million farmers across East Africa
- Increased milk production by average 25%

### Ghana's Farmerline
- Mobile platform connecting farmers with markets and information
- AI-powered agricultural advisory services
- Blockchain-based supply chain tracking
- Serving over 1 million farmers across West Africa

### Nigeria's Aerobotics
- Drone technology and AI for crop monitoring
- Early detection of pests and diseases
- Yield prediction with 90% accuracy
- Reduced pesticide use by 30%

## Economic Impact

Technology adoption in African agriculture is driving:
- **Productivity Increases**: 20-30% yield improvements on average
- **Income Growth**: Smallholder farmer incomes increasing 40-50%
- **Food Security**: Reduced post-harvest losses from 30% to 15%
- **Export Growth**: Better quality products accessing premium markets

## Challenges and Solutions

**Technology Adoption Barriers:**
- Limited internet connectivity in rural areas
- High initial investment costs
- Need for digital literacy training
- Integration with traditional farming practices

**Innovative Solutions:**
- Offline-capable mobile applications
- Subscription-based technology access models
- Farmer training and support programs
- Government subsidies for technology adoption

## Future Outlook

The convergence of AI and blockchain in African agriculture promises:
- **Sustainable intensification** of farming practices
- **Enhanced food security** through better supply chains
- **Improved farmer livelihoods** via fair market access
- **Climate resilience** through smart farming technologies

As these technologies become more accessible and affordable, they will play an increasingly vital role in feeding Africa's growing population while preserving the environment for future generations.`,
    excerpt: "Exploring how AI and blockchain technologies are revolutionizing agriculture across Africa, from precision farming to supply chain transparency.",
    author: "Dr. Kwame Asante",
    publishedAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    tags: ["technology", "agriculture", "ai", "blockchain", "africa"],
    featured: false,
    readingTime: 9,
    featuredImage: "https://images.unsplash.com/photo-1581344709827-bf4b334e1b5d?w=800&q=80",
    imageAlt: "Farmer using tablet technology in agricultural field"
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      setError(false);
      
      const response = await fetch(`/api/blog/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(true);
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-4xl font-bold mb-6 mt-8 text-slate-900">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-3xl font-semibold mb-4 mt-8 text-slate-800">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-2xl font-medium mb-3 mt-6 text-slate-700">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 text-slate-700">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      // Handle bold text
      const boldFormatted = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-slate-900">$1</strong>',
      );
      return (
        <p
          key={index}
          className="mb-4 text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldFormatted }}
        />
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <ScrollHeader />
        <div className="container mx-auto px-4 pt-24 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <ProfessionalLoading 
              variant="skeleton" 
              className="h-96 mb-8" 
              text="Loading article content..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <ScrollHeader />
        <div className="container mx-auto px-4 pt-24 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Return to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ScrollHeader />
      
      {/* Header */}
      <div className="border-b bg-white pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>

            {isAdmin && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // This would trigger edit mode - we'll implement this later if needed
                    toast({
                      title: "Edit Mode",
                      description: "Edit functionality coming soon!",
                    });
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // This would trigger delete - we'll implement this later if needed
                    toast({
                      title: "Delete",
                      description: "Delete functionality coming soon!",
                    });
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.featured && (
                <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-slate-700">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={post.featuredImage}
                  alt={post.imageAlt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {post.imageAlt && (
                <p className="text-sm text-muted-foreground mt-2 text-center italic">
                  {post.imageAlt}
                </p>
              )}
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg prose-slate max-w-none">
            {formatContent(post.content)}
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {formatDate(post.updatedAt)}
              </div>
            </div>
          </footer>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}