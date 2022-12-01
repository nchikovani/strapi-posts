FROM node:14.14.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . ./
EXPOSE 3000
ARG STRAPI_PORT
ARG APP_HOST
ARG APP_PORT
ENV STRAPI_PORT=${STRAPI_PORT}
ENV STRAPI_PORT=${APP_HOST}
ENV STRAPI_PORT=${APP_PORT}
RUN npm run build
CMD ["npm", "run", "start"]