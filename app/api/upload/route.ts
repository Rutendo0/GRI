
import { NextRequest, NextResponse } from 'next/server';

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

    // For demo purposes, we'll return a placeholder URL
    // In production, you would upload to your preferred storage service
    const placeholderUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&q=80`;
    
    return NextResponse.json({ 
      url: placeholderUrl,
      message: 'Image uploaded successfully (demo mode)' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
