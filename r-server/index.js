const Hapi = require('@hapi/hapi');
require('dotenv').config();

const queries = require('./config/queries');
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

    await server.start();
    console.log('Server running on %s', server.info.uri)

    server.route(routes)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();