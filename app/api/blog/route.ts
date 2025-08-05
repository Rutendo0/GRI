
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost, initializeDatabase } from '@/lib/services/blog';

// Demo data fallback
const demoBlogs = [
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
  }
];

// Initialize database on first load
let dbInitialized = false;
let demoMode = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.warn('Database not available, using demo mode:', error);
      demoMode = true;
      dbInitialized = true;
    }
  }
}

// GET /api/blog - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    const searchTerm = searchParams.get('search');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured') === 'true';

    let posts;
    
    if (demoMode) {
      // Use demo data
      posts = demoBlogs.filter(post => {
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          return post.title.toLowerCase().includes(term) ||
                 post.content.toLowerCase().includes(term) ||
                 post.excerpt.toLowerCase().includes(term);
        }
        if (tag) {
          return post.tags.includes(tag);
        }
        if (featured) {
          return post.featured;
        }
        return true;
      });
    } else {
      // Use database
      if (searchTerm) {
        const { searchBlogPosts } = await import('@/lib/services/blog');
        posts = await searchBlogPosts(searchTerm);
      } else if (tag) {
        const { getBlogPostsByTag } = await import('@/lib/services/blog');
        posts = await getBlogPostsByTag(tag);
      } else if (featured) {
        const { getFeaturedBlogPosts } = await import('@/lib/services/blog');
        posts = await getFeaturedBlogPosts();
      } else {
        posts = await getAllBlogPosts(includeUnpublished);
      }
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    if (demoMode) {
      return NextResponse.json(
        { error: 'Cannot create posts in demo mode. Please configure a database.' },
        { status: 503 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'author'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const postData = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      author: body.author,
      tags: body.tags || [],
      featured: body.featured || false,
      featuredImageUrl: body.featuredImageUrl,
      featuredImageAlt: body.featuredImageAlt,
      status: body.status || 'published'
    };

    const newPost = await createBlogPost(postData);
    
    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blog:', error);
    
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
