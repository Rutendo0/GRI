"use client"

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, HardDrive, Wifi } from "lucide-react";

export function SystemStatus() {
  const [status, setStatus] = useState<{
    mode: 'demo' | 'production' | 'unknown';
    database: boolean;
    imageStorage: string;
    features: string[];
  }>({
    mode: 'unknown',
    database: false,
    imageStorage: 'checking',
    features: []
  });

  useEffect(() => {
    // Check system status by making a test API call
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/blog');
        
        if (!response.ok) {
          // If API fails, check if it's a database connection issue
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 500) {
            setStatus({
              mode: 'unknown',
              database: false,
              imageStorage: 'Not configured',
              features: ['Database Setup Required']
            });
            return;
          }
        }
        
        const data = await response.json();
        
        // Check if we have any posts and if they're from database
        const hasPosts = data.posts && data.posts.length > 0;
        const hasDatabase = hasPosts && !data.posts.some((post: any) => post.id.startsWith('demo-'));
        
        setStatus({
          mode: hasDatabase ? 'production' : (hasPosts ? 'demo' : 'production'),
          database: hasDatabase || !hasPosts, // If no posts, assume database is connected but empty
          imageStorage: hasDatabase || !hasPosts ? 'Vercel Blob + Base64 fallback' : 'Base64 inline',
          features: hasDatabase || !hasPosts
            ? ['Persistent Storage', 'Advanced Search', 'Performance Optimized', 'Multi-user Support']
            : ['Session Storage', 'Full Functionality', 'No Setup Required', 'Quick Start']
        });
      } catch (error) {
        console.error('Status check failed:', error);
        setStatus({
          mode: 'unknown',
          database: false,
          imageStorage: 'Not configured',
          features: ['Database Setup Required']
        });
      }
    };

    checkStatus();
  }, []);

  const getModeColor = () => {
    switch (status.mode) {
      case 'production': return 'bg-green-500';
      case 'demo': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getModeIcon = () => {
    switch (status.mode) {
      case 'production': return <Database className="w-4 h-4" />;
      case 'demo': return <HardDrive className="w-4 h-4" />;
      default: return <Wifi className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">System Status</h3>
          <Badge className={`${getModeColor()} text-white`}>
            {getModeIcon()}
            <span className="ml-1 capitalize">{status.mode} Mode</span>
          </Badge>
        </div>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Database:</span>
            <Badge variant={status.database ? "default" : "secondary"} className="text-xs">
              {status.database ? "PostgreSQL Connected" : "Demo Data"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Image Storage:</span>
            <Badge variant="outline" className="text-xs">
              {status.imageStorage}
            </Badge>
          </div>
          
          <div className="mt-3">
            <p className="font-medium text-xs mb-1">Active Features:</p>
            <div className="flex flex-wrap gap-1">
              {status.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          
          {status.mode === 'demo' && (
            <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
              <p className="text-blue-700">
                <strong>Demo Mode:</strong> Full functionality with session storage. 
                See <code>PRODUCTION_SETUP.md</code> to upgrade.
              </p>
            </div>
          )}
          
          {status.mode === 'production' && (
            <div className="mt-2 p-2 bg-green-50 rounded text-xs">
              <p className="text-green-700">
                <strong>Production Mode:</strong> Database connected with persistent storage.
              </p>
            </div>
          )}
          
          {status.mode === 'unknown' && (
            <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
              <p className="text-yellow-700">
                <strong>Setup Required:</strong> Configure DATABASE_URL in .env.local to connect PostgreSQL database.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}