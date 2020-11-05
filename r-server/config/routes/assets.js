const assetsQueries = require('../queries/assets');
const helpers = require('../helpers/types');

module.exports = [
    {
        method: 'GET',
        path: '/assets/{user}/{file?}',
        handler: async (request, h) => {
            if (request.params.file){
                if( helpers.typeFinder(request.params.file) == 'audio'){
                    return h.file(`data/users/${request.params.user}/audio/${request.params.file}`);
                } else if( helpers.typeFinder(request.params.file) == 'image'){
                    return h.file(`data/users/${request.params.user}/images/${request.params.file}`);
                } else {
                    return h.file('404.html').code(404);
                }
            } else {
                return await assetsQueries.getAssets(request.params.user);
            }
        }
    },
    {
        method: 'POST',
        path: '/assets',
        config: {
            auth: 'jwt'
        },
        handler: async (request, h) => {
            console.log(request)
            return 'cooll'
            /* return await assetsQueries.uploadAsset({
                userID:2,
                file: request.file,
                label : 'null'
            }); */
        }
    },
]