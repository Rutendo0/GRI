
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image (JPEG, PNG, WebP, or GIF).' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    try {
      // Try to upload to Vercel Blob storage if configured
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop() || 'jpg';
        const filename = `blog-images/${timestamp}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
        
        const blob = await put(filename, file, {
          access: 'public',
        });

        return NextResponse.json({ 
          url: blob.url,
          message: 'Image uploaded successfully' 
        });
      }
    } catch (blobError) {
      console.warn('Blob storage upload failed:', blobError);
    }

    // Fallback: Convert to base64 data URL for local storage
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;

      return NextResponse.json({ 
        url: dataUrl,
        message: 'Image converted to base64 (fallback mode)' 
      });
    } catch (fallbackError) {
      console.error('Base64 conversion failed:', fallbackError);
    }

    // Final fallback: return a placeholder
    const placeholderUrl = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80`;
    
    return NextResponse.json({ 
      url: placeholderUrl,
      message: 'Using placeholder image (upload service unavailable)' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
