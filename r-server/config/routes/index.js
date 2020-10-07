const user = require('../queries/user')
const userRoutes = require('./user')
const gameRoutes = require('./game')

module.exports = [].concat(userRoutes, gameRoutes)