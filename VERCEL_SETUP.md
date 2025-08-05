# Vercel Deployment Setup Guide

This guide will help you deploy your GRI blog with Vercel Postgres and Blob storage.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Node.js**: Version 18+ installed locally

## Step 1: Install Required Packages

Add the necessary dependencies to your project:

```bash
npm install pg @types/pg @vercel/blob
# or
pnpm add pg @types/pg @vercel/blob
```

## Step 2: Environment Variables

Create a `.env.local` file in your project root:

```env
# Database
POSTGRES_URL="your-postgres-connection-string"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url"
POSTGRES_USER="your-postgres-user"
POSTGRES_HOST="your-postgres-host"
POSTGRES_PASSWORD="your-postgres-password"
POSTGRES_DATABASE="your-postgres-database"

# Blob Storage
BLOB_READ_WRITE_TOKEN="your-blob-token"
```

## Step 3: Deploy to Vercel

### 3.1 Connect Your Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3.2 Add Storage

#### Add Postgres Database:
1. Go to your project dashboard
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name (e.g., "gri-blog-db")
6. Click "Create"

#### Add Blob Storage:
1. In the same "Storage" tab
2. Click "Create Database" again
3. Select "Blob"
4. Choose a name (e.g., "gri-blog-images")
5. Click "Create"

### 3.3 Environment Variables

After creating the databases, Vercel will automatically add the environment variables to your project. You can verify them in:

1. Project Settings → Environment Variables

## Step 4: Database Initialization

The database will be automatically initialized on the first API request. The system will:

1. Create the `blog_posts` table
2. Set up indexes for performance
3. Create triggers for automatic timestamp updates

## Step 5: Migrate Demo Data (Optional)

If you want to keep your existing demo posts, create a migration script:

```typescript
// scripts/migrate-demo-data.ts
import { createBlogPost } from '@/lib/services/blog';

const demoPosts = [
  {
    title: "Investment Analyst Internship (Harare) - Join GRI",
    content: "Your existing content...",
    excerpt: "Your existing excerpt...",
    author: "GRI Careers Team",
    tags: ["careers", "internship", "investment", "finance", "harare"],
    featured: true,
    status: "published"
  },
  // Add other demo posts...
];

async function migrateDemoPosts() {
  for (const post of demoPosts) {
    try {
      await createBlogPost(post);
      console.log(`Created post: ${post.title}`);
    } catch (error) {
      console.error(`Failed to create post ${post.title}:`, error);
    }
  }
}

migrateDemoPosts();
```

## Step 6: Update Your Components

### 6.1 Update Main Blog Page

Replace the demo data usage in `app/blog/page.tsx`:

```typescript
// Remove this line:
const [posts, setPosts] = useState<BlogPost[]>(demoBlogs);

// Replace with:
const [posts, setPosts] = useState<BlogPost[]>([]);
const blogApi = useBlogApi({
  onSuccess: (message) => toast({ title: "Success", description: message }),
  onError: (error) => toast({ title: "Error", description: error, variant: "destructive" })
});

// Add useEffect to load posts:
useEffect(() => {
  loadPosts();
}, []);

const loadPosts = async () => {
  const fetchedPosts = await blogApi.getAllPosts();
  if (fetchedPosts) {
    setPosts(fetchedPosts);
  }
};
```

### 6.2 Update Individual Post Page

Replace the demo data usage in `app/blog/[id]/page.tsx`:

```typescript
// Replace the fetchPost function:
const fetchPost = async (postId: string) => {
  try {
    setLoading(true);
    setError(false);
    
    const fetchedPost = await blogApi.getPost(postId);
    
    if (fetchedPost) {
      setPost(fetchedPost);
    } else {
      setError(true);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    setError(true);
  } finally {
    setLoading(false);
  }
};
```

## Step 7: Update Blog Editor Component

Enhance the `BlogPostEditor` component to use image uploads:

```typescript
// Add image upload functionality
const handleImageUpload = async (file: File) => {
  const imageUrl = await blogApi.uploadImage(file);
  if (imageUrl) {
    // Update the featured image field
    setFormData(prev => ({...prev, featuredImageUrl: imageUrl}));
  }
};
```

