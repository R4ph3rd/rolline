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
    fog.center();
    console.log(board.getItemsByName('FogOfWar'));
}