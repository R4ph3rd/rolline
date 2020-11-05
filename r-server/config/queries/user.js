const db = require('../index');

const getUsers = async ({limit = 100, orderKey = 'inscription_date', order = 'desc'} = {}) => {
    return await db.select().from('users').orderBy(orderKey, order).limit(limit);
}

const getUser = async ({id, pseudo, mail}) => {
    if (id){
        return await db.select().from('users').where('id', id).then( async (res) => {
            let games = await db.pluck('game_id').from('users_by_games').where('user_id', res[0].id);
            return {infos_user : res[0], games_id : games}
        })
    }
    if (pseudo){
      return await db.select().from('users').where('pseudo', pseudo).then( async (res) => {
        // let games = await db.pluck('game_id').from('users_by_games').where('user_id', res[0].id);
          return res[0];
      })
    }
    if (mail){
      return await db.select().from('users').where('mail', mail).then( async (res) => {
        // let games = await db.pluck('game_id').from('users_by_games').where('user_id', res[0].id);
          return res[0];
      })
    }
}

const createUser = async ({pseudo = '', mail = '', password = '', discord_id = '', picture = 'https://source.unsplash.com/random/120x120'}) => {
  return await db.insert({'pseudo': pseudo, 'mail': mail, 'password': password, 'discord_id': discord_id, 'picture' : picture}).into('users');
}

const userConnexion = async({mail = '', password = '', name = ''} = {}) => {
  if (mail){
    return await db.select().from('users').where({'mail': mail, 'password' : password});
  }
  else if (name){
    return await db.select().from('users').where({'name': name, 'password' : password});
  }
  return 'Please provide mail or name and password to connect.'
}

const linkUsersToGame = async ({game_id, user_id, arrUsersGame = [{game_id, user_id}]}) => {
  if (game_id){
      return await db.insert({'user_id': user_id, 'game_id' : game_id}).into('users_by_games').then (id => {
          return id;
      })
  }
  else if (arrUsersGame){
      return await db.insert(arrUsersGame).into('users_by_games').then (id => {
          return id;
      })
  }
  
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    userConnexion,
    linkUsersToGame
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
*///////////////