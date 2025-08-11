# Database Setup Guide

## Quick Setup Instructions

### 1. Install PostgreSQL
If you don't have PostgreSQL installed:
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE gri_blog;

# Exit psql
\q
```

### 3. Configure Environment
Update your `.env.local` file:
```env
# Replace with your actual credentials
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/gri_blog
```

### 4. Initialize Database Schema
The application will automatically create the required tables when you first run it.

Alternatively, you can manually run the schema:
```bash
psql -U postgres -d gri_blog -f lib/db/schema.sql
```

### 5. Test Connection
1. Restart your development server: `pnpm dev`
2. Visit http://localhost:3000/blog
3. Enable Admin Mode (password: `GRI#Admin2024!Secure@Blog`)
4. Check System Status - should show "Production Mode"

## Alternative: Use Cloud Database

### Vercel Postgres (Recommended for production)
1. Go to https://vercel.com/dashboard
2. Create a new project or select existing
3. Go to Storage → Create Database → Postgres
4. Copy the connection string to your `.env.local`

### Other Options
- **Supabase**: Free PostgreSQL with dashboard
- **Railway**: Simple PostgreSQL hosting
- **AWS RDS**: Enterprise-grade PostgreSQL

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL is running: `pg_ctl status`
- Check credentials in DATABASE_URL
- Verify database exists: `psql -U postgres -l`

### Permission Issues
- Grant permissions: `GRANT ALL PRIVILEGES ON DATABASE gri_blog TO postgres;`
- Check user exists: `\du` in psql

### Still Showing Demo Mode?
1. Check browser console for errors
2. Verify DATABASE_URL is set correctly
3. Restart development server
4. Clear browser cache

## Current Status
- ✅ Demo data removed
- ✅ API routes use database only
- ✅ Delete functionality fixed
- ✅ Read More links working
- ⚠️ Database connection needed

Once DATABASE_URL is configured, your blog will be fully functional with persistent storage!