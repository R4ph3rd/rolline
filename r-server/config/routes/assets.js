const assetsQueries = require('../queries/assets');
module.exports = [
    {
        method: 'GET',
        path: '/assets/dir/{file*}',
        handler: {
            directory : {
                path : ['data/users/1/images', 'data/users/1/audio']
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/{user}/{file}',
        handler: (request, h) => {
            let audioExt = ['mp3', 'wav'];
            let imageExt = ['png', 'jpg', 'gif', 'jpeg'];
            audioExt = audioExt.map (audio => new RegExp(audio + '$', 'i'))
            imageExt = imageExt.map (img => new RegExp(img + '$', 'i'))

            if (audioExt.some( audio => audio.test(request.params.file))){
                return h.file(`data/users/${request.params.user}/audio/${request.params.file}`);
            } else if (imageExt.some( img => img.test(request.params.file))){
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