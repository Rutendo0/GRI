
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost, initializeDatabase, searchBlogPosts, getBlogPostsByTag, getFeaturedBlogPosts } from '@/lib/services/blog';

// Initialize database on first load
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
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
    
    // Always use database
    if (searchTerm) {
      posts = await searchBlogPosts(searchTerm);
    } else if (tag) {
      posts = await getBlogPostsByTag(tag);
    } else if (featured) {
      posts = await getFeaturedBlogPosts();
    } else {
      posts = await getAllBlogPosts(includeUnpublished);
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
