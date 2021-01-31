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
        options: {
            auth: 'jwt',
            payload: {
              output: "stream",
              parse: true,
              multipart: true,
              maxBytes : process.env.maxBytes
            },
          },
        handler: async (request, h) => {
            /* console.log('-----------------  UPLOAD FILE --------------------')
            console.log('file : ', request.payload.file)
            console.log('token:', request.auth.token);
            console.log('credentiels:', request.auth.credentials); */
            return await assetsQueries.uploadAsset({
                userID: request.auth.credentials.id,
                file: request.payload.file,
                label : 'null'
            });
        }
    },
]