"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BlogPost,
  GetBlogPostsResponse,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  BlogPostResponse,
  DeleteBlogPostResponse,
} from "@/lib/types/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostEditor } from "@/components/blog/BlogPostEditor";
import { AdminToggle } from "@/components/blog/AdminToggle";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Sparkles, BookOpen, Users, Zap, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProfessionalLoading } from "@/components/professional-loading";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollProgress } from "@/components/scroll-progress";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAdmin();

  // Clear any unwanted search terms on mount
  useEffect(() => {
    // Clear search if it contains email-like patterns
    if (searchTerm.includes('@') || searchTerm.includes('.com')) {
      setSearchTerm('');
    }
  }, []);

  // Load posts from API
  useEffect(() => {
    loadPosts();
  }, [isAdmin]); // Reload when admin status changes

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Include unpublished posts when in admin mode
      const url = isAdmin ? '/api/blog?includeUnpublished=true' : '/api/blog';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        throw new Error('Failed to load posts');
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Define categories
  const categories = ["business", "careers", "news", "technology", "agriculture", "sustainability"];
  
  // Filter posts based on search, tags, and categories
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    const matchesCategory = selectedCategory === null || post.tags.some(tag => 
      selectedCategory.toLowerCase() === tag.toLowerCase() || 
      (selectedCategory === "business" && ["investment", "economy", "markets"].includes(tag)) ||
      (selectedCategory === "careers" && ["employment", "remote-work"].includes(tag)) ||
      (selectedCategory === "news" && ["mining", "economy"].includes(tag)) ||
      (selectedCategory === "technology" && ["ai", "blockchain"].includes(tag))
    );
    
    return matchesSearch && matchesTag && matchesCategory;
  });





  // Handle create/update post
  const handleSavePost = async (
    postData: CreateBlogPostRequest | UpdateBlogPostRequest,
  ) => {
    try {
      setSaving(true);
      const isUpdate = "id" in postData;

      let response;
      if (isUpdate) {
        // Update existing post
        response = await fetch(`/api/blog/${postData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      } else {
        // Create new post
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save post');
      }

      toast({
        title: "Success",
        description: isUpdate ? "Post updated successfully!" : "Post created successfully!",
      });
      
      setShowEditor(false);
      setEditingPost(null);
      
      // Reload posts
      await loadPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle delete post
  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const response = await fetch(`/api/blog/${postToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }

      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
      
      // Remove post from state instead of reloading all posts
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete blog post",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  // Handle delete button click
  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  // Handle edit post
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  // Handle new post
  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  // Filter featured posts
  const featuredPosts = posts.filter((post) => post.featured);

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background">
        <BlogPostEditor
          post={editingPost || undefined}
          onSave={handleSavePost}
          onCancel={() => {
            setShowEditor(false);
            setEditingPost(null);
          }}
          isLoading={saving}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ScrollHeader />
      
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/blog.jfif"
            alt="GRI Blog - Business insights and opportunities"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-8 h-8 text-white" />
                <span className="text-white font-medium text-lg">GRI Blog</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 drop-shadow-lg">
                Insights & Innovation
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed drop-shadow-md">
                {isAdmin ? "Share insights on business opportunities, career development, industry news, and technological innovations shaping Africa's future. Built for professionals and thought leaders." : "Stay informed with the latest business opportunities, career insights, industry news, and technological innovations driving Africa's economic transformation."}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <AdminToggle />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-sm text-white/80">Total Posts</div>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{featuredPosts.length}</div>
              <div className="text-sm text-white/80">Featured</div>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{allTags.length}</div>
              <div className="text-sm text-white/80">Topics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">


          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 focus:border-primary"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="capitalize"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <Button onClick={handleNewPost} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            )}
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Filter by tag:</span>
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  All Tags
                </Button>
                {allTags.slice(0, 10).map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
                {selectedTag && !allTags.slice(0, 10).includes(selectedTag) && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                  >
                    {selectedTag}
                    <X className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <ProfessionalLoading className="h-96" />
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-4">
                {posts.length === 0 ? "No posts yet" : "No posts found"}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {posts.length === 0 
                  ? "Be the first to share insights and knowledge with the community."
                  : "Try adjusting your search terms or filters to find what you're looking for."
                }
              </p>
              {isAdmin && posts.length === 0 && (
                <Button onClick={handleNewPost} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  onEdit={isAdmin ? handleEditPost : undefined}
                  onDelete={isAdmin ? handleDeleteClick : undefined}
                  showActions={isAdmin}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}