const assetsQueries = require('../queries/assets');
module.exports = [
    {
        method: 'GET',
        path: '/assets/1/{file*}',
        handler: {
            directory:{
                path: './data/users/1/images',
                listing: true
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/{user}',
        handler: async (request, h) => {
            return await assetsQueries.getAssets(request.params.user);
        }
    },
]