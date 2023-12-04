// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ISteamApps/GetAppList/v2',
    createProxyMiddleware({
      target: 'https://api.steampowered.com',
      changeOrigin: true,
    })
  )
  ,  app.use(
    '/api/appdetails',
    createProxyMiddleware({
      target: 'https://store.steampowered.com',
      changeOrigin: true,
    })
  )
  ,  app.use(
    '/ISteamNews/GetNewsForApp/v2',
    createProxyMiddleware({
      target: 'https://api.steampowered.com',
      changeOrigin: true,
    })
  )
  // ,  app.use(
  //   '/api/**',
  //   createProxyMiddleware({
  //     target: 'http://localhost:8888',
  //     changeOrigin: true,
  //   })
  // );
};