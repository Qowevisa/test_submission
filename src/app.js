const Hapi = require('@hapi/hapi');
const sqlite = require('./drivers/sqlite');
const routes = require('./routes')

module.exports = {
  async init() {
    sqlite.init_db();

    const server = Hapi.server({
      port: process.env.SERVER_PORT,
      host: process.env.SERVER_HOST,
      router: {stripTrailingSlash: true}
    });

    // Register all routes
    server.route(routes);

    server.start()
    .then(() => {
      console.log('Server running on %s', server.info.uri);
    })
  }
}