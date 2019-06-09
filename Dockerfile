FROM node:10.15-alpine as builder

WORKDIR /app

ENV BASE_URL=/
ARG VUE_APP_API_URL=http://localhost:3000/api

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
