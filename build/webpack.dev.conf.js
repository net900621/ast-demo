const path = require("path");
const config = require("../config").config;
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.conf");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const dev = {
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    overlay: {
      errors: true
    },
    quiet: true, //减少窗口打印信息
    hot: true,
    port: 8080,
    host: "localhost",
    open: true,
    inline: true,
    progress: true,
    clientLogLevel: "none" //关闭控制台打印信息
  },
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: ${
            config.dev.https ? "https" : "http"
          }://${config.dev.host}:${config.dev.port}`
        ]
      },
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined,
      clearConsole: true
    })
  ]
};
module.exports = merge(base, dev);
