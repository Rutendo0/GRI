import { Pool } from 'pg';

let pool: Pool | null = null;

export async function getPool(): Promise<Pool> {
  if (pool) {
    return pool;
  }

  // For development/demo, we'll use a simple in-memory storage
  if (!process.env.DATABASE_URL) {
    console.warn('No DATABASE_URL found, using demo data');
    return null; // Return null instead of throwing error
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  return pool;
}

export async function query(text: string, params: any[] = []) {
  try {
    const pool = await getPool();
    if (!pool) {
      throw new Error('Database not configured');
    }
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tags TEXT[] DEFAULT '{}',
        featured BOOLEAN DEFAULT FALSE,
        reading_time INTEGER DEFAULT 0,
        featured_image_url TEXT,
        featured_image_alt TEXT,
        status VARCHAR(50) DEFAULT 'published'
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}