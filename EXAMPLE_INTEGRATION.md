# Example: Converting Your Blog to Use Vercel Storage

Here's how to update your existing blog components to use the new Vercel storage backend.

## Option 1: Quick Migration (Recommended)

### Update Main Blog Page (`app/blog/page.tsx`)

Add these imports at the top:
```typescript
import { useBlogApi } from '@/hooks/use-blog-api';
```

Replace this section:
```typescript
// OLD - Remove this:
const [posts, setPosts] = useState<BlogPost[]>(demoBlogs);

// NEW - Add this:
const [posts, setPosts] = useState<BlogPost[]>([]);
const blogApi = useBlogApi({
  onSuccess: (message) => toast({ title: "Success", description: message }),
  onError: (error) => toast({ title: "Error", description: error, variant: "destructive" })
});

// Add this useEffect:
useEffect(() => {
  loadPosts();
}, []);

const loadPosts = async () => {
  setLoading(true);
  const fetchedPosts = await blogApi.getAllPosts();
  if (fetchedPosts) {
    setPosts(fetchedPosts);
  }
  setLoading(false);
};
```

Update the handleSavePost function:
```typescript
const handleSavePost = async (postData: any) => {
  setSaving(true);
  
  try {
    if (editingPost) {
      // Update existing post
      const updated = await blogApi.updatePost(editingPost.id, postData);
      if (updated) {
        setPosts(prev => prev.map(p => p.id === editingPost.id ? updated : p));
      }
    } else {
      // Create new post
      const newPost = await blogApi.createPost({
        ...postData,
        author: "GRI Team",
        status: "published"
      });
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
      }
    }
    
    setShowEditor(false);
    setEditingPost(null);
  } catch (error) {
    console.error('Error saving post:', error);
  } finally {
    setSaving(false);
  }
};
```

Update the handleDeletePost function:
```typescript
const handleDeletePost = async () => {
  if (!postToDelete) return;
  
  const success = await blogApi.deletePost(postToDelete);
  if (success) {
    setPosts(prev => prev.filter(p => p.id !== postToDelete));
  }
  
  setDeleteDialogOpen(false);
  setPostToDelete(null);
};
```

### Update Individual Post Page (`app/blog/[id]/page.tsx`)

Add these imports:
```typescript
import { useBlogApi } from '@/hooks/use-blog-api';
```

Replace the demo data and fetchPost function:
```typescript
// OLD - Remove the demoBlogs array completely

// NEW - Add this:
const blogApi = useBlogApi({
  onError: (error) => toast({ title: "Error", description: error, variant: "destructive" })
});

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

## Option 2: Gradual Migration

If you want to migrate gradually, you can keep the demo data as fallback:

```typescript
const [posts, setPosts] = useState<BlogPost[]>(demoBlogs); // Keep demo data
const [usingApi, setUsingApi] = useState(false);

useEffect(() => {
  // Try to load from API, fallback to demo data
  loadPostsFromApi();
}, []);

