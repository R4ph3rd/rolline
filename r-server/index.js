const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
require('dotenv').config();

const routes = require('./config/routes')

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT /*8181*/ ,
        host: process.env.HOST /*localhost*/,
        routes: {
            cors: true,
            /* files: {
                relativeTo: Path.join(__dirname, 'data')
            } */
        },
        debug: { request: ['error'] }
    })

    await server.register(Inert);

    await server.start();
    console.log('Server running on %s', server.info.uri)

    server.route(routes)

    server.route({
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory:{
                path: 'data/users/1/images',
                listing: true
            }
        }
    })
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();