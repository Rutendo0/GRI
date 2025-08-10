import { NextRequest, NextResponse } from 'next/server';
import { 
  getDemoPostById, 
  updateDemoPost, 
  deleteDemoPost 
} from '@/lib/services/demo-data';

const isDemoMode = () => {
  const hasDb = !!process.env.DATABASE_URL;
  console.log('Environment check - DATABASE_URL exists:', hasDb);
  console.log('Demo mode result:', !hasDb);
  return !hasDb;
};

// GET /api/blog/[id] - Get single blog post
export async function GET(request: NextRequest) {
  try {
    console.log('=== Individual Post Route Debug ===');
    console.log('Request URL:', request.url);
    
    // Extract ID from URL path
    const url = new URL(request.url);
    console.log('URL pathname:', url.pathname);
    
    const pathSegments = url.pathname.split('/');
    console.log('Path segments:', pathSegments);
    
    const id = pathSegments[pathSegments.length - 1];
    console.log('Extracted ID:', id);
    
    if (!id || id === '') {
      console.log('No ID provided');
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    console.log('Demo mode:', isDemoMode());
    
    if (isDemoMode()) {
      console.log('Fetching from demo data...');
      const post = getDemoPostById(id);
      console.log('Found post:', !!post);
      
      if (!post) {
        console.log('Post not found in demo data');
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }

      console.log('Returning post:', post.title);
      return NextResponse.json({ post }, { status: 200 });
    } else {
      console.log('Database mode not implemented yet');
      return NextResponse.json(
        { error: 'Database mode not available' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('=== ERROR in individual post route ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update blog post
export async function PUT(request: NextRequest) {
  try {
    console.log('=== PUT Route Debug ===');
    
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    console.log('Update ID:', id);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('Update data received');

    if (isDemoMode()) {
      const updates = {
        ...body,
        featuredImage: body.featuredImageUrl || body.featuredImage,
        imageAlt: body.featuredImageAlt || body.imageAlt,
        readingTime: body.content ? Math.ceil(body.content.split(' ').length / 200) : undefined
      };

      const updatedPost = updateDemoPost(id, updates);
      
      if (!updatedPost) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ post: updatedPost }, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Database mode not available' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete blog post
export async function DELETE(request: NextRequest) {
  try {
    console.log('=== DELETE Route Debug ===');
    
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    console.log('Delete ID:', id);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }

    if (isDemoMode()) {
      const deleted = deleteDemoPost(id);
      
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
    }

    return NextResponse.json(
      { error: 'Database mode not available' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', details: error.message },
      { status: 500 }
    );
  }
}