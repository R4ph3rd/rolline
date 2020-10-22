const Hapi = require('@hapi/hapi');
const Inert = require('inert');
require('dotenv').config();

const routes = require('./config/routes')

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT /*8181*/ ,
        host: process.env.HOST /*localhost*/,
        routes: {
            cors: true
        },
        debug: { request: ['error'] }
    })

    await server.register(Inert);

    await server.start();
    console.log('Server running on %s', server.info.uri)

    server.route(routes)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();