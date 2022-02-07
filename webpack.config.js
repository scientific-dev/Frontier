const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    "js/script.js": "./src/js/main.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]",
  },
  resolve: { extensions: [".js"] },
  optimization: { minimizer: [new CssMinimizerPlugin()] },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "html", context: "src" },
        { from: "assets", context: "src", to: "assets" },
      ],
    }),
  ]
};
