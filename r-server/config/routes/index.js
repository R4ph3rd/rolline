const userRoutes = require('./user')
const gameRoutes = require('./game')
const assetsRoutes = require('./assets')

module.exports = [].concat(userRoutes, gameRoutes, assetsRoutes)