## Step 8: Production Checklist

- [ ] All environment variables are set in Vercel
- [ ] Database is created and accessible
- [ ] Blob storage is configured
- [ ] First deployment is successful
- [ ] Database tables are created automatically
- [ ] Image upload is working
- [ ] Blog CRUD operations work
- [ ] Admin functionality is secure

## Step 9: Security Considerations

### 9.1 Admin Authentication

Add proper admin authentication before allowing post creation/editing:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add your admin authentication logic here
  const isAdminRoute = request.nextUrl.pathname.startsWith('/api/blog') && 
                      ['POST', 'PUT', 'DELETE'].includes(request.method);
  
  if (isAdminRoute) {
    // Verify admin credentials
    // Return 401 if not authorized
  }
  
  return NextResponse.next();
}
```

### 9.2 Rate Limiting

Consider adding rate limiting for API endpoints to prevent abuse.

## Step 10: Monitoring and Maintenance

1. **Database Monitoring**: Monitor your Postgres usage in the Vercel dashboard
2. **Blob Storage**: Keep track of image storage usage
3. **Error Tracking**: Set up error monitoring (Sentry, LogRocket, etc.)
4. **Backups**: Regular database backups (Vercel handles this automatically)

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Verify environment variables are set correctly
   - Check if the database is accessible from your deployment region

2. **Image Upload Failures**:
   - Ensure BLOB_READ_WRITE_TOKEN is set
   - Check file size limits (5MB max)
   - Verify file types are allowed

3. **API Errors**:
   - Check server logs in Vercel dashboard
   - Verify API routes are deployed correctly

### Debug Commands:

```bash
# Test database connection locally
npx ts-node -e "
import { query } from './lib/db';
query('SELECT NOW()').then(r => console.log(r.rows[0]));
"

# Test blob upload locally
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-image.jpg"
```

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review environment variables
3. Test API endpoints individually
4. Check database connection and permissions

Your blog system is now ready for production with persistent storage!# Vercel Deployment Setup Guide

This guide will help you deploy your GRI blog with Vercel Postgres and Blob storage.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Node.js**: Version 18+ installed locally

## Step 1: Install Required Packages

Add the necessary dependencies to your project:

```bash
npm install pg @types/pg @vercel/blob
# or
pnpm add pg @types/pg @vercel/blob
```

## Step 2: Environment Variables

Create a `.env.local` file in your project root:

```env
# Database
POSTGRES_URL="your-postgres-connection-string"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url"
POSTGRES_USER="your-postgres-user"
POSTGRES_HOST="your-postgres-host"
POSTGRES_PASSWORD="your-postgres-password"
POSTGRES_DATABASE="your-postgres-database"

# Blob Storage
BLOB_READ_WRITE_TOKEN="your-blob-token"
```

## Step 3: Deploy to Vercel

### 3.1 Connect Your Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3.2 Add Storage

#### Add Postgres Database:
1. Go to your project dashboard
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name (e.g., "gri-blog-db")
6. Click "Create"

#### Add Blob Storage:
1. In the same "Storage" tab
2. Click "Create Database" again
3. Select "Blob"
4. Choose a name (e.g., "gri-blog-images")
5. Click "Create"

### 3.3 Environment Variables

After creating the databases, Vercel will automatically add the environment variables to your project. You can verify them in:

1. Project Settings → Environment Variables

## Step 4: Database Initialization

The database will be automatically initialized on the first API request. The system will:

1. Create the `blog_posts` table
2. Set up indexes for performance
3. Create triggers for automatic timestamp updates

## Step 5: Migrate Demo Data (Optional)

If you want to keep your existing demo posts, create a migration script:

```typescript
// scripts/migrate-demo-data.ts
import { createBlogPost } from '@/lib/services/blog';

const demoPosts = [
  {
    title: "Investment Analyst Internship (Harare) - Join GRI",
    content: "Your existing content...",
    excerpt: "Your existing excerpt...",
    author: "GRI Careers Team",
    tags: ["careers", "internship", "investment", "finance", "harare"],
    featured: true,
    status: "published"
  },
  // Add other demo posts...
];

