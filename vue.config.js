module.exports = {
  configureWebpack: {
    resolve: {
      alias: require("./aliases.config").webpack
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true
  },
  baseUrl: process.env.NODE_ENV === "production" ? "/airq/" : "/"
};
