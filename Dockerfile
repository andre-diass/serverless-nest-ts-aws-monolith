# syntax=docker/dockerfile:1

FROM node:lts-alpine AS base

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

FROM base AS dev
RUN npm install --frozen-lockfile
COPY . .
CMD ["npm", "run", "dev:nest"]

FROM base AS prod
RUN npm install --frozen-lockfile --production
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
