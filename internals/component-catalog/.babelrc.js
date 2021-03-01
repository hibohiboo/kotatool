// ローカルの開発サーバー側の SSR 時と クライアント側のCSR 時に styled-components が付与するクラス名に差が生まれるエラーの対応
module.exports = {
  presets: ['next/babel'],
  plugins: [
    'react-require',
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
  ],
}
