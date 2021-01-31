const rethink = require('rethinkdb');
const conn = rethink.connect({ host: 'localhost', port: process.env.RT_PORT || 28015 }, async function(error, connection){
    // initialization
    if (await rethink.dbList().contains(process.env.RT_DB_NAME).run(connection)){
        console.log('Db is already settled.')
    } else {
        let db = await rethink.dbList().contains(process.env.RT_DB_NAME).run(connection);
        if(!db){
            rethink.dbCreate(process.env.RT_DB_NAME).run(connection, (err, res) => {
                if(err) throw err;
                console.log('New database created ! ', process.env.RT_DB_NAME);
            })
        }
    }
})




module.exports = conn;