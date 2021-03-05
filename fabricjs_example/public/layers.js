board.on('object:added', insertIntoLayer);
board.on('path:created', insertIntoLayer);

const layers = {
    active: document.getElementById('layers').value.toLowerCase(),
    movables: new fabric.Group(),
    backgrounds: new fabric.Group(),
    hidden: new fabric.Group()
};

function insertIntoLayer(e){
    layers[layers.active].add(e.target);
    console.log('insert object to layer ' + layers.active, layers[layers.active])
}

function setActiveLayer(layer){
    console.log('new active layer', layer)
    if (Object.keys(layers).filter(plop => plop != layers.active).includes(layer.toLowerCase())){
        console.log('Active layer is now ', layer);
        layers.active = layer.toLowerCase();

        for (let group in layers){
            if (group != layers.active && group != 'active'){
                // layers[group].selectable = false;
                console.log('group ' + group, layers[group])
            }
        }

        layers[layers.active].selectable = true;
    }
}