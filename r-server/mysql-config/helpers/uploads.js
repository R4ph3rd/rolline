const fs = require('fs');

module.exports =  {
    uploadFile : async (file, dir) => {
        const folder = dir ? `${__dirname}/../../${dir}` : `${__dirname}/../../data/public/common/`;
        let files = fs.readdirSync(folder);
        let i = 0;
        let newFileName = file.hapi.filename;

        while (files.includes(newFileName)){
            i ++ ;
            newFileName = file.hapi.filename.split('.')[0] + `-(${i}).` + file.hapi.filename.split('.')[1];
        }
        file.hapi.filename = newFileName;


        const writeStream = fs.createWriteStream(
            // `${__dirname}/uploads/${data.file.hapi.filename}` //change me
            `${folder}${file.hapi.filename}` //change me
        );

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
            return fs.statSync(`${__dirname}/../../${dir}/${file.hapi.filename}`);
        });

        return `${__dirname}/../../${dir}/${file.hapi.filename}`; // TODO : tenter de virer ce return pour attendre la promesse 
    },
}