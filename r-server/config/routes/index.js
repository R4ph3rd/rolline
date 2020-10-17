const user = require('../queries/user')
const userRoutes = require('./user')
const gameRoutes = require('./game')

// const fs = require('fs');


module.exports = [].concat(userRoutes, gameRoutes)