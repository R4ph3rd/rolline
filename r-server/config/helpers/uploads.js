const fs = require('fs');

module.exports =  {

    uploadFile : (file) => {
        const writeStream = fs.createWriteStream(
            // `${__dirname}/uploads/${data.file.hapi.filename}` //change me
            `${__dirname}/../../data/public/game_covers/${file.hapi.filename}` //change me
        );
        writeStream.on("error", (err) => console.log('ERROR : ', err));

        file.pipe(writeStream);

        file.on("end", (err) => {
            // return h.code(200);
            return err;
        });

        return `${__dirname}/../../data/public/game_covers/${file.hapi.filename}`;
    }
}