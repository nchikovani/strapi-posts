export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: "http://localhost:3050/strapi",
  app: {
    keys: env.array('APP_KEYS'),
  },
});
