board.on('object:added', insertIntoLayer);
board.on('path:created', insertIntoLayer);

const layers = {
    active: 'movables',
    movables: new fabric.Group(),
    backgrounds: new fabric.Group(),
    hidden: new fabric.Group()
};

function insertIntoLayer(e){
    console.log('insert object to layer', e.target)

    // layers[layers.active].add(e.target);

}

function setActiveLayer(layer){
    if (Object.keys(layers).filter(plop => plop != active).includes(layer)){
        console.log('Active layer is now ', layer);
        layers.active = layer;

        /* Object.keys(layers).filter(plop => plop != active).forEach(group => {
            console.log('group', group)
            // group.selectable = false;
        }) */
    }
}