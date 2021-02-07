const { resolve } = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')]
    }
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.alias['~'] = resolve(__dirname, '../src')
  config.watchOptions = {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: /node_modules/,
  }
  return config
}
