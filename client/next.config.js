/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: process.env.APP_HOST,
  //       port: process.env.APP_PORT,
  //       pathname: '/strapi/**',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
