const db = require('../index');
const tagQueries = require('./tags');   
const userQueries = require('./user');   
const gamemodeQueries = require('./gamemodes');
const templateQueries = require('./template');
const helpers = require('../helpers/uploads');

const getGames = async ({limit = 100, orderKey = 'creation_date', order = 'asc'} = {}) => {
    return await db.select().from('games').orderBy(orderKey, order).limit(limit);
}

const getGame = async (game_id) => {
    let tags = await db.pluck('tag_id').from('tags_by_games').where('game_id', game_id.id);
    return await Promise.all([
        db.select().from('games').where('id', game_id.id),
        db.pluck('label').from('tags').where('id', tags[0]).orWhere('id', tags[1]).orWhere('id', tags[2]),
        db.select().from('users_by_games').where('game_id', game_id.id)
    ]).then( responses => {
        return {
            game_infos : responses[0][0],
            game_tags : Object.values(responses[1]),
            game_users_id : responses[2].map( user => user.user_id)
        }
    }) ;
}

const createGame = async (query = {}) => {
    // console.log("QUERY :::::::::::::", query)
    let gamemode = await gamemodeQueries.getGamemode({gamemode : query.gamemode}).then (rep => rep[0].id);
    let template = await templateQueries.getTemplate({template : query.template}).then (rep => rep[0].id);
    let path = 'https://source.unsplash.com/random/120x120';
    let invite_link = `http://${process.env.HOST}:${process.env.PORT}/invite?${query.name.split}`

    if (query.file){
        path = helpers.uploadFile(query.file);
    }

    return await db.insert({'name': query.name, 'invite_link': invite_link, 'cover' : path, 'gamemode_id' : gamemode, 'template_sheet_id' : template}).into('games').then( async (game_id) => {
        // insert tags in table, but need to recreate array from JSON string before
        let tags = Array.isArray(query.tags) ? query.tags : JSON.parse(query.tags);
        let existingTags = await tagQueries.getTags({tags : tags});

        await tagQueries.createTags(
            existingTags.map(tag => tag.label))
            .then (async rep => {
                let arrTagsGame = rep.map(tag_id => {
                    return {
                        tag_id : tag_id,
                        game_id : game_id[0]
                    }
                })

                await tagQueries.linkTagToGame({arrTagsGame : arrTagsGame});
            })

        //same for players array
        let players = Array.isArray(query.players) ? query.players : JSON.parse(query.players);
        await Promise.all(players
            .map( async player => await userQueries.getUser({pseudo : player}))
            ).then (async arrUsersGame => {
                arrUsersGame = arrUsersGame.map (item => {
                    return {
                        user_id : item.id,
                        game_id : game_id[0]
                    }
                })

                await userQueries.linkUsersToGame({arrUsersGame : arrUsersGame});
            })
            return 'New game : ', game_id[0] ;
    })
}

module.exports = {
    getGames,
    getGame,
    createGame
}