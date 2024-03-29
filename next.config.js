/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const withPWA = require('next-pwa')

const MODE =
  process.env.npm_lifecycle_event === 'dev' ? 'development' : 'production'

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // src ディレクトリをエイリアスのルートに設定
    config.resolve.alias['~'] = resolve(__dirname, 'src')

    // watch options
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    }

    return config
  },
  // manifest設定
  pwa: {
    dest: 'public', // swの出力ディレクトリ
    // runtimeCaching: []
  },
  // Imagesで外部サイトの画像を使おうと思うとここにドメインの登録が必要
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}

// PWA に対応
// GenerateSW has been called multiple times, perhaps due to running webpack in --watch mode. The precache manifest generated after the first call may be inaccurate! Please see https://github.com/GoogleChrome/workbox/issues/1790 for more information
module.exports = MODE === 'development' ? nextConfig : withPWA(nextConfig)
