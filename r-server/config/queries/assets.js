const db = require('../index');
const helpers = require('../helpers')
const fs = require('fs');

const getAssets = async (userID) => {
    return await db.select().from('assets').where('owner_id', userID);
}

const getAsset = async ({userID, assetID, label}) => {
    if (assetID){
        return await db.select().from('assets').where({owner_id: userID, id : assetID});
    }
    if (label){
        return await db.select().from('assets').where({owner_id: userID, label : label});
    }
}

const uploadAsset = async ({userID, file, label}) => {
    let path = await helpers.uploads.uploadFile(file, `data/users/${userID}/${helpers.types.typeFinder(file.hapi.filename)}s/`);
    
    // TODO : get some metadatas as File size, durée du son, taille de l'image
    setTimeout( () => {
        let stats = fs.statSync(path);
        console.log('stats :', stats)
    }, 1500)

    return await db.insert({label : label, path : path, owner_id : userID}).into('assets').then (id => {
        return id;
    })
}

module.exports = {
    getAssets,
    getAsset,
    uploadAsset
}