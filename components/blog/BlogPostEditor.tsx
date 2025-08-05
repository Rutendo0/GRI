"use client"

import { useState, useEffect } from "react";
import {
  BlogPost,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
} from "@/lib/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { X, Plus, Save, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (postData: CreateBlogPostRequest | UpdateBlogPostRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BlogPostEditor({
  post,
  onSave,
  onCancel,
  isLoading = false,
}: BlogPostEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [featured, setFeatured] = useState(post?.featured || false);
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || "");
  const [imageAlt, setImageAlt] = useState(post?.imageAlt || "");
  const [newTag, setNewTag] = useState("");
  const [preview, setPreview] = useState(false);

  // Auto-generate excerpt from content if not provided
  useEffect(() => {
    if (!excerpt && content) {
      const plainText = content.replace(/[#*`]/g, "").trim();
      const firstParagraph = plainText.split("\n\n")[0];
      const truncated =
        firstParagraph.length > 160
          ? firstParagraph.substring(0, 160) + "..."
          : firstParagraph;
      setExcerpt(truncated);
    }
  }, [content, excerpt]);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !excerpt.trim() || !author.trim()) {
      return;
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim(),
      author: author.trim(),
      tags,
      featured,
      featuredImage: featuredImage.trim() || undefined,
      imageAlt: imageAlt.trim() || undefined,
    };

    if (post) {
      onSave({ ...postData, id: post.id } as UpdateBlogPostRequest);
    } else {
      onSave(postData as CreateBlogPostRequest);
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mb-4 mt-6">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold mb-3 mt-5">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-medium mb-2 mt-4">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      // Handle bold text
      const boldFormatted = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      return (
        <p
          key={index}
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: boldFormatted }}
        />
      );
    });
  };

  const isValid =
    title.trim() && content.trim() && excerpt.trim() && author.trim();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {post ? "Edit Post" : "Create New Post"}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {preview ? "Edit" : "Preview"}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!isValid || isLoading}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Post"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!preview ? (
            <>
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="text-lg mt-1"
                />
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  className="mt-1 min-h-[80px]"
                />
              </div>

              {/* Author */}
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  className="mt-1"
                />
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog post content here..."
                  className="mt-1 min-h-[300px] font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports basic markdown: # Heading 1, ## Heading 2, ### Heading 3, **bold**, - bullet points
                </p>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              <div>
                <Label>Featured Image</Label>
                <ImageUpload
                  value={featuredImage}
                  onChange={setFeaturedImage}
                  onAltChange={setImageAlt}
                  altValue={imageAlt}
                  className="mt-1"
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured">Mark as featured post</Label>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* Preview Mode */}
              <div className="bg-muted/50 rounded-lg p-6">
                <Badge className="mb-4">Preview Mode</Badge>
                
                {featuredImage && (
                  <div className="aspect-video overflow-hidden rounded-lg mb-6">
                    <img
                      src={featuredImage}
                      alt={imageAlt || title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  {featured && (
                    <Badge className="bg-yellow-500 text-yellow-900">
                      Featured
                    </Badge>
                  )}
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl font-bold mb-4">{title || "Untitled"}</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {excerpt || "No excerpt provided"}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  by {author || "Unknown Author"}
                </p>

                <div className="prose prose-slate max-w-none">
                  {formatContent(content || "No content provided")}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}