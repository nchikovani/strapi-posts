import getConfig from 'next/config'

const getEndpoint = () => {
  if (process.title === 'node') {
    return `http://strapi:${process.env.STRAPI_PORT}`;
  }

  const { publicRuntimeConfig } = getConfig();

  return `http://${publicRuntimeConfig.appHost}:${publicRuntimeConfig.appPort}/strapi`;
};

export const ENDPOINT =  getEndpoint();

export const PAGINATION_LIMIT = 4;