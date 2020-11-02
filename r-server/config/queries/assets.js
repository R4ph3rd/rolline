const db = require('../index');
const helpers = require('../helpers')

const getAssets = async (userID) => {
    return await db.select().from('assets').where('owner_id', userID);
}

const uploadAsset = ({userID, file, label}) => {
    let path = helpers.uploadFile(file, `data/users/${userID}/${helpers.findType(file.hapi.filename)}`);

    await db.insert({label : label, path : path, owner_id : userID}).into('assets').then (id => {
        return id;
    })
}

module.exports = {
    getAssets,
    uploadAsset
}