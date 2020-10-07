const db = require('../index');

const getGames = async ({limit = 100, orderKey = 'creation_date', order = 'asc'} = {}) => {
    return await db.select().from('games').orderBy(orderKey, order).limit(limit);
}

const getGame = async (id) => {
    let game =  await db.select().from('games').where('id', id)
    let tags =  await db.select().from('tags_by_games').where('game_id', id)
    let users =  await db.select().from('users_by_games').where('game_id', id)

    return {
        game_infos : game,
        game_tags : tags,
        game_users : users
    }
}

const createGame = async ({name = '', tags = []}) => {
    await db.insert({'name': name, 'invite_link': 'http://raphaelperraud.com'}).into('games').then( (rep) => {
        // insert tags in table
        console.log('game create :', rep)
        // tags.forEach( (tag, i) => {
        //     let tagColumn = 'tag_' + i;
        //     await db.insert({'game_id': game_id, tagColumn : tag}).into('tags_by_games')
        // })
    })
}

module.exports = {
    getGames,
    getGame,
    createGame
}