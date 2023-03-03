const sqlite = require('../drivers/sqlite');
const public_api = require('../utils/public_api')

module.exports = {
  // Public API: https://www.alphavantage.co/
  // Getting data from public api
  // Inside params can be:
  //      start   - start of slice
  //      end     - end of slice
  //      open    - stock's open price
  //      high    - highest price of IBM stock
  //      low     - lowest price
  //      close   - close price at 5min interval
  //      volume  - number of stocks sold in 5 min interval
  //  Every data get for a day will be checked for exact price/volume
  get: (request, h) => {
    sqlite.increase_stat("/api", "GET");
    const params = request.query;
    return public_api.get_data(params)
      .then((data) =>
        h.response(data).code(200))
      .catch(() =>
        h.response({ "message": "Internal server error" }).code(500))
  }
}