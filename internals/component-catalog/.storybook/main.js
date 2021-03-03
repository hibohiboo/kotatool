
module.exports = {
  core: {
    builder: 'webpack5',
  },
  // ディレクトリと拡張子の変更
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    // '@storybook/addon-knobs/register',
    // '@storybook/addon-storysource',
    // '@storybook/addon-viewport/register',
    // '@storybook/addon-backgrounds/register'
  ],
  // webpackFinal: async (config) => {
  //   // Without stats = false, building will generate an error at node_modules/@storybook/builder-webpack5/dist/cjs/index.js:181
  //   // TypeError: Cannot read property 'forEach' of undef
  //   config.stats = false;

  //   return config;
  // },
}
