require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('hapi-auth-jwt2');
const token = require('jsonwebtoken');
const auth = require('./config/auth');

const routes = require('./config/routes')

// bring your own validation function
const validate = async function (decoded, request, h) {
    return {isValid : true};
};

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT /*8181*/ ,
        host: process.env.HOST /*localhost*/,
        routes: {
            cors: true
        },
        debug: { request: ['error'] }
    })

    // Authentification
    await server.register(Jwt);
    server.auth.strategy('jwt', 'jwt', { 
            key: process.env.SECRET_KEY, 
            validate : auth.validate,
            verifyOptions: { ignoreExpiration: true }
        }
    );

    // Auth needed by default for all routes
    // server.auth.default('jwt');

    await server.start();
    console.log('Server running on %s', server.info.uri)

    server.route(routes)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();