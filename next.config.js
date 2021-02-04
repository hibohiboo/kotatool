/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const withOffline = require('next-offline')
require('dotenv').config()
const MODE =
  process.env.npm_lifecycle_event === 'dev' ? 'development' : 'production'
const withDebug = !process.env['npm_config_nodebug'] && MODE == 'development'
const nextConfig = {
  future: { webpack5: true },
  webpack: (config) => {
    // src ディレクトリをエイリアスのルートに設定
    config.resolve.alias['~'] = resolve(__dirname, 'src')
    return config
  },
  // manifest設定
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

// PWA に対応
module.exports = withOffline(nextConfig)
