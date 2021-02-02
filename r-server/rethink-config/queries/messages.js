const r = require('rethinkdb');
const connection = require('..');

module.exports = {
    createChat: ({chatID, gameID = null}) => {
        r.db(process.env.RT_DB_NAME).table('chats').insert({ // id column as automatically filled
            name,
            gameID,
            messages: [],
        }).run(await connection, function(err, res) {
            if(err) throw err;
            console.log('new chat row created');
        })
    },
    getChatdByGame: ({gameID}) => {
        return await r.db(process.env.RT_DB_NAME).table('chats').getAll(gameID, {index: 'gameID'}).pluck('index');
    },
    addMessage: async ({gameID, chatID = module.exports.getChatdByGame({gameID}), userID, msg, to}) => {
        r.db(process.env.RT_DB_NAME).table('chats').get(chatID).update({ // id column as automatically filled
            messages: r.row(messages).append({
                userID,
                msg,
                timestamp: Date.now(),
                to: to || 'everyone'
            })
        }).run(await connection, function(err, res) {
            if(err) throw err;
        })
    },
    getMessages: async ({gameID, chatID = module.exports.getChatdByGame({gameID})}) => {
        return await r.db(process.env.RT_DB_NAME).table('chats').get(chatID).pluck('messages');
    },
    getMessagesByUser: async ({gameID, chatID = module.exports.getChatdByGame({gameID}), userID}) => {
        return await r.db(process.env.RT_DB_NAME).table('chats').get(chatID).pluck('messages').filter(message => message.userID == userID);
    },
}