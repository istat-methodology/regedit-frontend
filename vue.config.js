var path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/regedit/" : "/",
  devServer: {
    host: "localhost",
    port: 8070
  },
  configureWebpack: {
    resolve: {
      alias: {
        icons: path.resolve(__dirname, "node_modules/vue-material-design-icons")
      },
      extensions: [".vue"]
    }
  }
};
