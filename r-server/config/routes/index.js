const userRoutes = require('./user')
const gameRoutes = require('./game')
const assetsRoutes = require('./assets')
const authRoutes = require('./auth')

module.exports = [].concat(userRoutes, gameRoutes, assetsRoutes, authRoutes)