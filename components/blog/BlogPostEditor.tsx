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
import { X, Plus, Save, Eye, Bold, Italic, Code, Table, Quote, List, Minus } from "lucide-react";
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
  const [contentTextarea, setContentTextarea] = useState<HTMLTextAreaElement | null>(null);

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

  // Formatting helper functions
  const insertAtCursor = (textToInsert: string, wrapSelection = false) => {
    if (!contentTextarea) return;

    const start = contentTextarea.selectionStart;
    const end = contentTextarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText;
    if (wrapSelection && selectedText) {
      newText = content.substring(0, start) + textToInsert + selectedText + textToInsert + content.substring(end);
    } else {
      newText = content.substring(0, start) + textToInsert + content.substring(end);
    }
    
    setContent(newText);
    
    // Restore cursor position
    setTimeout(() => {
      const newPosition = start + textToInsert.length + (wrapSelection && selectedText ? selectedText.length : 0);
      contentTextarea.setSelectionRange(newPosition, newPosition);
      contentTextarea.focus();
    }, 0);
  };

  const formatBold = () => insertAtCursor("**", true);
  const formatItalic = () => insertAtCursor("*", true);
  const formatCode = () => insertAtCursor("`", true);
  const insertHeading = (level: number) => insertAtCursor(`\n${"#".repeat(level)} `);
  const insertList = () => insertAtCursor("\n- ");
  const insertQuote = () => insertAtCursor("\n> ");
  const insertDivider = () => insertAtCursor("\n---\n");
  const insertTable = () => {
    const table = "\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n";
    insertAtCursor(table);
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
      featuredImageUrl: featuredImage.trim() || undefined,
      featuredImageAlt: imageAlt.trim() || undefined,
    };

    if (post) {
      // For updates, include the id and make all fields required for consistency
      onSave({ 
        id: post.id,
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        author: postData.author,
        tags: postData.tags,
        featured: postData.featured,
        featuredImageUrl: postData.featuredImageUrl,
        featuredImageAlt: postData.featuredImageAlt
      } as UpdateBlogPostRequest);
    } else {
      onSave(postData as CreateBlogPostRequest);
    }
  };

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let tableRows: string[] = [];
    let inTable = false;
    let listItems: string[] = [];
    let inList = false;

    const processTable = () => {
      if (tableRows.length > 0) {
        const headers = tableRows[0].split("|").map(h => h.trim()).filter(h => h);
        const rows = tableRows.slice(2).map(row => 
          row.split("|").map(cell => cell.trim()).filter(cell => cell)
        );

        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td key={j} className="border border-gray-300 px-4 py-2"
                          dangerouslySetInnerHTML={{ __html: formatText(cell) }}>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const processList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc ml-6 mb-4">
            {listItems.map((item, i) => (
              <li key={i} className="mb-1"
                  dangerouslySetInnerHTML={{ __html: formatText(item) }}>
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const formatText = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');
        // Note: Image handling is now done separately in the main content processing
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle table rows
      if (trimmedLine.includes("|") && (trimmedLine.startsWith("|") || trimmedLine.split("|").length > 2)) {
        if (!inList) processList();
        if (!inTable) inTable = true;
        tableRows.push(trimmedLine);
        return;
      } else if (inTable) {
        processTable();
      }

      // Handle list items
      if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        if (!inTable) processTable();
        if (!inList) inList = true;
        listItems.push(trimmedLine.slice(2));
        return;
      } else if (inList) {
        processList();
      }

      // Handle headings
      if (trimmedLine.startsWith("# ")) {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(
          <h1 key={index} className="text-3xl font-bold mb-4 mt-6">
            {trimmedLine.slice(2)}
          </h1>
        );
        return;
      }

      if (trimmedLine.startsWith("## ")) {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mb-3 mt-5">
            {trimmedLine.slice(3)}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith("### ")) {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(
          <h3 key={index} className="text-xl font-medium mb-2 mt-4">
            {trimmedLine.slice(4)}
          </h3>
        );
        return;
      }

      // Handle blockquotes
      if (trimmedLine.startsWith("> ")) {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">
            <p dangerouslySetInnerHTML={{ __html: formatText(trimmedLine.slice(2)) }} />
          </blockquote>
        );
        return;
      }

      // Handle code blocks
      if (trimmedLine.startsWith("```")) {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(
          <div key={index} className="bg-gray-900 text-white p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
            <code>{trimmedLine.slice(3)}</code>
          </div>
        );
        return;
      }

      // Handle horizontal rules
      if (trimmedLine === "---" || trimmedLine === "***") {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(<hr key={index} className="my-6 border-gray-300" />);
        return;
      }

      // Handle images first
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      if (imageRegex.test(trimmedLine)) {
        if (inTable) processTable();
        if (inList) processList();
        const imageFormatted = trimmedLine.replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4 mx-auto block" style="max-height: 400px; object-fit: contain;" />'
        );
        elements.push(
          <div
            key={index}
            className="mb-6 text-center"
            dangerouslySetInnerHTML={{ __html: imageFormatted }}
          />
        );
        return;
      }

      // Handle empty lines
      if (trimmedLine === "") {
        if (inTable) processTable();
        if (inList) processList();
        elements.push(<br key={index} />);
        return;
      }

      // Handle regular paragraphs
      if (!inTable && !inList) {
        elements.push(
          <p
            key={index}
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: formatText(line) }}
          />
        );
      }
    });

    // Process any remaining table or list
    if (inTable) processTable();
    if (inList) processList();

    return elements;
  };

  const isValid =
    title.trim() && content.trim() && excerpt.trim() && author.trim();

  // Debug info for form validation
  const validationDebug = {
    title: !!title.trim(),
    content: !!content.trim(),
    excerpt: !!excerpt.trim(),
    author: !!author.trim(),
    overall: isValid
  };

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
                title={`${!isValid ? 'Fill all required fields' : ''} ${isLoading ? 'Saving...' : ''}`}
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Post"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Debug Panel (temporary) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-gray-100 rounded text-xs text-gray-600">
              <strong>Debug Info:</strong> Valid: {validationDebug.overall.toString()} | 
              Title: {validationDebug.title.toString()} | 
              Content: {validationDebug.content.toString()} | 
              Excerpt: {validationDebug.excerpt.toString()} | 
              Author: {validationDebug.author.toString()}
            </div>
          )}
          
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
                
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-muted/50">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertHeading(1)}
                    title="Heading 1"
                  >
                    H1
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertHeading(2)}
                    title="Heading 2"
                  >
                    H2
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertHeading(3)}
                    title="Heading 3"
                  >
                    H3
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={formatBold}
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={formatItalic}
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={formatCode}
                    title="Inline Code"
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={insertList}
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={insertQuote}
                    title="Quote"
                  >
                    <Quote className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={insertTable}
                    title="Table"
                  >
                    <Table className="w-4 h-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={insertDivider}
                    title="Horizontal Line"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>

                <Textarea
                  ref={setContentTextarea}
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog post content here..."
                  className="min-h-[300px] font-mono rounded-t-none"
                />
                <div className="text-xs text-muted-foreground mt-1 space-y-1">
                  <p><strong>Markdown Support:</strong></p>
                  <p>• Headlines: # H1, ## H2, ### H3</p>
                  <p>• Text: **bold**, *italic*, `code`</p>
                  <p>• Lists: - item or * item</p>
                  <p>• Images: ![alt text](image-url)</p>
                  <p>• Tables: | Header | Header | (with separator line)</p>
                  <p>• Quotes: > quote text</p>
                  <p>• Code blocks: ```language</p>
                  <p>• Dividers: --- or ***</p>
                </div>
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