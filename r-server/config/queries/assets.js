const db = require('../index');
const helpers = require('../helpers')

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
    let path = helpers[0].uploadFile(file, `data/users/${userID}/${helpers[1].typeFinder(file.hapi.filename)}s/`); // TODO : changer l'accessibilité aux helpers pour éviter de sélectionner l'index du tbaleau formé par concat

    return await db.insert({label : label, path : path, owner_id : userID}).into('assets').then (id => {
        return id;
    })
}

module.exports = {
    getAssets,
    getAsset,
    uploadAsset
}