let erasing = false;

function erase(){
    board.freeDrawingBrush = new fabric.PencilBrush(board);
}

function clipEraserPath(e){
    /* layers[layers.active].clipPath = e.target;

    board.remove(e.target)
    board.discardActiveObject().renderAll() */
}