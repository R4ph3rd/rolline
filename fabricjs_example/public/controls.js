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

    if (board.isDrawingMode){
        document.getElementById('controls-modals').classList.remove('hidden')
    } else {
        console.log('coool')
        document.getElementById('controls-modals').classList.add('hidden')
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