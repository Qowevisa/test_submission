const api_controller = require('../controllers/api');

module.exports = [
  {
    method: 'GET',
    path: '',
    handler: api_controller.get
  }
]