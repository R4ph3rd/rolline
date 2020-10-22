const db = require('../index');
const tagQueries = require('./tags');   
const userQueries = require('./user');   
const fs = require('fs')

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
    console.log(query)
    await db.insert({'name': query.name, 'invite_link': 'http://raphaelperraud.com', 'cover' : 'https://source.unsplash.com/random/120x120'}).into('games').then( async (game_id) => {
        // insert tags in table
        await tagQueries.createTag(query.tags).then (async rep => {
            let arrTagsGame = rep.map(tag_id => {
                return {
                    tag_id : tag_id,
                    game_id : game_id[0]
                }
            })
            console.log('tag rep', rep, arrTagsGame)

            await tagQueries.linkTagToGame({arrTagsGame : arrTagsGame}).then (rep => {
                console.log('link', rep)
            });
        })

        await Promise.all(query.players
            .map( async player => await userQueries.getUser({pseudo : player}))
        ).then (async arrUsersGame => {
            arrUsersGame = arrUsersGame.map (item => {
                return {
                    user_id : item.id,
                    game_id : game_id[0]
                }
            })
            console.log('game create ', arrUsersGame)

            await userQueries.linkUsersToGame({arrUsersGame : arrUsersGame}).then(first_row_id => {
                console.log('not first_row_id', first_row_id)
            })
        })
        // tags.forEach( (tag, i) => {
        //     let tagColumn = 'tag_' + i;
        //     await db.insert({'game_id': game_id, tagColumn : tag}).into('tags_by_games')
        // })
    })
}


const uploadFile = async (file) => {
    console.log(file)
    return fs.writeFile('../../data/public/game_covers/filename.png', file, err => {
        if (!err) {
          console.log('Uploaded!')
          return 'Uploaded!'
        } else {
            console.log('Something went wrong.')
            return 'Something went wrong.'

        }
      })
}

module.exports = {
    getGames,
    getGame,
    createGame,
    uploadFile
}