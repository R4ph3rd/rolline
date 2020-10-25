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
    handler: async (request, h) => {
      let query = undefined;

      if (request.payload) query = request.payload;
      else if (request.query) query = request.query; // test request
      else if (h.request.payload) query = h.request.payload;

      if (query != undefined) {
        return await gameQueries.createGame(query).then((rep) => {
          console.log(rep);
          return "requete effectuée !";
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
      },
    },
    handler: async (request, h) => {
      const data = request.payload;
      console.log('upload file :::::::::', data)

      if (data.file) {
        const writeStream = fs.createWriteStream(
          // `${__dirname}/uploads/${data.file.hapi.filename}` //change me
          `${__dirname}/../../data/public/game_covers/${data.file.hapi.filename}` //change me
        );
        writeStream.on("error", (err) => console.log('ERROR : ', err));

        data.file.pipe(writeStream);

        data.file.on("end", (err) => {
          // return h.code(200);
          return err;
        });
        return 'Upload done'
      } else {
        return 'Couldn"t upload the file.'
      }
    },
  },
];
