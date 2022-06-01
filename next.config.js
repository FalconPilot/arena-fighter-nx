/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    sessionPassword: process.env.SESSION_PWD,
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV
  }
}

module.exports = nextConfig
