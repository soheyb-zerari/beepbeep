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

# # Create app directory
# WORKDIR /usr/src/app

# # Copy package files first to leverage Docker cache
# COPY package.json package-lock.json* ./

# # Install all dependencies
# RUN npm ci

# # Copy the prisma schema
# COPY prisma ./prisma/

# # Generate the Prisma client for the correct binary target
# RUN npx prisma generate

# # Copy the rest of your application source code
# COPY . .

# # Build the TypeScript code into JavaScript
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 3000

# # This is a placeholder CMD for production. The docker-compose 'command' will override it.
# CMD ["node", "dist/main.js"]