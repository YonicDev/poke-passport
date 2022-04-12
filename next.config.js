const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  },
  assetPrefix: isProd ? '/poke-passport/' : '',
  basePath: '/poke-passport'
}

module.exports = nextConfig
