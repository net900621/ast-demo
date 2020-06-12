const path = require("path");
const merge = require("webpack-merge");
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const base = require("./webpack.base.conf");

const prod = {
  mode: "production",
  plugins: [
    // 文档: https://github.com/gdborton/webpack-parallel-uglify-plugin
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new CleanWebpackPlugin()
  ]
};
module.exports = merge(base, prod);
