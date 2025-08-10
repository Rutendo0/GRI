"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlogPost as BlogPostType } from "@/lib/types/blog";
import { useAdmin } from "@/contexts/AdminContext";
import { AdminToggle } from "@/components/blog/AdminToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Star,
  Edit,
  Trash2,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { ProfessionalLoading } from "@/components/professional-loading";

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  // Load post from API
  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch(`/api/blog/${id}`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error('Error loading post:', error);
        setError(true);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Handle headings
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-4xl font-bold mb-6 mt-8 text-slate-900">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-3xl font-semibold mb-4 mt-8 text-slate-800">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-2xl font-medium mb-3 mt-6 text-slate-700">
            {line.slice(4)}
          </h3>
        );
      }
      
      // Handle lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 text-slate-700 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      
      // Handle empty lines
      if (trimmedLine === "") {
        return <br key={index} />;
      }
      
      // Handle images first - check if line contains image markdown
      if (line.includes('![') && line.includes('](')) {
        const imageFormatted = line.replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-lg my-6 mx-auto block" style="max-height: 500px; object-fit: contain; border: 1px solid #e5e7eb;" />'
        );
        return (
          <div
            key={index}
            className="mb-8 text-center bg-gray-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: imageFormatted }}
          />
        );
      }

      // Handle bold text and other formatting, but NOT images
      let formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
      
      // If this line still contains image markdown after processing, it means it wasn't caught above
      // Let's handle it here as a fallback
      if (formatted.includes('![') && formatted.includes('](')) {
        formatted = formatted.replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-lg my-6 mx-auto block" style="max-height: 500px; object-fit: contain; border: 1px solid #e5e7eb;" />'
        );
        return (
          <div
            key={index}
            className="mb-8 text-center bg-gray-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      }
      
      return (
        <p
          key={index}
          className="mb-4 text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <ScrollHeader />
        <div className="container mx-auto px-4 pt-24 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <ProfessionalLoading className="h-96" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <ScrollHeader />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Return to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ScrollHeader />
      
      {/* Header */}
      <div className="border-b bg-white pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>

            {isAdmin && (
              <AdminToggle />
            )}
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              {post.featured && (
                <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={post.featuredImage}
                  alt={post.imageAlt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {post.imageAlt && (
                <p className="text-sm text-muted-foreground mt-2 text-center italic">
                  {post.imageAlt}
                </p>
              )}
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg prose-slate max-w-none">
            {formatContent(post.content)}
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {formatDate(post.updatedAt)}
              </div>
            </div>
          </footer>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}