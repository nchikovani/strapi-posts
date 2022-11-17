export default ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  url: `http://${env('APP_HOST')}:${env('APP_PORT')}/strapi`,
  app: {
    keys: env.array('APP_KEYS'),
  },
});
