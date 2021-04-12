module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname,
    filename: "public/bundle.js",
    publicPath: "/",
  },
  mode: "development",
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
