import { useState, useCallback } from 'react';
import { BlogPost, CreateBlogPostRequest, UpdateBlogPostRequest } from '@/lib/types/blog';

interface UseBlogApiOptions {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

export function useBlogApi(options: UseBlogApiOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async <T>(
    requestFn: () => Promise<T>,
    loadingState = true
  ): Promise<T | null> => {
    try {
      if (loadingState) setLoading(true);
      setError(null);
      
      const result = await requestFn();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      if (loadingState) setLoading(false);
    }
  };

  // Get all blog posts
  const getAllPosts = useCallback(async (params?: {
    search?: string;
    tag?: string;
    featured?: boolean;
    includeUnpublished?: boolean;
  }): Promise<BlogPost[] | null> => {
    return handleRequest(async () => {
      const queryParams = new URLSearchParams();
      
      if (params?.search) queryParams.append('search', params.search);
      if (params?.tag) queryParams.append('tag', params.tag);
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.includeUnpublished) queryParams.append('includeUnpublished', 'true');

      const response = await fetch(`/api/blog?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.posts;
    });
  }, []);

  // Get single blog post
  const getPost = useCallback(async (id: string): Promise<BlogPost | null> => {
    return handleRequest(async () => {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Post not found');
        }
        throw new Error(`Failed to fetch post: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.post;
    });
  }, []);

  // Create new blog post
  const createPost = useCallback(async (postData: CreateBlogPostRequest): Promise<BlogPost | null> => {
    return handleRequest(async () => {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to create post: ${response.statusText}`);
      }

      const data = await response.json();
      options.onSuccess?.('Post created successfully');
      return data.post;
    });
  }, [options]);

  // Update blog post
  const updatePost = useCallback(async (
    id: string, 
    postData: UpdateBlogPostRequest
  ): Promise<BlogPost | null> => {
    return handleRequest(async () => {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update post: ${response.statusText}`);
      }

      const data = await response.json();
      options.onSuccess?.('Post updated successfully');
      return data.post;
    });
  }, [options]);

  // Delete blog post
  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    const result = await handleRequest(async () => {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete post: ${response.statusText}`);
      }

      options.onSuccess?.('Post deleted successfully');
      return true;
    });

    return result !== null;
  }, [options]);

  // Upload image
  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    return handleRequest(async () => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      return data.url;
    });
  }, []);

  return {
    loading,
    error,
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    uploadImage,
    clearError: () => setError(null),
  };
}