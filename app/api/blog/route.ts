
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost, initializeDatabase } from '@/lib/services/blog';
import { 
  getAllDemoPosts, 
  addDemoPost, 
  searchDemoPosts, 
  getDemoPostsByTag, 
  getFeaturedDemoPosts 
} from '@/lib/services/demo-data';

// Old demo data removed - now using centralized demo-data.ts
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
      // Use centralized demo data functions
      if (searchTerm) {
        posts = searchDemoPosts(searchTerm);
      } else if (tag) {
        posts = getDemoPostsByTag(tag);
      } else if (featured) {
        posts = getFeaturedDemoPosts();
      } else {
        posts = getAllDemoPosts();
      }
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

    if (demoMode) {
      // Create post in demo mode using centralized storage
      const newPost = {
        id: `demo-${Date.now()}`,
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        author: body.author,
        tags: body.tags || [],
        featured: body.featured || false,
        featuredImage: body.featuredImageUrl || body.featuredImage,
        imageAlt: body.featuredImageAlt || body.imageAlt,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readingTime: Math.ceil(body.content.split(' ').length / 200) // Estimate reading time
      };

      // Add to centralized demo data
      const savedPost = addDemoPost(newPost);
      
      return NextResponse.json({ post: savedPost }, { status: 201 });
    }

    const postData = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      author: body.author,
      tags: body.tags || [],
      featured: body.featured || false,
      featuredImageUrl: body.featuredImageUrl || body.featuredImage,
      featuredImageAlt: body.featuredImageAlt || body.imageAlt,
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
