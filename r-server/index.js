const Hapi = require('@hapi/hapi');
require('dotenv').config();

const userQueries = require('./db/queries/user');
const gameQueries = require('./db/queries/game');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT /*8181*/ ,
        host: process.env.HOST /*localhost*/,
        routes: {
            cors: true
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri)

    //////// USERS ///////////
    server.route({
        method: 'GET',
        path: '/user/{user?}',
        // headers: {"Access-Control-Allow-Origin": "*"},
        handler: async (request, h) => {
            
            if (request.params.user){
                let user = await userQueries.getUser({id: request.params.user});
                return {data: user, msg : `Hello ${user[0].mail} !`};
            } else {
                return {data: await userQueries.getUsers()};
            }
        }
    })

    server.route({
        method: 'POST',
        path: '/user',
        // headers: {"Access-Control-Allow-Origin": "*"},
        handler: async (request, h) => {
            console.log(request, h)
            await userQueries.createUser({mail: request.payload.mail, password: request.payload.password, discord_id: request.payload.discord_id});
            console.log('Insertion made')
            return 'Insertion made !';
        }
    })

    //////////// GAMES /////////
    server.route({
        method: 'GET',
        path: '/game/{game_id?}',
        handler: async (request, h) => {
            if (request.params.game_id){
                let game = await gameQueries.getGame({id: request.params.game_id});
                return {data: game};
            } else {
                return {data: await gameQueries.getGames()};
            }
        }
    })

    server.route({
        method: 'POST',
        path: '/game',
        // headers: {"Access-Control-Allow-Origin": "*"},
        handler: async (request, h) => {
            console.log(request.payload)
            await gameQueries.creatGame({name: request.payload.name, tags: request.payload.tags});
            console.log('Insertion of new game made')
            return 'Insertion of new game made !';
        }
    })
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();