const knex =  require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

knex.raw('select 1+1 as result').then(function () {
    // there is a valid connection in the pool
    console.log('knex is connected to DB');

  }).catch((err) => {
      console.log(err);
      throw err;
});

module.exports = knex ;
