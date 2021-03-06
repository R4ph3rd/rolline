board.on('object:added', insertIntoLayer);
board.on('path:created', insertIntoLayer);

const layers = {
    active: document.getElementById('layers').value.toLowerCase(),
    movables: [],
    backgrounds: [],
    hidden: []
};

// for (let group in layers){
//     if (group != 'active'){
//         layers[group].toObject = function(){
//             return {name: group};
//         }
//         layers[group].name = group;
//         board.add(layers[group]);
//         console.log(layers[group], JSON.stringify(board))
//     }
// }

function insertIntoLayer(e){
    board.setActiveObject(e.target);
    console.log(e.target, board)
    // if (!this.canvas) return;
    
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
                    // layers[group].selectable = false;
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