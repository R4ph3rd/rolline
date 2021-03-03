function toggleDraw(){
    board.isDrawingMode = !board.isDrawingMode;
    clearCanvasOptions('drawing');
    
    console.log(`Drawing mode ${board.isDrawingMode ? 'enabled' : 'disabled'}`);

    if (board.freeDrawingBrush) {
        if (board.freeDrawingBrush.getPatternSrc) {
            board.freeDrawingBrush.source = board.freeDrawingBrush.getPatternSrc.call(brush);
        }
        setBrush();
    }
}

function setBrush(){
    board.freeDrawingBrush.width = document.getElementById('line-width').value || 1;
    board.freeDrawingBrush.color = document.getElementById('drawing-color').value || '#000000';
    fillBrushType();
}

function toggleShape(){
    freeDrawing = !freeDrawing;
    clearCanvasOptions('shaping');
    
    board.selection = !board.selection;

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
        freeDrawing = false;
    } 
    if (option != 'drawing'){
        board.isDrawingMode = false;
        console.log('drawing mode', board.isDrawingMode)
    }


    // SETTINGS MODAL DISPLAY

    document.getElementById('controls-modals-draw').classList.add('hidden');
    document.getElementById('controls-modals-shapes').classList.add('hidden');

    if (board.isDrawingMode){
        document.getElementById('controls-modals-draw').classList.remove('hidden')
    } else if (freeDrawing){
        document.getElementById('controls-modals-shapes').classList.remove('hidden')
    }
}


////////
const fillBrushType = (name = document.getElementById('drawing-mode').value) => {
    switch (name){
        case 'hLine':
            board.freeDrawingBrush = hLinePatternBrush;
        break;
        case 'vLine':
            board.freeDrawingBrush = vLinePatternBrush;
        break;
        case 'square':
            board.freeDrawingBrush = squarePatternBrush;
        break;
        case 'texture':
            board.freeDrawingBrush = texturePatternBrush;
        break;
        default:
            board.freeDrawingBrush = new fabric[name + 'Brush'](board);
        break;
    }
}


/* EVENT LISTENERS */

////// LAYERS

document.getElementById('layers').addEventListener('change', (e) => {
    console.log(e.target.value)
    
    setActiveLayer(e.target.value);
})

////// DRAW SETTINGS

document.getElementById('drawing-color').addEventListener('change', e => {
    board.freeDrawingBrush.color = e.target.value;

    if (board.freeDrawingBrush.getPatternSrc) {
        board.freeDrawingBrush.source = board.freeDrawingBrush.getPatternSrc.call(brush);
    }
})

document.getElementById('line-width').addEventListener('change', e => {
    board.freeDrawingBrush.width = parseInt(e.target.value, 10) || 10;
})

document.getElementById('drawing-mode').addEventListener('change', (e) => {
    console.log(e.target.value)
    
    fillBrushType();
    setBrush(e.target.value);
})

//////// SHAPES SETTINGS
document.getElementById('fill-color').addEventListener('change', e => {
    shapeOptions.rectProps.fill = e.target.value;
})
document.getElementById('stroke-color').addEventListener('change', e => {
    shapeOptions.rectProps.stroke = e.target.value;
})
document.getElementById('stroke-width').addEventListener('change', e => {
    shapeOptions.rectProps.strokeWidth = parseInt(e.target.value);
    console.log(parseInt(e.target.value), shapeOptions.rectProps)
})