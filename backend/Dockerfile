# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Solo package* y tsconfig para poder instalar
COPY package*.json tsconfig.json ./

RUN npm install

# Copia el código fuente
COPY src ./src

# Compila TypeScript a JS
RUN npm run build

# Imagen final
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copia solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/server.js"]
