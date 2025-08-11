"use client"

import { BlogPost } from "@/lib/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Trash2, Star } from "lucide-react";
import Link from "next/link";

interface BlogPostCardProps {
  post: BlogPost;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (postId: string) => void;
  showActions?: boolean;
}

export function BlogPostCard({
  post,
  onEdit,
  onDelete,
  showActions = true,
}: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryFromTags = (tags: string[]) => {
    const categoryMap: { [key: string]: string } = {
      "business": "Business",
      "investment": "Business", 
      "economy": "Business",
      "markets": "Business",
      "careers": "Careers",
      "employment": "Careers",
      "remote-work": "Careers",
      "news": "News",
      "mining": "News",
      "technology": "Technology",
      "ai": "Technology",
      "blockchain": "Technology",
      "agriculture": "Agriculture",
      "sustainability": "Sustainability"
    };
    
    for (const tag of tags) {
      if (categoryMap[tag.toLowerCase()]) {
        return categoryMap[tag.toLowerCase()];
      }
    }
    return "General";
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Business": "bg-blue-100 text-blue-800",
      "Careers": "bg-green-100 text-green-800", 
      "News": "bg-red-100 text-red-800",
      "Technology": "bg-purple-100 text-purple-800",
      "Agriculture": "bg-yellow-100 text-yellow-800",
      "Sustainability": "bg-emerald-100 text-emerald-800",
      "General": "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors["General"];
  };

  const category = getCategoryFromTags(post.tags);

  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-500 cursor-pointer h-full hover:-translate-y-1 border-0 shadow-md">
        {post.featuredImage && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.featuredImage}
              alt={post.imageAlt || post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className={`${getCategoryColor(category)} border-0 font-medium`}>
                {category}
              </Badge>
              {post.featured && (
                <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

          </div>
        )}
        
        <CardHeader className="pb-3 space-y-3 p-4 sm:p-6">
          {!post.featuredImage && (
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(category)} border-0 font-medium text-xs`}>
                {category}
              </Badge>
              {post.featured && (
                <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          )}
          
          <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {post.title}
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{post.readingTime} min read</span>
            </div>
          </div>
          
          {showActions && (onEdit || onDelete) && (
            <div className="flex gap-2 mt-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(post);
                  }}
                  className="h-8 w-8 p-0"
                  title="Edit post"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(post.id);
                  }}
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pt-0 space-y-4 p-4 sm:p-6">
          <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm sm:text-base">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal hover:bg-secondary/80 transition-colors">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground">
              by <span className="font-semibold text-foreground">{post.author}</span>
            </p>
            <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors self-end sm:self-auto">
              Read more →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}