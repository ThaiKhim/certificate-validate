const webpack = require("webpack");

module.exports = function override(config) {
  // Fallbacks for Node.js core modules
  const fallback = { path: require.resolve("path-browserify"), fs: false };
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;

  // Provide global variables for modules
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // Ignore warnings for source maps
  config.ignoreWarnings = [/Failed to parse source map/];

  // Add support for source maps
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });

  // Enable top-level await support
  config.experiments = {
    topLevelAwait: true, // Enable top-level await
  };

  return config;
};
