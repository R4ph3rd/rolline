const db = require('../index');

const getGamemode = async ({gamemode}) => {
    return await db.select().from('gamemodes').where('name', gamemode);
}

module.exports = {
    getGamemode
}