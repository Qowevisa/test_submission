const notes_controller = require('../controllers/notes');

module.exports = [
  {
    method: 'GET',
    path: '',
    handler: notes_controller.get
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: notes_controller.get
  },
  {
    method: ['POST', 'PUT'],
    path: '/{id}',
    handler: notes_controller.put
  },
  {
    method: ['POST', 'PUT'],
    path: '',
    handler: notes_controller.post
  }
]