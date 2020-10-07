const gameQueries = require('./game');
const userQueries = require('./user');

module.exports = [].concat(userQueries, gameQueries)