FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build

# Expose application port
EXPOSE 3000

# Run Prisma migrations then start app
CMD npx prisma migrate deploy && node dist/src/main.js
