const db = require('../index');

const getGames = async ({limit = 100, orderKey = 'creation_date', order = 'asc'} = {}) => {
    return await db.select().from('games').orderBy(orderKey, order).limit(limit);
}

const getGame = async (game_id) => {
    console.log('id : ', game_id.id)
    let game =  await db.select().from('games').where('id', game_id.id)
    let tags =  await db.select('tag_1', 'tag_2', 'tag_3').from('tags_by_games').where('game_id', game_id.id)
    let users =  await db.select('user_id').from('users_by_games').where('game_id', game_id.id)
    console.log( game, tags, users.map( user => user.user_id))

    return {
        game_infos : game,
        game_tags : tags,
        game_users_id : users.map( user => user.user_id)
    }
}

const createGame = async ({name = 'COCOGAME', tags = []}) => {
    await db.insert({'name': name, 'invite_link': 'http://raphaelperraud.com'}).into('games').then( (rep) => {
        // insert tags in table
        console.log('game create ')
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