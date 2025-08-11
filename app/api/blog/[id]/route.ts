import { NextRequest, NextResponse } from 'next/server';
import { 
  getBlogPostById, 
  updateBlogPost, 
  deleteBlogPost,
  initializeDatabase
} from '@/lib/services/blog';

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

// GET /api/blog/[id] - Get single blog post
export async function GET(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id || id === '') {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    const post = await getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/blog/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update blog post
export async function PUT(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updates = {
      ...body,
      featuredImageUrl: body.featuredImageUrl || body.featuredImage,
      featuredImageAlt: body.featuredImageAlt || body.imageAlt,
    };

    const updatedPost = await updateBlogPost(id, updates);
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/blog/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete blog post
export async function DELETE(request: NextRequest) {
  try {
    await ensureDbInitialized();
    
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    const deleted = await deleteBlogPost(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/blog/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', details: error.message },
      { status: 500 }
    );
  }
}