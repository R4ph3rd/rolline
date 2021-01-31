const r = require('rethinkdb');
const connection = require('..')

module.exports = {
    createDb: async () => {
        let db = await r.dbList().contains(process.env.RT_DB_NAME).run(await connection);
        if(!db){
            r.dbCreate(process.env.RT_DB_NAME).run(await connection, (err, res) => {
                if(err) throw err;
                console.log('New database created ! ', process.env.RT_DB_NAME);
            })
        }
    },
    createGame: async ({name}) => {
        if (await r.dbList().contains(process.env.RT_DB_NAME).run(await connection)){
            let table = await r.db(process.env.RT_DB_NAME).tableList().contains(name).run(await connection);
            console.log(name + ' table :', await table);
            if(!table){
                r.db(process.env.RT_DB_NAME).tableCreate(name).run(await connection, function(err, res) {
                    if(err) throw err;
                    console.log(name + ' table created')
                })
            }
        } else {
            module.exports.createDb();
            module.exports.createGame({name});
        }
        
    }
}