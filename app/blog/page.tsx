"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BlogPost,
  GetBlogPostsResponse,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  BlogPostResponse,
  DeleteBlogPostResponse,
} from "@/lib/types/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostEditor } from "@/components/blog/BlogPostEditor";
import { AdminToggle } from "@/components/blog/AdminToggle";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Sparkles, BookOpen, Users, Zap, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProfessionalLoading } from "@/components/professional-loading";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollProgress } from "@/components/scroll-progress";

// Demo data - In production, this would come from your API
const demoBlogs: BlogPost[] = [
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

The next wave of agricultural technology in Africa will focus on:
- **Climate-Resilient Farming**: AI models for climate adaptation
- **Robotics and Automation**: Mechanization suited for African conditions
- **Biotechnology Integration**: Gene editing and precision breeding
- **Circular Economy**: Waste reduction and resource optimization

Technology is not just improving agricultural productivity in Africa—it's transforming the entire food system, creating opportunities for farmers, entrepreneurs, and investors while ensuring food security for growing populations.`,
    excerpt: "Exploring how cutting-edge AI and blockchain technologies are revolutionizing agricultural practices and supply chains across Africa.",
    author: "Dr. Fatima Al-Rashid",
    publishedAt: "2024-01-14T13:45:00Z",
    updatedAt: "2024-01-14T13:45:00Z",
    tags: ["technology", "agriculture", "ai", "blockchain"],
    featured: true,
    readingTime: 9,
    featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    imageAlt: "Farmer using tablet technology in agricultural field"
  },
  {
    id: "5",
    title: "Remote Work Opportunities: Building Your Career from Anywhere in Africa",
    content: `# Remote Work Opportunities: Building Your Career from Anywhere in Africa

The remote work revolution has opened unprecedented opportunities for African professionals to access global markets while contributing to local economic development. From software development to digital marketing, remote careers are reshaping Africa's employment landscape.

## High-Demand Remote Career Fields

### Technology and Software Development
- **Full-Stack Development**: Web and mobile application development
- **Data Science and Analytics**: Business intelligence and machine learning
- **Cybersecurity**: Information security and risk management
- **Cloud Computing**: AWS, Azure, and Google Cloud expertise
- **DevOps Engineering**: Infrastructure automation and deployment

### Digital Marketing and Content
- **Social Media Management**: Brand building and community engagement
- **Content Creation**: Writing, video production, and graphic design
- **SEO Specialists**: Search engine optimization and digital strategy
- **Digital Advertising**: Google Ads, Facebook Ads, and programmatic advertising
- **E-commerce Management**: Online store operations and optimization

### Finance and Business Services
- **Virtual Accounting**: Bookkeeping and financial management
- **Business Analysis**: Process improvement and strategic planning
- **Project Management**: Remote team coordination and delivery
- **Virtual Assistance**: Executive support and administrative services
- **Customer Service**: Multilingual support and relationship management

## Salary Benchmarks for African Remote Workers

**Entry Level (0-2 years):**
- Software Developer: $15,000 - $25,000 annually
- Digital Marketer: $12,000 - $20,000 annually
- Virtual Assistant: $8,000 - $15,000 annually

**Mid-Level (3-5 years):**
- Senior Developer: $25,000 - $45,000 annually
- Marketing Manager: $20,000 - $35,000 annually
- Business Analyst: $22,000 - $38,000 annually

**Senior Level (5+ years):**
- Tech Lead/Architect: $45,000 - $80,000 annually
- Marketing Director: $35,000 - $60,000 annually
- Consultant: $40,000 - $70,000 annually

## Building Your Remote Career

### Essential Skills Development
1. **Technical Proficiency**: Master industry-standard tools and platforms
2. **Communication Skills**: Excel in written and verbal English communication
3. **Time Management**: Develop self-discipline and productivity habits
4. **Cultural Awareness**: Understand global business practices and etiquette
5. **Continuous Learning**: Stay updated with industry trends and technologies

### Building Your Portfolio
- **Online Presence**: Professional LinkedIn profile and personal website
- **Portfolio Projects**: Showcase your best work and case studies
- **Client Testimonials**: Build credibility through positive reviews
- **Certifications**: Industry-recognized credentials and continuing education
- **Networking**: Join professional communities and attend virtual events

### Finding Remote Opportunities
**Global Job Platforms:**
- Upwork, Freelancer, and Fiverr for freelance projects
- AngelList and Remote.co for startup opportunities
- LinkedIn Jobs and Indeed for full-time remote positions
- Toptal and Turing for high-end technical roles

**African-Focused Platforms:**
- Andela for software development opportunities
- Eden Jobs for East African remote positions
- Jobberman for West African opportunities
- Pnet for Southern African remote work

## Success Stories

### Case Study 1: Software Developer from Lagos
- Started as junior developer earning $800/month locally
- Transitioned to remote work with US startup
- Now earning $4,500/month as senior full-stack developer
- Mentoring other African developers to make similar transitions

### Case Study 2: Digital Marketer from Nairobi
- Began with local clients earning $300/month
- Built portfolio through pro-bono work for international NGOs
- Secured contract with European e-commerce company
- Currently managing marketing budget of $50,000/month

## Overcoming Common Challenges

**Infrastructure Challenges:**
- Invest in reliable internet backup options
- Use co-working spaces for professional environment
- Maintain backup power solutions (UPS, generators)

**Time Zone Management:**
- Choose clients in compatible time zones when possible
- Develop asynchronous communication skills
- Use scheduling tools for efficient coordination

**Payment and Banking:**
- Set up international payment accounts (Payoneer, Wise)
- Understand tax implications of foreign income
- Build emergency fund for payment delays

## Economic Impact on Africa

Remote work is contributing to:
- **Foreign Exchange Earnings**: Billions in annual remittances
- **Local Economic Development**: Remote workers supporting local businesses
- **Skills Development**: Technology transfer and knowledge sharing
- **Entrepreneurship**: Remote workers starting local businesses

## Future Trends

The future of remote work in Africa will see:
- **Improved Infrastructure**: Better internet connectivity across the continent
- **Government Support**: Policies encouraging remote work and digital nomadism
- **Education Reform**: Universities adapting curricula for remote work skills
- **Tech Hubs**: Growth of co-working spaces and innovation centers

Remote work is not just a temporary trend—it's a permanent shift that's creating new pathways to prosperity for African professionals while contributing to the continent's digital transformation.`,
    excerpt: "A comprehensive guide to building a successful remote career from Africa, including opportunities, skills needed, and success strategies.",
    author: "Grace Njoroge",
    publishedAt: "2024-01-12T16:20:00Z",
    updatedAt: "2024-01-12T16:20:00Z",
    tags: ["careers", "remote-work", "technology", "africa"],
    featured: false,
    readingTime: 11,
    featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    imageAlt: "Professional working remotely with laptop in modern African setting"
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAdmin();

  // Load posts from API
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        throw new Error('Failed to load posts');
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Define categories
  const categories = ["business", "careers", "news", "technology", "agriculture", "sustainability"];
  
  // Filter posts based on search, tags, and categories
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    const matchesCategory = selectedCategory === null || post.tags.some(tag => 
      selectedCategory.toLowerCase() === tag.toLowerCase() || 
      (selectedCategory === "business" && ["investment", "economy", "markets"].includes(tag)) ||
      (selectedCategory === "careers" && ["employment", "remote-work"].includes(tag)) ||
      (selectedCategory === "news" && ["mining", "economy"].includes(tag)) ||
      (selectedCategory === "technology" && ["ai", "blockchain"].includes(tag))
    );
    
    return matchesSearch && matchesTag && matchesCategory;
  });

  // Handle create/update post
  const handleSavePost = async (
    postData: CreateBlogPostRequest | UpdateBlogPostRequest,
  ) => {
    try {
      setSaving(true);
      const isUpdate = "id" in postData;

      let response;
      if (isUpdate) {
        // Update existing post
        response = await fetch(`/api/blog/${postData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      } else {
        // Create new post
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save post');
      }

      toast({
        title: "Success",
        description: isUpdate ? "Post updated successfully!" : "Post created successfully!",
      });
      
      setShowEditor(false);
      setEditingPost(null);
      
      // Reload posts
      await loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle delete post
  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const response = await fetch(`/api/blog/${postToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }

      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
      
      // Reload posts
      await loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  // Handle delete button click
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  // Handle edit post
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  // Handle new post
  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  // Filter featured posts
  const featuredPosts = posts.filter((post) => post.featured);

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background">
        <BlogPostEditor
          post={editingPost || undefined}
          onSave={handleSavePost}
          onCancel={() => {
            setShowEditor(false);
            setEditingPost(null);
          }}
          isLoading={saving}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ScrollHeader />
      
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/blog.jfif"
            alt="GRI Blog - Business insights and opportunities"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-8 h-8 text-white" />
                <span className="text-white font-medium text-lg">GRI Blog</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 drop-shadow-lg">
                Insights & Innovation
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed drop-shadow-md">
                {isAdmin ? "Share insights on business opportunities, career development, industry news, and technological innovations shaping Africa's future. Built for professionals and thought leaders." : "Stay informed with the latest business opportunities, career insights, industry news, and technological innovations driving Africa's economic transformation."}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <AdminToggle />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-sm text-white/80">Total Posts</div>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{featuredPosts.length}</div>
              <div className="text-sm text-white/80">Featured</div>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{allTags.length}</div>
              <div className="text-sm text-white/80">Topics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Navigation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors capitalize"
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles, careers, business insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedTag === null ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(null)}
                >
                  All Tags
                </Badge>
                {allTags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {isAdmin && (
              <Button onClick={handleNewPost} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedTag || selectedCategory) && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="outline" className="flex items-center gap-1 capitalize">
                  Category: {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => setSelectedCategory(null)}
                  />
                </Badge>
              )}
              {selectedTag && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Tag: {selectedTag}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => setSelectedTag(null)}
                  />
                </Badge>
              )}
            </div>
          )}

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                  <ProfessionalLoading variant="skeleton" className="h-64" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedTag
                  ? "No posts match your current filters."
                  : isAdmin
                  ? "Get started by creating your first blog post."
                  : "No blog posts are available at the moment."}
              </p>
              {isAdmin && (
                <Button onClick={handleNewPost} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  onEdit={isAdmin ? handleEditPost : undefined}
                  onDelete={isAdmin ? handleDeleteClick : undefined}
                  showActions={isAdmin}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}