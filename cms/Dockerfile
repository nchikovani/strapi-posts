FROM strapi/base
LABEL com.centurylinklabs.watchtower.enable="false"
WORKDIR /opt/app
COPY ./package.json ./
RUN npm cache clean --force
RUN npm ci
COPY ./ .
ENV NODE_ENV production
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
