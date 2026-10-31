ARG NODE_VERSION=18.19.0

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_BACKEND_ENDPOINT
ARG VITE_BACKEND_AUTHORIZATION_ENDPOINT
RUN npm run build

FROM node:${NODE_VERSION}-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "prod"]
