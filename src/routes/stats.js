const stats_controller = require('../controllers/stats');

module.exports = [
  {
    method: 'GET',
    path: '',
    handler: stats_controller.get
  }
]