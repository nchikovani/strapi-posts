FROM node:14.14.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . ./
RUN npm run build

FROM nginx:1.23.2-alpine
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html