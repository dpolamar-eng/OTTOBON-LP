# Ottobon Academy - Technology Consulting Education Platform

## Overview

Ottobon Academy is a comprehensive technology consulting education platform that transforms students and professionals into skilled technology consultants. The platform focuses on two main verticals: Ottobon Academy for upskilling students and freshers, and Ottobon Professional Services for working professionals. The system emphasizes AI-enhanced learning, practical consulting skills, and real-world application in high-demand technologies like Salesforce, Oracle, Cloud Computing, and Full Stack Development.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom component library using Radix UI primitives
- **State Management**: React hooks with TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular design with reusable UI components, pages, and specialized sections

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Development**: TypeScript with hot reload development server
- **API Design**: RESTful endpoints for enrollment, assessments, and user interactions
- **Data Processing**: In-memory storage with extensible interface for future database integration
- **Build Process**: ESBuild for production bundling with ES modules support

### Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Database**: PostgreSQL (via Neon Database serverless) for production data persistence
- **Schema Management**: Centralized schema definitions in shared directory with migration support
- **Development Storage**: In-memory storage implementation for development and testing

### Authentication and Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **User Schema**: Basic user authentication with username/password model
- **Validation**: Zod schema validation for type-safe data handling
- **Security**: Environment-based configuration with secure credential management

### External Dependencies
- **Database Provider**: Neon Database serverless PostgreSQL for cloud-native data storage
- **UI Components**: Radix UI for accessible, customizable component primitives
- **Animation Libraries**: Custom animation hooks with Intersection Observer API for scroll-triggered effects
- **Carousel**: Embla Carousel for responsive content sliders and image galleries
- **Development Tools**: Replit-specific plugins for theme management and development experience
- **Media Handling**: Font Awesome for icons, Google Fonts for typography
- **Form Management**: React Hook Form with Hookform Resolvers for validation integration

### Key Architectural Decisions
- **Monorepo Structure**: Shared types and schemas between client and server for consistency
- **Component-Based Architecture**: Highly modular frontend with specialized components for different sections
- **Type Safety**: Full TypeScript implementation across frontend, backend, and shared code
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint management
- **Performance Optimization**: Code splitting, lazy loading, and optimized asset delivery
- **Development Experience**: Hot reload, error overlays, and integrated development tools