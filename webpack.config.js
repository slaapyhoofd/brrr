const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'brrr.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html', hash: true, inject: 'body' })],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    proxy: [
      {
        context: '/proxy.php',
        target: 'https://[YOUR_DOMAIN]/proxy.php',
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
