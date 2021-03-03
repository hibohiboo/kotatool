const { resolve } = require('path')

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias['~'] = resolve(__dirname, '../../../src')

  // config.watchOptions = {
  //   aggregateTimeout: 200,
  //   poll: 1000,
  //   ignored: /node_modules/,
  // }

  // tsを読み込む
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')]
    }
  })
  // scss を読み込む
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1, // 1 => postcss-loader, 2=> postcss-loader, sass-loader
          modules: {
            localIdentName: '[local]___[hash:base64:2]',
          },
        },
      },
      //  {
      //   loader: 'postcss-loader', // Run post css actions
      //   options: {
      //     plugins: function () { // post css plugins, can be exported to postcss.config.js
      //       return [
      //         // require('precss'),
      //         require('autoprefixer')
      //       ];
      //     }
      //   }
      // },
      {
        loader: "sass-loader",
        options: {
          // dart-sass を優先
          implementation: require('sass'),
          sassOptions: {
            // fibers を使わない場合は以下で false を指定. fibersは非同期でコンパイル速度を上げるために使用
            fiber: require('fibers'),
          },
          // ソースマップを有効に
          sourceMap: true,
          webpackImporter: true,
        },
      },
    ],
  });
  return config
}
