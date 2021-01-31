const r = require('rethinkdb');
const connection = require('..');

module.exports = {
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
            console.error(process.env.RT_DB_NAME + " table isn't settled yet. Something went wrong during initialization.")
        }
        
    }
}