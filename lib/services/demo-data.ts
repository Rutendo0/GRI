// Centralized demo data store to ensure consistency across all API routes
export interface DemoPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  featuredImage?: string;
  imageAlt?: string;
  status?: string;
  slug?: string;
}

// Shared demo data - this is the single source of truth for demo mode
let demoBlogs: DemoPost[] = [
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
- **Weather Prediction Models**: Optimize planting and harvesting times
- **Soil Analysis**: Determine optimal fertilizer and water requirements
- **Pest Detection**: Early identification of crop diseases and pests

### Smart Irrigation
- **Automated Systems**: Reduce water waste through precision irrigation
- **Moisture Sensors**: Real-time soil moisture monitoring
- **Weather Integration**: Adjust irrigation based on weather forecasts
- **Crop-Specific Watering**: Tailored irrigation for different crop types

## Blockchain in Agricultural Supply Chains

### Traceability
- **Farm-to-Table Tracking**: Complete product journey documentation
- **Quality Assurance**: Verify organic and fair-trade certifications
- **Food Safety**: Rapid identification of contamination sources
- **Export Documentation**: Streamlined international trade processes

### Financial Services
- **Smart Contracts**: Automated payments upon delivery verification
- **Crop Insurance**: Transparent and efficient claims processing
- **Microfinance**: Improved access to agricultural loans
- **Market Access**: Direct farmer-to-consumer platforms

## Success Stories Across Africa

### Kenya's Digital Farming
- **iCow Platform**: AI-powered livestock management advice
- **FarmDrive**: Credit scoring for smallholder farmers
- **Twiga Foods**: Blockchain-enabled supply chain management

### Ghana's Cocoa Innovation
- **Blockchain Traceability**: Premium pricing for traceable cocoa
- **AI Quality Assessment**: Automated grading and sorting systems
- **Smart Contracts**: Fair payment systems for farmers

### Nigeria's AgTech Boom
- **Farmcrowdy**: Digital platform connecting investors with farmers
- **Thrive Agric**: Technology-enabled agricultural financing
- **Hello Tractor**: Uber for tractors using IoT and mobile technology

## Impact on Food Security

These technologies are addressing critical challenges:
- **Yield Optimization**: 20-30% increase in crop productivity
- **Waste Reduction**: 40% reduction in post-harvest losses
- **Water Conservation**: 50% improvement in irrigation efficiency
- **Market Access**: Direct connection between farmers and buyers

## Challenges and Solutions

### Technology Adoption
- **Digital Literacy**: Training programs for farmers
- **Infrastructure**: Improved internet connectivity in rural areas
- **Affordability**: Subsidized technology access programs
- **Local Languages**: User interfaces in native languages

### Policy Support
- **Regulatory Frameworks**: Clear guidelines for AgTech implementation
- **Government Incentives**: Tax breaks for technology adoption
- **Research Partnerships**: Collaboration between universities and tech companies
- **Data Privacy**: Protection of farmer data and intellectual property

## Future Outlook

The convergence of AI and blockchain in African agriculture promises:
- **Sustainable Farming Practices**: Environmentally conscious agriculture
- **Economic Empowerment**: Higher incomes for smallholder farmers
- **Food Security**: Reliable food supply for growing populations
- **Export Growth**: Premium agricultural products for global markets

As these technologies become more accessible and affordable, they will continue to transform African agriculture, creating opportunities for farmers while ensuring food security for the continent's growing population.`,
    excerpt: "Exploring how artificial intelligence and blockchain technologies are revolutionizing agriculture across Africa, improving yields and food security.",
    author: "Dr. Amara Okafor",
    publishedAt: "2024-01-14T14:45:00Z",
    updatedAt: "2024-01-14T14:45:00Z",
    tags: ["technology", "agriculture", "ai", "blockchain", "africa"],
    featured: false,
    readingTime: 9,
    featuredImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
    imageAlt: "African farmer using tablet technology in agricultural field"
  }
];

// Demo data management functions  
export function getAllDemoPosts(): DemoPost[] {
  return [...demoBlogs].sort((a, b) => {
    // Sort by publishedAt date, newest first
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getDemoPostById(id: string): DemoPost | undefined {
  return demoBlogs.find(post => post.id === id);
}

export function addDemoPost(post: DemoPost): DemoPost {
  // Add new posts to the beginning so they appear first
  demoBlogs.unshift(post);
  return post;
}

export function updateDemoPost(id: string, updates: Partial<DemoPost>): DemoPost | null {
  const index = demoBlogs.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  demoBlogs[index] = { ...demoBlogs[index], ...updates, updatedAt: new Date().toISOString() };
  return demoBlogs[index];
}

export function deleteDemoPost(id: string): boolean {
  const index = demoBlogs.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  demoBlogs.splice(index, 1);
  return true;
}

export function searchDemoPosts(searchTerm: string): DemoPost[] {
  const term = searchTerm.toLowerCase();
  return demoBlogs.filter(post =>
    post.title.toLowerCase().includes(term) ||
    post.content.toLowerCase().includes(term) ||
    post.excerpt.toLowerCase().includes(term)
  );
}

export function getDemoPostsByTag(tag: string): DemoPost[] {
  return demoBlogs.filter(post => post.tags.includes(tag));
}

export function getFeaturedDemoPosts(): DemoPost[] {
  return demoBlogs.filter(post => post.featured);
}