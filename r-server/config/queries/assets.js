const db = require('../index');

const getAssets = async (user_id) => {
    return await db.select().from('assets').where('owner_id', user_id);
}

module.exports = {
    getAssets
}