
"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  altValue?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onAltChange,
  altValue = "",
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(value || "");
  const [useUrl, setUseUrl] = useState(true);

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      // For demo purposes, we'll just use a placeholder URL
      const placeholderUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&q=80`;
      onChange(placeholderUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const clearImage = () => {
    onChange("");
    setUrlInput("");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          variant={useUrl ? "default" : "outline"}
          size="sm"
          onClick={() => setUseUrl(true)}
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          URL
        </Button>
        <Button
          type="button"
          variant={!useUrl ? "default" : "outline"}
          size="sm"
          onClick={() => setUseUrl(false)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      {useUrl ? (
        <div className="flex gap-2">
          <Input
            placeholder="Enter image URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
          />
          <Button type="button" onClick={handleUrlSubmit} size="sm">
            Add
          </Button>
        </div>
      ) : (
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileUpload(file);
              }
            }}
            disabled={uploading}
          />
          {uploading && (
            <p className="text-sm text-muted-foreground mt-2">
              Uploading image...
            </p>
          )}
        </div>
      )}

      {value && (
        <div className="space-y-2">
          <div className="relative inline-block">
            <img
              src={value}
              alt={altValue || "Featured image"}
              className="max-w-xs max-h-48 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2"
              onClick={clearImage}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          
          {onAltChange && (
            <div>
              <Label htmlFor="imageAlt">Image Alt Text</Label>
              <Input
                id="imageAlt"
                placeholder="Describe the image for accessibility..."
                value={altValue}
                onChange={(e) => onAltChange(e.target.value)}
                className="mt-1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
