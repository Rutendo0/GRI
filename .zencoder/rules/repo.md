---
description: Repository Information Overview
alwaysApply: true
---

# GRI Website Information

## Summary
A modern, responsive website built with Next.js 15, React 19, and shadcn/ui components. The GRI (Gorilla Research And Investments) website serves as an African investment and management consultancy platform specializing in technology-driven infrastructure projects.

## Structure
- **app/**: Next.js app directory with page components
- **components/**: Reusable UI components and custom elements
- **hooks/**: Custom React hooks for state management
- **lib/**: Utility functions, database connections, and types
- **public/**: Static assets including images
- **styles/**: Global CSS styles

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.x
**Framework**: Next.js 15.2.4
**React Version**: React 19
**Package Manager**: pnpm

## Dependencies
**Main Dependencies**:
- Next.js 15.2.4 (App Router)
- React 19 & React DOM 19
- shadcn/ui components (Radix UI primitives)
- Tailwind CSS 4.x
- Framer Motion (animations)
- PostgreSQL client (pg)
- Vercel Blob Storage (@vercel/blob)
- Zod (validation)

**Development Dependencies**:
- TypeScript 5.x
- Tailwind CSS 4.1.11
- PostCSS 8.5

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

## Database
**Type**: PostgreSQL
**Schema**: Located at lib/db/schema.sql
**Connection**: Database connection managed in lib/db/index.ts

## Deployment
**Platform**: Vercel
**Configuration**: vercel.json in root directory
**Setup Guide**: VERCEL_SETUP.md

## Features
- Dark/Light theme support via next-themes
- Responsive design with Tailwind CSS
- Custom animations (scroll animations, parallax effects)
- Blog functionality with content management
- Interactive UI components (cards, buttons with effects)
- Trading view widget integration---
description: Repository Information Overview
alwaysApply: true
---

# GRI Website Information

## Summary
A modern, responsive website built with Next.js 15, React 19, and shadcn/ui components. The GRI (Gorilla Research And Investments) website serves as an African investment and management consultancy platform specializing in technology-driven infrastructure projects.

## Structure
- **app/**: Next.js app directory with page components
- **components/**: Reusable UI components and custom elements
- **hooks/**: Custom React hooks for state management
- **lib/**: Utility functions, database connections, and types
- **public/**: Static assets including images
- **styles/**: Global CSS styles

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.x
**Framework**: Next.js 15.2.4
**React Version**: React 19
**Package Manager**: pnpm

## Dependencies
**Main Dependencies**:
- Next.js 15.2.4 (App Router)
- React 19 & React DOM 19
- shadcn/ui components (Radix UI primitives)
- Tailwind CSS 4.x
- Framer Motion (animations)
- PostgreSQL client (pg)
- Vercel Blob Storage (@vercel/blob)
- Zod (validation)

**Development Dependencies**:
- TypeScript 5.x
- Tailwind CSS 4.1.11
- PostCSS 8.5

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

## Database
**Type**: PostgreSQL
**Schema**: Located at lib/db/schema.sql
**Connection**: Database connection managed in lib/db/index.ts

## Deployment
**Platform**: Vercel
**Configuration**: vercel.json in root directory
**Setup Guide**: VERCEL_SETUP.md

## Features
- Dark/Light theme support via next-themes
- Responsive design with Tailwind CSS
- Custom animations (scroll animations, parallax effects)
- Blog functionality with content management
- Interactive UI components (cards, buttons with effects)
- Trading view widget integration