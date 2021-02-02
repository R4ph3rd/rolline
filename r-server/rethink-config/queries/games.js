const r = require('rethinkdb');
const connection = require('..');

module.exports = {
    createGame: async ({name}) => {
        let game = await r.db(process.env.RT_DB_NAME).table('games').filter({name: name}).count().run(await connection);
        console.log(name + ' table count :', await game);
        if(!game){
            r.db(process.env.RT_DB_NAME).table('games').insert({ // id column as automatically filled
                name,
                chat_id: undefined,
                boards_id: [],
                audios_id: [],
                assets_id: []
            }).run(await connection, function(err, res) {
                if(err) throw err;
                console.log(name + ' row created');
            })
        }
    },
}