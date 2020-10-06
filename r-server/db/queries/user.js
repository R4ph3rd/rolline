const db = require('../index');

const getUsers = async ({limit = 100, orderKey = 'inscription_date', order = 'desc'} = {}) => {
    return await db.select().from('users').orderBy(orderKey, order).limit(limit);
}

const getUser = async (infosUser) => {
    if (infosUser.id){
        return await db.select().from('users').where('id', infosUser.id)
    }
    if (infosUser.discord_id){
        return await db.select().from('users').where('name', infosUser.discord_id)
    }
    if (infosUser.mail){
        return await db.select().from('users').where('name', infosUser.mail)
    }
    if (infosUser.inscription_date){
        return await db.select().from('users').where('name', infosUser.inscription_date)
    }
}

const createUser = async ({mail = '', password = '', discord_id = ''}) => {
    await db.insert({'mail': mail, 'password': password, 'discord_id': discord_id}).into('users');
}

module.exports = {
    getUsers,
    getUser,
    createUser
}


// localhost:3000/ => form
// POST localhost:3000/user => soumettre values form
// GET localhost:3000/user => get tous les users en json
// GET localhost:3000/user?user_id=???? => get user specifique


/* ////////////
// Using trx as a transaction object:
knex.transaction(function(trx) {

  const books = [
    {title: 'Canterbury Tales'},
    {title: 'Moby Dick'},
    {title: 'Hamlet'}
  ];

  knex.insert({name: 'Old Books'}, 'id')
    .into('catalogues')
    .transacting(trx)
    .then(function(ids) {
      books.forEach((book) => book.catalogue_id = ids[0]);
      return knex('books').insert(books).transacting(trx);
    })
    .then(trx.commit)
    .catch(trx.rollback);
})
.then(function(inserts) {
  console.log(inserts.length + ' new books saved.');
})
.catch(function(error) {
  // If we get here, that means that neither the 'Old Books' catalogues insert,
  // nor any of the books inserts will have taken place.
  console.error(error);
});
*////////////////