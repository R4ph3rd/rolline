const assetsQueries = require('../queries/assets');

module.exports = [
    /* {
        method: 'GET',
        path: '/assets/{file*}',
        handler: {
            directory:{
                path: 'data/users'
            }
        }
    }, */
    {
        method: 'GET',
        path: '/assets/{user}',
        handler: async (request, h) => {
            return await assetsQueries.getAssets(request.params.user);
        }
    },
]