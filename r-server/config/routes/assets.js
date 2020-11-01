// const assetsQueries = require('../queries/assets');

module.exports = [
    {
        method: 'GET',
        path: '/{user?}/assets/all',
        handler: async (request, h) => {
            /* if (request.params.user){
                return await assetsQueries.getUser({id: request.params.user});
            } else {
                return await assetsQueries.getUsers();
            } */
        }
    },
]