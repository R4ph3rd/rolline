board.on('object:added', insertIntoLayer);
board.on('path:created', insertIntoLayer);
board.on('object:removed', removeObjectInLayer);
board.on('path:removed', removeObjectInLayer);

// Not integrated to fabric.Canvas object, so we have to store it also when serialized canvas to DB
const layers = {
    active: document.getElementById('layers').value.toLowerCase(),
    movables: [],
    backgrounds: [],
    hidden: []
};

function removeObjectInLayer(e){
    console.log(e.target)
    const layer = Object.keys(layers).find(l => {
        console.log(l, layers[l] == e.target)
        return typeof l != 'string' && layers[l].includes(e.target)
    });
    
    console.log(layer)
    const i = layers[layer].findIndex(object => object == e.target);

    layers[layer].splice(i, 1);

    console.log('Object removed from ', layer, ' layer at index ', i);
}

function insertIntoLayer(e){
    board.setActiveObject(e.target);
    console.log('New object : ', e.target)
    
    layers[layers.active].push(e.target);
    console.log('insert object to layer ' + layers.active, layers[layers.active])
}

function setActiveLayer(layer){
    console.log('new active layer', layer)

    if (layers[layers.active]){
        if (Object.keys(layers).filter(plop => plop != layers.active).includes(layer.toLowerCase())){
            console.log('Active layer is now ', layer);
            layers.active = layer.toLowerCase();
    
            for (let group in layers){
                if (group != layers.active && group != 'active'){
                    for (let object of layers[group]){
                        object.selectable = false;
                    }
                    console.log('group unselectable : ' + group, layers[group])
                }
            }
    
            layers[layers.active].forEach(object => {
                object.selectable = true;  
            });
        }
    } else {
        console.warn('No active layer selected.')
    }
    
}