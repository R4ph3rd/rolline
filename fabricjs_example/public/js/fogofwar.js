let clearingFog = false;

function resetFog(){
    let fog = new fabric.Circle({
        radius: window.innerWidth > window.innerHeight ? window.innerWidth * 10 : window.innerHeight * 10,
        top : 0,
        left: 0,
        fill: '#00000050',
        selectable: false,
        name: 'FogOfWar'
    });


    if (board.getItemsByName('FogOfWar').length >= 1){
        board.getItemsByName('FogOfWar').forEach(fog => {
            board.remove(fog);
        })
    } 

    board.add(fog);
    board.renderAll();
    fog.center().setCoords();
    console.log(board.getItemsByName('FogOfWar'));
}

function clipFog(e){
    board.getItemsByName('FogOfWar').forEach(fog => {
        let mask ;
        if (fog.clipPath){
          mask = new fabric.Group([fog.clipPath, e.target]);
        } else {
          mask = new fabric.Group([e.target]);
        }
        mask.inverted = true;
        fog.dirty = true;
        fog.clipPath = mask;
        board.remove(shapeOptions.shape);
    })
    console.log(board.getItemsByName('FogOfWar'))
    board.renderAll();
}