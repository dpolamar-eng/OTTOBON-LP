# Overview

This is a full-stack web application for Ottobon, a technology consulting academy that transforms students and working professionals into independent consultants. The platform features an academy section for learning AI-enhanced technology skills (Salesforce, Oracle, Cloud Computing, Full Stack Development) and a services section for professional consulting support. The application uses a modern React frontend with Express backend and PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api` prefix
- **Error Handling**: Global error middleware with structured error responses
- **Development**: Hot reload with Vite middleware integration
- **Session Management**: Express sessions with PostgreSQL storage

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Connection**: Neon Database serverless PostgreSQL
- **Development Storage**: In-memory storage class for rapid prototyping

## Authentication & Authorization
- **Session-based**: Traditional server-side sessions
- **Storage**: PostgreSQL session store via connect-pg-simple
- **User Model**: Simple username/password authentication schema

## Component Architecture
- **Design System**: Custom theme system with professional variant
- **Animations**: Custom animation hooks with Intersection Observer
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Interactive Elements**: Flip cards, carousels, and assessment flows

## Key Features
- **Academy Portal**: Student onboarding, course selection, and skill assessment
- **Services Portal**: Professional consulting service offerings
- **Talent Compass**: Interactive assessment tool for personalized learning paths
- **Career Path Visualizer**: Dynamic visualization of consulting career progression
- **Storytelling Onboarding**: Character-driven user journey experience

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and migrations

## UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter and Poppins font families

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundling for production

## Frontend Libraries
- **React Hook Form**: Form state management and validation
- **Embla Carousel**: Touch-friendly carousel component
- **Date-fns**: Date manipulation utilities
- **Zod**: Runtime type validation

## Server Dependencies
- **Express**: Web application framework
- **CORS**: Cross-origin resource sharing
- **Body Parser**: Request parsing middleware

## Image & Media
- **Unsplash**: Stock photography for hero sections and testimonials
- **Custom Assets**: Logo and branding elements