const path = require("path");
const HappyPack = require("happypack");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("manifest-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].[hash:8].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: "common"
        }
      }
    }
  },
  target: "web",
  plugins: [
    new HappyPack({
      id: "babel",
      threads: 4,
      loaders: ["babel-loader"]
    }),
    new ManifestPlugin(path.join("dist", "manifest.json")),
    // new webpack.DllReferencePlugin({
    //   manifest: path.join(__dirname, "./dist", "manifest.json")
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/templete.html",
      filename: "index.html",
      title: "测试页面",
      chunks: ["index"],
      hash: true,
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new ExtractTextPlugin("[name].[contenthash:8].css"),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          // style-loader 把css直接写入html中style标签
          fallback: "style-loader",
          // css-loader css中import支持
          // loader执行顺序 从右往左执行
          use: ["css-loader", "sass-loader"]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // 处理图片
      {
        test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              query: {
                // 阈值 单位byte
                limit: "8192",
                name: "images/[name]_[hash:7].[ext]"
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".json"]
  }
};

if (isDev) {
  config.devtool = "#cheap-module-eval-source-map";
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    overlay: {
      errors: true
    },
    hot: true
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 作用：HMR插件将HMR Runtime代码嵌入到bundle中，能够操作APP代码，完成代码替换
    new webpack.NoEmitOnErrorsPlugin() // 作用：跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
  );
}
module.exports = config;
