const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.conf");

const dev = {
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    overlay: {
      errors: true
    },
    hot: true,
    port: 8080,
    host: "localhost",
    open: true,
    inline: true,
    progress: true
  },
  devtool: "#cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
module.exports = merge(base, dev);
