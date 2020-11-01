const db = require('../index');

const getAssets = async () => {
    return await db.select().from('assets');
}

module.exports = {
    getAssets
}