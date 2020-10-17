const userQueries = require('../queries/user');

module.exports = [
    {
        method: 'GET',
        path: '/user/{user?}',
        handler: async (request, h) => {
            if (request.params.user){
                return {data : await userQueries.getUser({id: request.params.user})};
            } else {
                return {data: await userQueries.getUsers()};
            }
        }
    },
    {
        method: 'POST',
        path: '/user',
        handler: async (request, h) => {
            // console.log(request, h)
            await userQueries.createUser({mail: request.payload.mail, password: request.payload.password, discord_id: request.payload.discord_id});
            console.log('Insertion made')
            return 'Insertion made !';
        }
    },
    {
        method: 'POST',
        path: '/user_connect',
        handler: async (request, h) => {
            console.log(request)
            return await userQueries.userConnexion({mail: request.payload.mail, password: request.payload.password}).then( rep => {
                console.log(rep.length)
                if (rep.length == 0){
                    return {
                        statusCode: 403,
                        error: 'Adresse mail ou mot de passe incorrect(s).'
                    }
                } else if (rep.length == 1){
                    return {token : 'ohhAUHG398uyjhgau86YGigAYGhG7102U6gbs6IghjUTA7t62h'} ;
                } else {
                    return {
                        statusCode: 500,
                        error: "Une erreur s'est produite du côté serveur. Veuillez réessayer votre demande."
                    }
                }

            });
        }
    }
]