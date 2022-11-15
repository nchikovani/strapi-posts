FROM node:16.15-alpine3.14
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY ./ .
RUN npm install
RUN npm install --save @strapi/strapi
RUN npm install sharp
RUN npm run build
EXPOSE 1337
CMD [ "npm", "run", "start" ]

