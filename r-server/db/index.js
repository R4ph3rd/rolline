const knex =  require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'phpserver',
        database: 'rolline'
    }
})

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