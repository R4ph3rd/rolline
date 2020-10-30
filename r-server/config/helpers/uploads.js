const fs = require('fs');

module.exports =  {

    uploadFile : (file) => {
        const folder = `${__dirname}/../../data/public/game_covers/`;
        let files = fs.readdirSync(folder);
        let i = 0;

        // console.log(file)

        while (files.includes(file.hapi.filename)){
            file.hapi.filename = file.hapi.filename.split('.')[0] + `-(${i}).` + file.hapi.filename.split('.')[1]; 
            i ++ ;
        }

        const writeStream = fs.createWriteStream(
            // `${__dirname}/uploads/${data.file.hapi.filename}` //change me
            `${folder}${file.hapi.filename}` //change me
        );
        // console.log('stream :', writeStream)
        writeStream.on("error", (err) => console.log('ERROR : ', err));

        file.pipe(writeStream);

        let dl = 0; 
        file.on('data', function(chunck) {
            dl += chunck.length; // return bytes
            // console.log('dl', dl, process.env.maxBytes)
            if (dl > process.env.maxBytes){
                console.log('!!! File too big !!!')
            }
        })
        
        

        file.on("end", (err) => {
            // return h.code(200);
            return err;
        });

        return `${__dirname}/../../data/public/game_covers/${file.hapi.filename}`;
    },

    getFilesizeInBytes : (filename) => {
        var stats = fs.statSync(filename)
        var fileSizeInBytes = stats["size"]
        return fileSizeInBytes
    }
}