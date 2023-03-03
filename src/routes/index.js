// module.exports = [
//   ...require('./api'),
//   ...require('./notes'),
//   ...require('./stats')
// ]

module.exports = [
  ...assemble_routes('/notes', require('./notes')),
  ...assemble_routes('/api', require('./api')),
  ...assemble_routes('/stats', require('./stats'))
]

function assemble_routes(root_path, routes) {
  return routes.map((route) =>
    ({ ...route, path: root_path + route.path })
  )
}