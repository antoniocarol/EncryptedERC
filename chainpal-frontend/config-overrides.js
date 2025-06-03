/* react‑app‑rewired override – polyfills + ESM relax so RainbowKit (and zk‑libs) bundle without errors */
const webpack = require('webpack');

module.exports = function override (config, env) {
  // -------- polyfills that Webpack 5 retirou ----------
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    assert:   require.resolve('assert'),
    buffer:   require.resolve('buffer'),
    crypto:   require.resolve('crypto-browserify'),
    stream:   require.resolve('stream-browserify'),
    process:  require.resolve('process/browser'),
    vm:       require.resolve('vm-browserify'),
    util:     require.resolve('util/'),
    url:      require.resolve('url/'),
    fs: false, path: false, os: false,
  };

  // -------- Provide globals (process, Buffer) ----------
  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer:  ['buffer', 'Buffer'],
    }),
  ];

  // -------- Relax fully‑specified resolution for ESM bundles ----------
  const relaxESM = {
    test: /node_modules\/(maci-crypto|@zk-kit|ffjavascript|snarkjs|@rainbow-me)/,
    type: 'javascript/auto',
    resolve: { fullySpecified: false },
  };
  config.module.rules.push(relaxESM);

  // -------- Allow plain .mjs from node_modules ----------
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });

  // -------- Silence noisy but harmless warnings ----------
  config.ignoreWarnings = [
    /Failed to parse source map/,
    /Critical dependency: the request of a dependency is an expression/,
    /Can't resolve/,
  ];

  return config;
};