async function migrateDemoPosts() {
  for (const post of demoPosts) {
    try {
      await createBlogPost(post);
      console.log(`Created post: ${post.title}`);
    } catch (error) {
      console.error(`Failed to create post ${post.title}:`, error);
    }
  }
}

migrateDemoPosts();
```

## Step 6: Update Your Components

### 6.1 Update Main Blog Page

Replace the demo data usage in `app/blog/page.tsx`:

```typescript
// Remove this line:
const [posts, setPosts] = useState<BlogPost[]>(demoBlogs);

// Replace with:
const [posts, setPosts] = useState<BlogPost[]>([]);
const blogApi = useBlogApi({
  onSuccess: (message) => toast({ title: "Success", description: message }),
  onError: (error) => toast({ title: "Error", description: error, variant: "destructive" })
});

// Add useEffect to load posts:
useEffect(() => {
  loadPosts();
}, []);

const loadPosts = async () => {
  const fetchedPosts = await blogApi.getAllPosts();
  if (fetchedPosts) {
    setPosts(fetchedPosts);
  }
};
```

### 6.2 Update Individual Post Page

Replace the demo data usage in `app/blog/[id]/page.tsx`:

```typescript
// Replace the fetchPost function:
const fetchPost = async (postId: string) => {
  try {
    setLoading(true);
    setError(false);
    
    const fetchedPost = await blogApi.getPost(postId);
    
    if (fetchedPost) {
      setPost(fetchedPost);
    } else {
      setError(true);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    setError(true);
  } finally {
    setLoading(false);
  }
};
```

## Step 7: Update Blog Editor Component

Enhance the `BlogPostEditor` component to use image uploads:

```typescript
// Add image upload functionality
const handleImageUpload = async (file: File) => {
  const imageUrl = await blogApi.uploadImage(file);
  if (imageUrl) {
    // Update the featured image field
    setFormData(prev => ({...prev, featuredImageUrl: imageUrl}));
  }
};
```

## Step 8: Production Checklist

- [ ] All environment variables are set in Vercel
- [ ] Database is created and accessible
- [ ] Blob storage is configured
- [ ] First deployment is successful
- [ ] Database tables are created automatically
- [ ] Image upload is working
- [ ] Blog CRUD operations work
- [ ] Admin functionality is secure

## Step 9: Security Considerations

### 9.1 Admin Authentication

Add proper admin authentication before allowing post creation/editing:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add your admin authentication logic here
  const isAdminRoute = request.nextUrl.pathname.startsWith('/api/blog') && 
                      ['POST', 'PUT', 'DELETE'].includes(request.method);
  
  if (isAdminRoute) {
    // Verify admin credentials
    // Return 401 if not authorized
  }
  
  return NextResponse.next();
}
```

### 9.2 Rate Limiting

Consider adding rate limiting for API endpoints to prevent abuse.

## Step 10: Monitoring and Maintenance

1. **Database Monitoring**: Monitor your Postgres usage in the Vercel dashboard
2. **Blob Storage**: Keep track of image storage usage
3. **Error Tracking**: Set up error monitoring (Sentry, LogRocket, etc.)
4. **Backups**: Regular database backups (Vercel handles this automatically)

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**:
   - Verify environment variables are set correctly
   - Check if the database is accessible from your deployment region

2. **Image Upload Failures**:
   - Ensure BLOB_READ_WRITE_TOKEN is set
   - Check file size limits (5MB max)
   - Verify file types are allowed

3. **API Errors**:
   - Check server logs in Vercel dashboard
   - Verify API routes are deployed correctly

### Debug Commands:

```bash
# Test database connection locally
npx ts-node -e "
import { query } from './lib/db';
query('SELECT NOW()').then(r => console.log(r.rows[0]));
"

# Test blob upload locally
curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-image.jpg"
```

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review environment variables
3. Test API endpoints individually
4. Check database connection and permissions

Your blog system is now ready for production with persistent storage!