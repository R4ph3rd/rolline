const assetsQueries = require('../queries/assets');
const helpers = require('../helpers/types');

module.exports = [
    {
        method: 'GET',
        path: '/assets/{user}/{file}',
        handler: (request, h) => {
            if( helpers.typeFinder(request.params.file) == 'audio'){
                return h.file(`data/users/${request.params.user}/audio/${request.params.file}`);
            } else if( helpers.typeFinder(request.params.file) == 'image'){
                return h.file(`data/users/${request.params.user}/images/${request.params.file}`);
            } else {
                return h.file('404.html').code(404);
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