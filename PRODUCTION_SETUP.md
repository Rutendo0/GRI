# Production Setup Guide

Your GRI blog system is designed to work seamlessly in both demo and production modes. Here's how to set up production mode:

## 🚀 Current Status
- ✅ **Demo Mode**: Currently active - allows full blog functionality without database
- ⚙️ **Production Ready**: All code configured for PostgreSQL + Vercel deployment

## 📋 Production Requirements

### 1. Database Setup (PostgreSQL)

#### Option A: Vercel Postgres (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project → Storage tab
3. Click "Create Database" → Select "Postgres"
4. Copy the connection string provided
5. Add to your environment variables

#### Option B: External PostgreSQL Provider
Choose any PostgreSQL provider:
- **Neon**: https://neon.tech (Free tier available)
- **Supabase**: https://supabase.com (Free tier available)  
- **Railway**: https://railway.app
- **Heroku Postgres**: https://heroku.com

### 2. Environment Variables Setup

#### Local Development (.env.local)
Create a `.env.local` file in your project root:

```bash
# Copy from .env.example and fill in your values
DATABASE_URL=postgresql://username:password@host:port/database_name
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here
```

#### Vercel Deployment
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   - `DATABASE_URL` → Your PostgreSQL connection string
   - `BLOB_READ_WRITE_TOKEN` → Your Vercel Blob token (optional)

### 3. Database Schema Setup

The database will auto-initialize on first run, but you can also run the schema manually:

```sql
-- Connect to your PostgreSQL database and run:
-- (Found in lib/db/schema.sql)

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  reading_time INTEGER DEFAULT 5,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  status VARCHAR(50) DEFAULT 'draft'
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### 4. Image Storage Setup (Optional)

#### Vercel Blob Storage
1. Go to Vercel Dashboard → Your Project → Storage
2. Create a Blob Store
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add to environment variables

**Without Blob Storage**: Images will be converted to base64 and stored inline

## 🔄 Mode Switching

### Demo Mode (Current)
- **Trigger**: No `DATABASE_URL` environment variable
- **Features**: 
  - Full blog functionality
  - In-memory storage (resets on restart)
  - Base64 image storage
  - No external dependencies

### Production Mode
- **Trigger**: `DATABASE_URL` environment variable present
- **Features**:
  - PostgreSQL database storage
  - Persistent blog posts
  - Vercel Blob image storage (if configured)
  - Full CRUD operations
  - Search functionality
  - Tag filtering

## 🚀 Deployment Steps

### 1. Quick Deployment (Keep Demo Mode)
```bash
# Deploy to Vercel without database (keeps demo mode)
npx vercel --prod
```

### 2. Full Production Deployment
```bash
# 1. Set up database (choose from options above)
# 2. Add environment variables to Vercel
# 3. Deploy
npx vercel --prod

# The system will automatically:
# - Detect production mode
# - Initialize database tables
# - Enable full functionality
```

## 📊 Feature Comparison

| Feature | Demo Mode | Production Mode |
|---------|-----------|-----------------|
| Blog Creation | ✅ | ✅ |
| Blog Editing | ✅ | ✅ |
| Blog Deletion | ✅ | ✅ |
| Image Upload | Base64 | Vercel Blob + Base64 fallback |
| Data Persistence | Session only | Permanent |
| Search | ✅ | ✅ Enhanced |
| Tag Filtering | ✅ | ✅ Enhanced |
| Performance | Good | Optimized |
| Concurrent Users | Limited | Unlimited |

## 🔒 Security Notes

- Admin password remains the same: `GRI#Admin2024!Secure@Blog`
- Database connections use SSL in production
- Images are validated for type and size
- SQL injection protection via parameterized queries

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check environment variables
echo $DATABASE_URL

# Test database connection
# (Connection test will happen automatically on first API call)
```

### Mode Detection
- Demo mode: Look for console warning "No DATABASE_URL found, using demo data"
- Production mode: Console log "Database initialized successfully"

### Common Issues
1. **Can't create posts**: Check if `DATABASE_URL` is set correctly
2. **Images not uploading**: `BLOB_READ_WRITE_TOKEN` missing (will fallback to base64)
3. **Performance issues**: Check database indexes are created

## 📈 Performance Optimization

Production mode includes:
- Database connection pooling
- Indexed queries for fast search
- Automatic reading time calculation
- Optimized image storage
- Efficient markdown rendering

## 🎯 Next Steps

1. **Keep Demo Mode**: Ready to go! Your blog works perfectly as-is
2. **Upgrade to Production**: Follow database setup above for persistence
3. **Hybrid Approach**: Start with demo mode, upgrade to production when needed

Your blog system is production-ready and will automatically adapt based on your environment configuration!