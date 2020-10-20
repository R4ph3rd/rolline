const userQueries = require('../queries/user');

module.exports = [
    {
        method: 'GET',
        path: '/user/{user?}',
        handler: async (request, h) => {
            if (request.params.user){
                return await userQueries.getUser({id: request.params.user});
            } else {
                return await userQueries.getUsers();
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
            let query = {
                mail : undefined,
                password : undefined
            };

            if (request.payload){
                query.mail = request.payload.mail ;
                query.password = request.payload.password;
            }
            else if (request.query){
                query.mail = request.query.mail ;
                query.password = request.query.password;
            }
            else if (h.request.payload){
                query.mail = h.request.payload.mail ;
                query.password = h.request.payload.password;
            }

            if (query.mail != undefined){
                return await userQueries.userConnexion(query).then( rep => {
                    if (rep.length == 0){
                        return {
                            statusCode: 403,
                            error: 'Adresse mail ou mot de passe incorrect(s).',
                            query: query
                        }
                    } else if (rep.length == 1){
                        return {
                            statusCode : 200,
                            token : 'ohhAUHG398uyjhgau86YGigAYGhG7102U6gbs6IghjUTA7t62h'
                        } ;
                    } else {
                        return {
                            statusCode: 500,
                            error: "Une erreur s'est produite du côté serveur. Veuillez réessayer votre demande."
                        }
                    }
    
                });
            } else {
                return {
                    statusCode : 403,
                    error: "La requête n'a pas abouti. Veuillez vérifier les paramètres de celle-ci.",
                    requete : query
                }
            }
            
        }
    }
]