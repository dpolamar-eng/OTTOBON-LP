# ============================================================
# Stage 1: Install dependencies
# ============================================================
FROM node:20-alpine AS deps

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json ./

# Install ALL dependencies (dev + prod) — needed for the build step
RUN npm ci

# ============================================================
# Stage 2: Build the application
# ============================================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source code needed for the build
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY theme.json ./
COPY drizzle.config.ts ./
COPY client/ ./client/
COPY server/ ./server/
COPY shared/ ./shared/

# Add build arguments for frontend environment variables
ARG VITE_GOOGLE_FORM_URL
ARG VITE_GOOGLE_FORM_ENTRY_NAME
ARG VITE_GOOGLE_FORM_ENTRY_EMAIL
ARG VITE_GOOGLE_FORM_ENTRY_PHONE
ARG VITE_GOOGLE_FORM_ENTRY_MESSAGE

# Expose them as environment variables during the build
ENV VITE_GOOGLE_FORM_URL=$VITE_GOOGLE_FORM_URL
ENV VITE_GOOGLE_FORM_ENTRY_NAME=$VITE_GOOGLE_FORM_ENTRY_NAME
ENV VITE_GOOGLE_FORM_ENTRY_EMAIL=$VITE_GOOGLE_FORM_ENTRY_EMAIL
ENV VITE_GOOGLE_FORM_ENTRY_PHONE=$VITE_GOOGLE_FORM_ENTRY_PHONE
ENV VITE_GOOGLE_FORM_ENTRY_MESSAGE=$VITE_GOOGLE_FORM_ENTRY_MESSAGE

# Build frontend (Vite → dist/public/) + bundle server (esbuild → dist/index.js)
RUN npm run build

# Also bundle the seed script separately
RUN npx esbuild server/seed.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/seed.js

# ============================================================
# Stage 3: Production runtime
# ============================================================
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy package files and install production-only dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Install drizzle-kit as it's needed at runtime for schema push
RUN npm install drizzle-kit drizzle-orm postgres

# Copy built artifacts from the build stage
COPY --from=build /app/dist ./dist

# Copy files needed for drizzle-kit push at startup
COPY drizzle.config.ts ./
COPY shared/ ./shared/

# Copy the entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
ENV PORT=7000

EXPOSE 7000

ENTRYPOINT ["./docker-entrypoint.sh"]
