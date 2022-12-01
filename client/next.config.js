/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    appPort: process.env.APP_PORT,
    appHost: process.env.APP_HOST,
  },
  webpack: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'strapi',
        port: process.env.STRAPI_PORT,
      },
    ],
  },
}

module.exports = nextConfig
