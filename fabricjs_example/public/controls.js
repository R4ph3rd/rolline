function toggleDraw(){
    board.isDrawingMode = !board.isDrawingMode;

    document.getElementById('drawing').classList.toggle('active');
    
    console.log(`Drawing mode ${board.isDrawingMode ? 'enabled' : 'disabled'}`)
}

function toggleShape(){
    options.drawRect = !options.drawRect;
    freeDrawing = !freeDrawing;
    document.getElementById('shaping').classList.toggle('active');

    console.log(`Drawing mode ${board.isDrawingMode ? 'enabled' : 'disabled'}`)
}