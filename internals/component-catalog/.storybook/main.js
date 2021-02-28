module.exports = {
  // ディレクトリと拡張子の変更
  stories: ['../internals/component-catalog/stories/**/*.stories.tsx'],
  addons: [
    // 必要に応じて追加
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
    '@storybook/addon-backgrounds/register'
  ]
}