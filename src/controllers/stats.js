const sqlite = require('../drivers/sqlite');

module.exports = {
  get: (request, h) => {
    sqlite.increase_stat("/stats", "GET")
    return sqlite.get_stats()
      .then((data) => 
        h.response(data).code(200))
      .catch(() => 
        h.response({ "message": "Internal server error" }).code(500));
  }
}