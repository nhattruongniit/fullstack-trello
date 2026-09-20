# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json ./
COPY package-lock.json ./
COPY prisma.config.ts ./prisma.config.ts
COPY tsconfig.json ./tsconfig.json

COPY prisma/ ./prisma/
COPY src ./src

RUN npm ci

# If using plain JS, omit the build step if not needed, but ensure prisma generate runs:
RUN npx prisma generate

# Copy source code and build (if using TypeScript)
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/dist ./dist 
# Note: change '/app/dist' to your compiled output folder or './src' if running plain JS

EXPOSE 3000

CMD ["node", "dist/src/index.js"]