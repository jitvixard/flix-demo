const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, '/src/app.ts'),
  output: {
    filename: 'dist/app.js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "dist/assets" },
        { from: "src/style", to: "dist/style"},
        { from: "src/Main.html", to: "dist/"}
      ],
      options: {
        concurrency: 100,
      },
    }),
  ]
};
