const knex =  require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

console.log(process.env.DB_USER, process.env.DB_PASSWORD)
knex.raw('select 1+1 as result').then(function () {
    // there is a valid connection in the pool
    console.log('knex is connected to DB');

  }).catch((err) => {
      console.log(err);
      throw err;
});


// user: 'rolline_api',
// password: '32158960ttt',

module.exports = knex ;