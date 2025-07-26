ARG NODE_VERSION=lts-alpine

FROM node:${NODE_VERSION} AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=build /app/.output ./

ARG RESEND_API_KEY
ARG RESEND_FROM_EMAIL

ENV PORT=3000 \
  NODE_ENV=production \
  HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]
