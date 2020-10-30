const fs = require('fs');

module.exports =  {

    uploadFile : (file) => {
        const folder = `${__dirname}/../../data/public/game_covers/`;
        let files = fs.readdirSync(folder);
        let i = 0;

        while (files.includes(file.hapi.filename)){
            file.hapi.filename = file.hapi.filename.split('.')[0] + `-(${i}).` + file.hapi.filename.split('.')[1]; 
            i ++ ;
        }

        const writeStream = fs.createWriteStream(
            // `${__dirname}/uploads/${data.file.hapi.filename}` //change me
            `${folder}${file.hapi.filename}` //change me
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