const userQueries = require('../queries/user');
const Jwt = require('hapi-auth-jwt2');
const token = require('jsonwebtoken');

module.exports = [
    {
        method: 'GET',
        path: '/user/{user?}',
        config: {
            auth : 'jwt'
        },
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
            console.log(request.payload)
            return await userQueries.createUser(request.payload).then ( id => {
                return {
                    statusCode : 203,
                    id : id[0]
                }

            })
            .catch(err => {
                return err;
            })
        }
    },
    {
        method: 'POST',
        path: '/user_connect',
        handler: async (request, h) => {
            console.log('---------------- USER CONNECT REQUEST -------------------')
            let query = {
                mail : undefined,
                password : undefined
            };

            if (request.payload){
                query.mail = request.payload.mail ;
                query.password = request.payload.password;
            }

            console.log("query", query)

            if (query.mail != undefined){
                return await userQueries.userConnexion(query).then( rep => {
                    if (rep.length == 0){
                        return {
                            statusCode: 403,
                            error: 'Adresse mail ou mot de passe incorrect(s).',
                            query: query
                        }
                    } else if (rep.length == 1){
                        const cookie_options = { // TODO : en principe, je règle un cookie avec le token ici
                            ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
                            encoding: 'none',    // we already used JWT to encode
                            isSecure: true,      // warm & fuzzy feelings
                            isHttpOnly: true,    // prevent client alteration
                            clearInvalid: false, // remove invalid cookies
                            strictHeader: true   // don't allow violations of RFC 6265
                        };
                        let userToken = token.sign(query, process.env.SECRET_KEY);
                        h.response()
                            .header("Authorization", userToken)
                            .state("token", userToken, cookie_options);

                        return {
                            statusCode : 200,
                            token : token.sign(query, process.env.SECRET_KEY)
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
    },
    {
        method: "POST",
        path: "/{user}/upload_file",
        options: {
          payload: {
            output: "stream",
            parse: true,
            multipart: true,
            maxBytes : process.env.maxBigBytes
          },
        },
        handler: async (request, h) => {
          const data = request.payload;
    
          if (data.file) {
            return uploads.uploadFile(data.file, `users/${user}`);
          } else {
            return 'Couldn"t upload the file.'
          }
        },
      },
]