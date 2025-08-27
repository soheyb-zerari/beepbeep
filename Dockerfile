# Use official Node LTS image
FROM node:20-alpine3.19

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy only schema first to ensure it's updated
COPY prisma ./prisma

# Completely remove any existing Prisma artifacts
RUN rm -rf node_modules/.prisma
RUN rm -rf node_modules/@prisma/client

# Reinstall Prisma client to ensure clean state
RUN npm install @prisma/client

# Generate Prisma client with explicit binary target
RUN npx prisma generate

# Verify the binary target was generated correctly
RUN ls -la node_modules/.prisma/client/

# Copy rest of source
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app with migration
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]
