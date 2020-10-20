const gameQueries = require('../queries/game');

module.exports = [
    {
        method: 'GET',
        path: '/game/{game_id?}',
        handler: async (request, h) => {
            if (request.params.game_id){
                return await gameQueries.getGame({id: request.params.game_id});
            } else {
                return await gameQueries.getGames();
            }
        }
    },
    {
        method: 'POST',
        path: '/game',
        // headers: {"Access-Control-Allow-Origin": "*"},
        handler: async (request, h) => {
            // await gameQueries.creatGame({name: request.payload.name, tags: request.payload.tags});
            let query = undefined ;

            if (request.payload) query = request.payload;
            else if (request.query) query = request.query;
            else if (h.request.payload) query = h.request.payload;

            if (query != undefined){
                return await gameQueries.createGame(query).then( rep => {
                    console.log(rep);
                    return 'requete effectuée !'
    
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