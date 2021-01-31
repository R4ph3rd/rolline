const rethink = require('rethinkdb');
const conn = rethink.connect({ host: 'localhost', port: process.env.RT_PORT || 28015 })

module.exports = conn;