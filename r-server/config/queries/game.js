const db = require('../index');

const getGames = async ({limit = 100, orderKey = 'creation_date', order = 'asc'} = {}) => {
    return await db.select().from('games').orderBy(orderKey, order).limit(limit);
}

const getGame = async (game_id) => {
    return await Promise.all([
        db.select().from('games').where('id', game_id.id),
        db.select('tag_1', 'tag_2', 'tag_3').from('tags_by_games').where('game_id', game_id.id),
        db.select('user_id').from('users_by_games').where('game_id', game_id.id)
    ]).then( responses => {
        return {
            game_infos : responses[0][0],
            game_tags : Object.values(responses[1][0]),
            game_users_id : responses[2].map( user => user.user_id),
            cool : 'super'
        }
    }) ;
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