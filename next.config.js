const { InjectManifest } = require('workbox-webpack-plugin');

const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new InjectManifest({
          swSrc: './src/sw.js',
          swDest: '../public/sw.js',
        })
      );
    }

    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
      },
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

module.exports = nextConfig;