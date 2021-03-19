const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/app.ts",
  mode: NODE_ENV,
  watch: NODE_ENV === "development",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: NODE_ENV === "development" ? "eval-source-map" : "source-map",
  externals: [nodeExternals()],
  output: {
    publicPath: "dist",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: ["yarn run:dev"],
    }),
  ],
};
