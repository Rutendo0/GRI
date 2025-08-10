#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 GRI Blog Production Setup Script');
console.log('=====================================\n');

// Check if we're already in production mode
const hasEnvFile = fs.existsSync('.env.local');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log('📊 Current Status:');
console.log(`✅ Project: ${packageJson.name}`);
console.log(`✅ Next.js: ${packageJson.dependencies.next}`);
console.log(`✅ PostgreSQL Support: ${packageJson.dependencies.pg ? 'Ready' : 'Missing'}`);
console.log(`✅ Vercel Blob: ${packageJson.dependencies['@vercel/blob'] ? 'Ready' : 'Missing'}`);
console.log(`${hasEnvFile ? '✅' : '⚠️ '} Environment Config: ${hasEnvFile ? 'Found' : 'Missing'}\n`);

if (!hasEnvFile) {
  console.log('📝 Creating environment configuration...');
  
  const envContent = `# Database Configuration
# Replace with your actual PostgreSQL connection string
DATABASE_URL=postgresql://username:password@host:port/database_name

# Vercel Blob Storage (for image uploads)
# Get this from Vercel Dashboard > Your Project > Storage > Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Optional: Additional settings
NODE_ENV=production
`;

  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local file');
}

console.log('\n🎯 Next Steps for Production:');
console.log('\n1. DATABASE SETUP:');
console.log('   Choose one of these options:');
console.log('   • Vercel Postgres: https://vercel.com/dashboard → Storage → Create Database');
console.log('   • Neon: https://neon.tech (Free tier available)');
console.log('   • Supabase: https://supabase.com (Free tier available)');
console.log('   • Railway: https://railway.app');

console.log('\n2. ENVIRONMENT VARIABLES:');
console.log('   Edit .env.local and replace:');
console.log('   • DATABASE_URL with your actual PostgreSQL connection string');
console.log('   • BLOB_READ_WRITE_TOKEN with your Vercel Blob token (optional)');

console.log('\n3. DEPLOYMENT:');
console.log('   For Vercel deployment:');
console.log('   • Add the same environment variables to Vercel Dashboard');
console.log('   • Run: npx vercel --prod');

console.log('\n4. VERIFICATION:');
console.log('   • Start the app: npm run dev');
console.log('   • Check console for "Database initialized successfully" (production mode)');
console.log('   • Or "No DATABASE_URL found, using demo data" (demo mode)');

console.log('\n💡 IMPORTANT NOTES:');
console.log('   • Demo mode works perfectly without any setup');
console.log('   • Production mode adds data persistence and enhanced features');
console.log('   • Your blog will automatically switch modes based on DATABASE_URL');
console.log('   • Admin password: GRI#Admin2024!Secure@Blog');

console.log('\n🔍 Mode Detection:');
if (process.env.DATABASE_URL) {
  console.log('   🟢 PRODUCTION MODE: Database connection detected');
} else {
  console.log('   🟡 DEMO MODE: No database connection (perfectly functional)');
}

console.log('\n✨ Your blog is ready to go! Check PRODUCTION_SETUP.md for detailed instructions.');