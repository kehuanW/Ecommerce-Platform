const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // const filter = function (pathname, req) {
    //     return pathname.match('^/api');
    // };
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000/',
            changeOrigin: true,
        })
    );
};