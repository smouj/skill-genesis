import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/skill-genesis' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/skill-genesis' : '',
}

export default nextConfig
