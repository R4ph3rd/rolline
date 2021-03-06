board.on('object:added', insertIntoLayer);
board.on('path:created', insertIntoLayer);

const layers = {
    active: document.getElementById('layers').value.toLowerCase(),
    movables: new fabric.Group(),
    backgrounds: new fabric.Group(),
    hidden: new fabric.Group()
};

for (let group in layers){
    if (group != 'active'){
        layers[group].toObject = function(){
            return {name: group};
        }
        layers[group].name = group;
        board.add(layers[group]);
        console.log(layers[group], JSON.stringify(board))
    }
}

function insertIntoLayer(e){
    console.log(e.target, board)
    if (!this.canvas) return;
    
    layers[layers.active].add(e.target);
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
                    layers[group].selectable = false;
                    console.log('group unselectable : ' + group, layers[group])
                }
            }
    
            layers[layers.active].selectable = true;
        }
    } else {
        console.warn('No active layer selected.')
    }
    
}