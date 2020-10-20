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
            console.log('Insertion of new game made', request.payload)
            return 'Insertion of new game made !';
        }
    }
]