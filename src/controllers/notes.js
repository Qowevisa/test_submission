const sqlite = require('../drivers/sqlite');

module.exports = {
  // Get notes from SQLite3 db.
  //   If request.params.id is set returns only one enitity
  get: (request, h) => {
    sqlite.increase_stat("/notes", "GET");
    if (!!request.params.id)
      return sqlite.get_note(request.params.id)
        .then((data) =>
          h.response(data).code(200))
        .catch(() =>
          h.response({ "message": "Internal server error" }).code(500));
    else
      return sqlite.get_notes()
        .then((data) =>
          h.response(data).code(200))
        .catch(() =>
          h.response({ "message": "Internal server error" }).code(500));
  },
  // Body should be sent as a JSON object.
  //   It can have an optional id and required text
  //   Example: 
  //   {
  //      "text": "Test note"
  //   }
  post: (request, h) => {
    let payload = request.payload;
    if (payload.text == undefined) {
      const data = {
        "error": "Bad Request",
        "message": "Text field wasn't specified!"
      };
      return h.response(data).code(400);
    }

    sqlite.increase_stat("/notes", "POST");
    return sqlite.add_note(payload.text)
      .then((last_id) => {
        const data = {
          "id": last_id,
          "message": `Note was created!`
        };
        return h.response(data).code(201);
      })
      .catch(() =>
        h.response({ "message": "Internal server error" }).code(500))
  },
  // Handler for changing data.
  //   Body contains only text. Id comes from request.params
  put: (request, h) => {
    let payload = request.payload;
    if (payload.text == undefined) {
      const data = {
        "error": "Bad Request",
        "message": "Text field wasn't specified!"
      };
      return h.response(data).code(400);
    }

    sqlite.increase_stat("/notes", "PUT");
    sqlite.update_note(request.params.id, payload.text);
    const data = {
      "id": payload.id,
      "message": `Note was changed!`
    };
    return h.response(data).code(200);
  }
}