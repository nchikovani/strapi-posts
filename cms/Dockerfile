FROM node:16-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
WORKDIR /opt/app
COPY ./ .
ARG HOST
ARG PORT
ARG APP_PORT
ARG APP_KEYS
ARG APP_HOST
ENV HOST=${HOST}
ENV PORT=${PORT}
ENV APP_PORT=${APP_PORT}
ENV APP_KEYS=${APP_KEYS}
ENV APP_HOST=${APP_HOST}
RUN npm run build
CMD ["npm", "run", "start"]
