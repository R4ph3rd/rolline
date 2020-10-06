const Hapi = require('@hapi/hapi');
require('dotenv').config();

const userQueries = require('./db/queries/user');

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
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();