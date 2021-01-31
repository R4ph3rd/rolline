const r = require('rethinkdb');
const connection = require('..');

module.exports = {
    createChat: ({chatID, gameID = null}) => {
        r.db(process.env.RT_DB_NAME).table('chats').insert({ // id column as automatically filled
            name,
            messages: [],
        }).run(await connection, function(err, res) {
            if(err) throw err;
            console.log('new chat row created');
        })
    },
    addMessage: async ({chatID, userId, msg, to}) => {
        r.db(process.env.RT_DB_NAME).table('chats').get(chatID).update({ // id column as automatically filled
            messages: r.row(messages).append({
                userId,
                msg,
                timestamp: Date.now(),
                to: to || 'everyone'
            })
        }).run(await connection, function(err, res) {
            if(err) throw err;
        })
    },
    getMessages: async ({chatID}) => {
        return await r.db(process.env.RT_DB_NAME).table('chats').get(chatID).pluck('messages');
    }
}