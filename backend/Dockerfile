# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

#  Only package* and tsconfig to be able to install dependencies
COPY package*.json tsconfig.json ./

RUN npm install

# Copy source code
COPY src ./src

# Compile TypeScript to JS
RUN npm run build

# Final image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from the builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/server.js"]
