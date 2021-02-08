function toggleDraw(){
    board.isDrawingMode = !board.isDrawingMode;
    clearCanvasOptions('drawing');
    
    console.log(`Drawing mode ${board.isDrawingMode ? 'enabled' : 'disabled'}`)
}

function toggleShape(){
    freeDrawing = !freeDrawing;
    clearCanvasOptions('shaping');

    console.log(`Drawing shapes mode ${freeDrawing ? 'enabled' : 'disabled'}`)
}
function toggleSelector(){
    clearCanvasOptions('selector');
    console.log('Selector mode enabled')
}

function clearCanvasOptions(option){
    Array.from(document.getElementById('controls').children).forEach(control => control.classList.remove('active'));
    document.getElementById(option).classList.toggle('active');

    if (option != 'shaping'){
        options.drawRect = false;
        freeDrawing = false;
    } 
    if (option != 'drawing'){
        board.isDrawingMode = false;
        console.log('eoeoeo')
    }
}