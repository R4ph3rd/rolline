const rethink = require('rethinkdb');
const conn = rethink.connect({ host: 'localhost', port: process.env.RT_PORT || 28015 }, async function(error, connection){
    // initialization DB
    if (await rethink.dbList().contains(process.env.RT_DB_NAME).run(connection)){
        console.log('Db is already settled.')
    } else {
        rethink.dbCreate(process.env.RT_DB_NAME).run(connection, async (err, res) => {
            if(err) throw err;
            console.log('New database created ! ', process.env.RT_DB_NAME);
        })
    }
    
    //initialization games table
    if (await rethink.db(process.env.RT_DB_NAME).tableList().contains('games').run(connection)){
        console.log('Games table is already settled.')
    } else {
        rethink.db(process.env.RT_DB_NAME).tableCreate('games').run(connection, function(err, res) {
            if(err) throw err;
            console.log('games table created');
        })
    }

    //initialization chats table
    if (await rethink.db(process.env.RT_DB_NAME).tableList().contains('chats').run(connection)){
        console.log('Chats table is already settled.')
    } else {
        rethink.db(process.env.RT_DB_NAME).tableCreate('chats').run(connection, function(err, res) {
            if(err) throw err;
            console.log('Chats table created');
        })
    }
})




module.exports = conn;