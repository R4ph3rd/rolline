const { from } = require('../index');
const db = require('../index');

const getTemplate = async ({template}) => {
    return await db.select().from('template_sheets').where('name', template);
}

module.exports = {
    getTemplate
}