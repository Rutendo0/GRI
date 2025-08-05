import { query, initializeDatabase as initDb } from '@/lib/db';
import { BlogPost } from '@/lib/types/blog';

export { initDb as initializeDatabase };

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to estimate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Convert database row to BlogPost
function dbRowToBlogPost(row: any): BlogPost {
  return {
    id: row.id.toString(),
    title: row.title,
    content: row.content,
    excerpt: row.excerpt,
    author: row.author,
    publishedAt: row.published_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    tags: row.tags || [],
    featured: row.featured,
    readingTime: row.reading_time,
    featuredImage: row.featured_image_url,
    imageAlt: row.featured_image_alt,
    status: row.status,
    slug: row.slug,
  };
}

// Get all blog posts
export async function getAllBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
  try {
    const statusCondition = includeUnpublished ? '' : "WHERE status = 'published'";
    
    const result = await query(`
      SELECT * FROM blog_posts 
      ${statusCondition}
      ORDER BY published_at DESC
    `);

    return result.rows.map(dbRowToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}

// Get blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const result = await query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return dbRowToBlogPost(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw new Error('Failed to fetch blog post');
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await query(
      'SELECT * FROM blog_posts WHERE slug = $1',
      [slug]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return dbRowToBlogPost(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    throw new Error('Failed to fetch blog post');
  }
}

// Create new blog post
export async function createBlogPost(postData: {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  featured: boolean;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  status: string;
}): Promise<BlogPost> {
  try {
    const slug = generateSlug(postData.title);
    const readingTime = calculateReadingTime(postData.content);

    const result = await query(`
      INSERT INTO blog_posts (
        slug, title, content, excerpt, author, tags, featured, 
        reading_time, featured_image_url, featured_image_alt, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      slug,
      postData.title,
      postData.content,
      postData.excerpt,
      postData.author,
      postData.tags,
      postData.featured,
      readingTime,
      postData.featuredImageUrl,
      postData.featuredImageAlt,
      postData.status
    ]);

    return dbRowToBlogPost(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error instanceof Error && error.message.includes('unique constraint')) {
      throw new Error('A blog post with this title already exists');
    }
    throw new Error('Failed to create blog post');
  }
}

// Update blog post
export async function updateBlogPost(
  id: string,
  postData: Partial<{
    title: string;
    content: string;
    excerpt: string;
    author: string;
    tags: string[];
    featured: boolean;
    featuredImageUrl: string;
    featuredImageAlt: string;
    status: string;
  }>
): Promise<BlogPost | null> {
  try {
    // Build dynamic query
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (postData.title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(postData.title);
      paramIndex++;

      // Also update slug if title changes
      updates.push(`slug = $${paramIndex}`);
      values.push(generateSlug(postData.title));
      paramIndex++;
    }

    if (postData.content !== undefined) {
      updates.push(`content = $${paramIndex}`);
      values.push(postData.content);
      paramIndex++;

      // Recalculate reading time
      updates.push(`reading_time = $${paramIndex}`);
      values.push(calculateReadingTime(postData.content));
      paramIndex++;
    }

    if (postData.excerpt !== undefined) {
      updates.push(`excerpt = $${paramIndex}`);
      values.push(postData.excerpt);
      paramIndex++;
    }

    if (postData.author !== undefined) {
      updates.push(`author = $${paramIndex}`);
      values.push(postData.author);
      paramIndex++;
    }

    if (postData.tags !== undefined) {
      updates.push(`tags = $${paramIndex}`);
      values.push(postData.tags);
      paramIndex++;
    }

    if (postData.featured !== undefined) {
      updates.push(`featured = $${paramIndex}`);
      values.push(postData.featured);
      paramIndex++;
    }

    if (postData.featuredImageUrl !== undefined) {
      updates.push(`featured_image_url = $${paramIndex}`);
      values.push(postData.featuredImageUrl);
      paramIndex++;
    }

    if (postData.featuredImageAlt !== undefined) {
      updates.push(`featured_image_alt = $${paramIndex}`);
      values.push(postData.featuredImageAlt);
      paramIndex++;
    }

    if (postData.status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      values.push(postData.status);
      paramIndex++;
    }

    if (updates.length === 0) {
      return await getBlogPostById(id);
    }

    values.push(id);
    const result = await query(`
      UPDATE blog_posts 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return null;
    }

    return dbRowToBlogPost(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw new Error('Failed to update blog post');
  }
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const result = await query(
      'DELETE FROM blog_posts WHERE id = $1',
      [id]
    );

    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }
}

// Search blog posts
export async function searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
  try {
    const result = await query(`
      SELECT * FROM blog_posts 
      WHERE status = 'published' 
        AND (
          title ILIKE $1 
          OR excerpt ILIKE $1 
          OR content ILIKE $1
          OR $2 = ANY(tags)
        )
      ORDER BY published_at DESC
    `, [`%${searchTerm}%`, searchTerm]);

    return result.rows.map(dbRowToBlogPost);
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw new Error('Failed to search blog posts');
  }
}

// Get posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const result = await query(`
      SELECT * FROM blog_posts 
      WHERE status = 'published' AND $1 = ANY(tags)
      ORDER BY published_at DESC
    `, [tag]);

    return result.rows.map(dbRowToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    throw new Error('Failed to fetch blog posts by tag');
  }
}

// Get featured posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await query(`
      SELECT * FROM blog_posts 
      WHERE status = 'published' AND featured = true
      ORDER BY published_at DESC
    `);

    return result.rows.map(dbRowToBlogPost);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    throw new Error('Failed to fetch featured blog posts');
  }
}