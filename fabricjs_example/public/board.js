const board = new fabric.Canvas('board', {
    width: window.innerWidth,
    height: window.innerHeight
});

// responsiveboard();
board.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 300, left: 300 }));


// KEYBOARD EVENTS
addEventListener('keydown', function(e){
    console.log(e)
    if (['Delete','Backspace'].includes(e.key)){
        board.getActiveObjects().forEach((obj) => {
            board.remove(obj)
        });
        board.discardActiveObject().renderAll()
        console.log('object(s) deleted');

    } else if (e.keyCode == 71){ // Ctrl + g
        console.log(e.shiftKey)
        if (e.ctrlKey && e.shiftKey){
            console.log('ungroup')
            if (!board.getActiveObject()) return;
            if (board.getActiveObject().type !== 'group') return;
            
            board.getActiveObject().toActiveSelection();
            board.requestRenderAll();
        } else if (e.ctrlKey){
            console.log('group')
            if (!board.getActiveObject()) return;
            if (board.getActiveObject().type !== 'activeSelection') return;

            board.getActiveObject().toGroup();
            board.requestRenderAll();
        }
    } else if (e.keyCode == 65 && e.ctrlKey){ // Ctrl + a
        console.log('select all')
        board.discardActiveObject();
        var sel = new fabric.ActiveSelection(board.getObjects(), {
          board: board,
        });
        board.setActiveObject(sel);
        board.requestRenderAll();

        e.preventDefault();
    }
})