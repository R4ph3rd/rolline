const db = require('../index');

const getTags = async ({id, tags, tag}) => {
    if (id){
        console.log('id :', id)
        return await db.select().from('tags').where('id', id);
    }

    if (tags){
        console.log('tags :', tags)
        return await db.select().from('tags').whereIn('label', tags);
    }
    
    if (tag){
        console.log('tag :', tag)
        return await db.select().from('tags').where('label', tag);
    }

    return null ;
}

const createTag = async (tags) => {
    return await getTags({tags : tags}).then ( async existingTags => {
        if (existingTags !== null){
            if (existingTags.length > 0 && existingTags.length != tags.length){
                let mappedExistingTags = existingTags.map(t => t.label)
                let newTags = tags.filter( tag => {
                    return !mappedExistingTags.includes(tag)
                });
    
                newTags = newTags.map(tag => {
                    return {label : tag}
                })
    
                /* return await db.insert(newTags).into('tags').then(id_tag => {
                    return id_tag
                }) */
    
                return Promise.all(newTags.map(async tag => {
                    return await insertNewtag(tag.label).then(id => {
                        return id
                    })
                })).then( (ids) => {
                    return ids;
                })
            } else {
                // just return tags ids if they are all already there
                return existingTags.map( tag => tag.id)
            }

        } else {
            tags = tags.map(tag => {
                return {label : tag}
            })

            /* return await db.insert(tags).into('tags').then(id_tag => {
                return id_tag
            }) */

            return Promise.all(tags.map(async tag => {
                return await insertNewtag(tag.label).then(id => {
                    return id
                })
            })).then( (ids) => {
                return ids;
            })
        }
    })
}

const insertNewtag = async (tag) => {
    return await db.insert({'label' : tag}).into('tags').then(id => {
        return id[0];
    })
}

const linkTagToGame = async ({game_id, tag_id, arrTagsGame = [{game_id, tag_id}]}) => {
    if (game_id){
        return await db.insert({'tag_id': tag_id, 'game_id' : game_id}).into('tags_by_games').then (id => {
            return id;
        })
    }
    else if (arrTagsGame){
        return await db.insert(arrTagsGame).into('tags_by_games').then (id => {
            return id;
        })
    }
    
}

module.exports = {
    getTags,
    createTag,
    linkTagToGame
}