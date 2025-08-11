# Overview

No Filter is a modern beauty blog application built with React, Express, and PostgreSQL. The platform serves as a "digital scrapbook for all things glow" featuring honest product reviews, skincare advice, and beauty content. The application follows a full-stack architecture with a React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a pink-themed beauty blog design
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth animations and transitions
- **Typography**: Custom font stack with Inter, Caveat (handwritten), Georgia (serif), and Menlo (mono)

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with session-based authentication
- **Session Storage**: PostgreSQL session store using connect-pg-simple
- **API Design**: RESTful API with structured error handling and request/response logging

## Database Schema
- **Users Table**: Stores user profiles with Replit Auth integration (mandatory for auth)
- **Posts Table**: Blog posts with title, content, excerpt, images, and publishing status
- **Categories Table**: Content categorization system with custom colors and slugs
- **Tags Table**: Tagging system for posts with many-to-many relationships
- **Sessions Table**: Session storage for authentication (mandatory for Replit Auth)

## Application Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/              # Backend Express application
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database operations layer
│   ├── replitAuth.ts    # Authentication setup
│   └── db.ts            # Database connection
├── shared/              # Shared code between client/server
│   └── schema.ts        # Database schema and validation
└── migrations/          # Database migration files
```

## Key Features
- **Content Management**: Create, edit, and publish beauty blog posts with rich media support
- **Categorization**: Organize content into categories like "The Truth Tea", "Skin Deep", and "Glow Goals"
- **Search and Discovery**: Search functionality across posts and categories
- **User Authentication**: Secure authentication using Replit's OAuth system
- **Responsive Design**: Mobile-first design with polaroid-style cards and beauty-themed aesthetics
- **Image Handling**: Support for external image URLs in posts and profiles

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle ORM**: Type-safe database operations and schema management
- **connect-pg-simple**: PostgreSQL session store for authentication

## Authentication
- **Replit Auth**: OAuth-based authentication system with OpenID Connect
- **Passport.js**: Authentication middleware for Express
- **express-session**: Session management middleware

## Frontend Libraries
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema parsing
- **Framer Motion**: Animation library for smooth transitions
- **Wouter**: Lightweight routing solution
- **Shadcn/ui + Radix UI**: Comprehensive UI component library

## Development Tools
- **Vite**: Frontend build tool with HMR support
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint/Prettier**: Code formatting and linting (implied by structure)

## Build and Deployment
- **esbuild**: Backend bundling for production
- **PostCSS**: CSS processing with Tailwind CSS
- **Replit Integration**: Development environment integration with runtime error overlay

The application uses environment variables for database connection (`DATABASE_URL`), session secrets (`SESSION_SECRET`), and Replit-specific configuration (`REPL_ID`, `ISSUER_URL`, `REPLIT_DOMAINS`).