const loadPostsFromApi = async () => {
  try {
    const fetchedPosts = await blogApi.getAllPosts();
    if (fetchedPosts && fetchedPosts.length > 0) {
      setPosts(fetchedPosts);
      setUsingApi(true);
    }
    // If API fails or returns no posts, keep using demo data
  } catch (error) {
    console.log('Using demo data as fallback');
  }
};
```

## Image Upload Component

Create a new image upload component:

```typescript
// components/ImageUpload.tsx
import { useState } from 'react';
import { useBlogApi } from '@/hooks/use-blog-api';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageUploaded, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const blogApi = useBlogApi();

  const handleUpload = async (file: File) => {
    setUploading(true);
    const url = await blogApi.uploadImage(file);
    if (url) {
      onImageUploaded(url);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={uploading}
      />
      {currentImage && (
        <img src={currentImage} alt="Featured" className="max-w-xs rounded" />
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

## Testing Your Migration

### 1. Test Local Development
```bash
# Make sure you have the required packages
npm install pg @types/pg @vercel/blob

# Test locally (will use demo data until deployed)
npm run dev
```

### 2. Test After Deployment
```bash
# Deploy to Vercel
vercel --prod

# Test creating a post via admin
# Test viewing individual posts
# Test image uploads
```

### 3. Migration Checklist

- [ ] Packages installed (`pg`, `@types/pg`, `@vercel/blob`)
- [ ] Environment variables set in Vercel
- [ ] Database created in Vercel dashboard
- [ ] Blob storage created in Vercel dashboard
- [ ] Blog page updated to use API
- [ ] Individual post page updated
- [ ] Image upload working
- [ ] Admin can create/edit/delete posts
- [ ] Posts persist after refresh
- [ ] Public users can view posts

## Rollback Plan

If something goes wrong, you can quickly rollback:

1. **Revert blog pages** to use `demoBlogs` array
2. **Remove API calls** and use local state
3. **Deploy the rollback** version

Keep your demo data arrays as backup until you're confident the API is working perfectly.

## Next Steps

Once your basic blog is working with Vercel storage:

1. **Add search functionality** using the API
2. **Implement pagination** for better performance
3. **Add draft/published status** management
4. **Set up automated backups**
5. **Add analytics** to track blog performance
6. **Implement SEO optimizations**

Your blog is now production-ready with persistent storage!# Example: Converting Your Blog to Use Vercel Storage

Here's how to update your existing blog components to use the new Vercel storage backend.

## Option 1: Quick Migration (Recommended)

### Update Main Blog Page (`app/blog/page.tsx`)

Add these imports at the top:
```typescript
import { useBlogApi } from '@/hooks/use-blog-api';
```

Replace this section:
```typescript
// OLD - Remove this:
const [posts, setPosts] = useState<BlogPost[]>(demoBlogs);

// NEW - Add this:
const [posts, setPosts] = useState<BlogPost[]>([]);
const blogApi = useBlogApi({
  onSuccess: (message) => toast({ title: "Success", description: message }),
  onError: (error) => toast({ title: "Error", description: error, variant: "destructive" })
});

// Add this useEffect:
useEffect(() => {
  loadPosts();
}, []);

const loadPosts = async () => {
  setLoading(true);
  const fetchedPosts = await blogApi.getAllPosts();
  if (fetchedPosts) {
    setPosts(fetchedPosts);
  }
  setLoading(false);
};
```

Update the handleSavePost function:
```typescript
const handleSavePost = async (postData: any) => {
  setSaving(true);
  
  try {
    if (editingPost) {
      // Update existing post
      const updated = await blogApi.updatePost(editingPost.id, postData);
      if (updated) {
        setPosts(prev => prev.map(p => p.id === editingPost.id ? updated : p));
      }
    } else {
      // Create new post
      const newPost = await blogApi.createPost({
        ...postData,
        author: "GRI Team",
        status: "published"
      });
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
      }
    }
    
    setShowEditor(false);
    setEditingPost(null);
  } catch (error) {
    console.error('Error saving post:', error);
  } finally {
    setSaving(false);
  }
};
```

Update the handleDeletePost function:
```typescript
const handleDeletePost = async () => {
  if (!postToDelete) return;
  
  const success = await blogApi.deletePost(postToDelete);
  if (success) {
    setPosts(prev => prev.filter(p => p.id !== postToDelete));
  }
  
  setDeleteDialogOpen(false);
  setPostToDelete(null);
};
```

### Update Individual Post Page (`app/blog/[id]/page.tsx`)

Add these imports:
```typescript
import { useBlogApi } from '@/hooks/use-blog-api';
```

Replace the demo data and fetchPost function:
```typescript
// OLD - Remove the demoBlogs array completely

// NEW - Add this:
const blogApi = useBlogApi({
  onError: (error) => toast({ title: "Error", description: error, variant: "destructive" })
});

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

## Option 2: Gradual Migration

If you want to migrate gradually, you can keep the demo data as fallback:

```typescript
const [posts, setPosts] = useState<BlogPost[]>(demoBlogs); // Keep demo data
const [usingApi, setUsingApi] = useState(false);

useEffect(() => {
  // Try to load from API, fallback to demo data
  loadPostsFromApi();
}, []);

const loadPostsFromApi = async () => {
  try {
    const fetchedPosts = await blogApi.getAllPosts();
    if (fetchedPosts && fetchedPosts.length > 0) {
      setPosts(fetchedPosts);
      setUsingApi(true);
    }
    // If API fails or returns no posts, keep using demo data
  } catch (error) {
    console.log('Using demo data as fallback');
  }
};
```

## Image Upload Component

Create a new image upload component:

```typescript
// components/ImageUpload.tsx
import { useState } from 'react';
import { useBlogApi } from '@/hooks/use-blog-api';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageUploaded, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const blogApi = useBlogApi();

  const handleUpload = async (file: File) => {
    setUploading(true);
    const url = await blogApi.uploadImage(file);
    if (url) {
      onImageUploaded(url);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={uploading}
      />
      {currentImage && (
        <img src={currentImage} alt="Featured" className="max-w-xs rounded" />
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

## Testing Your Migration

### 1. Test Local Development
```bash
# Make sure you have the required packages
npm install pg @types/pg @vercel/blob

# Test locally (will use demo data until deployed)
npm run dev
```

### 2. Test After Deployment
```bash
# Deploy to Vercel
vercel --prod

# Test creating a post via admin
# Test viewing individual posts
# Test image uploads
```

### 3. Migration Checklist

- [ ] Packages installed (`pg`, `@types/pg`, `@vercel/blob`)
- [ ] Environment variables set in Vercel
- [ ] Database created in Vercel dashboard
- [ ] Blob storage created in Vercel dashboard
- [ ] Blog page updated to use API
- [ ] Individual post page updated
- [ ] Image upload working
- [ ] Admin can create/edit/delete posts
- [ ] Posts persist after refresh
- [ ] Public users can view posts

## Rollback Plan

If something goes wrong, you can quickly rollback:

1. **Revert blog pages** to use `demoBlogs` array
2. **Remove API calls** and use local state
3. **Deploy the rollback** version

Keep your demo data arrays as backup until you're confident the API is working perfectly.

## Next Steps

Once your basic blog is working with Vercel storage:

1. **Add search functionality** using the API
2. **Implement pagination** for better performance
3. **Add draft/published status** management
4. **Set up automated backups**
5. **Add analytics** to track blog performance
6. **Implement SEO optimizations**

Your blog is now production-ready with persistent storage!