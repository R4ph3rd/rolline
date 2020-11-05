const gameQueries = require("../queries/game");
const uploads = require('../helpers/uploads.js');
const fs = require("fs");

module.exports = [
  {
    method: "GET",
    path: "/game/{game_id?}",
    
    handler: async (request, h) => {
      if (request.params.game_id) {
        return await gameQueries.getGame({ id: request.params.game_id });
      } else {
        return await gameQueries.getGames();
      }
    },
  },
  {
    method: "POST",
    path: "/game",
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
      let query = request.payload;;

      if (query != undefined) {
        return await gameQueries.createGame(query).then((rep) => {
          return rep;
        });
      } else {
        return {
          statusCode: 403,
          error:
            "La requête n'a pas abouti. Veuillez vérifier les paramètres de celle-ci.",
          requete: query,
        };
      }
    },
  },
  {
    method: "POST",
    path: "/upload_file",
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
        return uploads.uploadFile(data.file);
      } else {
        return 'Couldn"t upload the file.'
      }
    },
  },
];
