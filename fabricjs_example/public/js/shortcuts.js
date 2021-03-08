let clipboard;
// KEYBOARD EVENTS
addEventListener('keydown', function(e){
    console.log(e)
    if (['Delete','Backspace'].includes(e.key)){
        board.getActiveObjects().forEach((obj) => {
            board.remove(obj)
        });
        board.discardActiveObject().renderAll()
        console.log('object(s) deleted');

    } else if (e.ctrlKey){
        if (e.keyCode == 71){ // Ctrl + g
            console.log(e.shiftKey)
            if (e.shiftKey){
                console.log('ungroup')
                if (!board.getActiveObject()) return;
                if (board.getActiveObject().type !== 'group') return;
                
                board.getActiveObject().toActiveSelection();
                board.requestRenderAll();
            } else {
                console.log('group')
                if (!board.getActiveObject()) return;
                if (board.getActiveObject().type !== 'activeSelection') return;

                board.getActiveObject().toGroup();
                board.requestRenderAll();
            }
        } else if (e.keyCode == 65){ // Ctrl + a
            console.log('select all')
            board.discardActiveObject();
            var sel = new fabric.ActiveSelection(board.getObjects(), {
            board: board,
            });
            board.setActiveObject(sel);
            board.requestRenderAll();

            e.preventDefault();
        } else if (e.keyCode == 67) { // Ctrl + c
            board.getActiveObject().clone(function(cloned) {
                clipboard = cloned;
            });
        } else if (e.keyCode == 86){ // Ctrl + v
            clipboard.clone(function(clonedObj) {
                board.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 10,
                    top: clonedObj.top + 10,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    // active selection needs a reference to the board.
                    clonedObj.board = board;
                    clonedObj.forEachObject(function(obj) {
                        board.add(obj);
                    });
                    // this should solve the unselectability
                    clonedObj.setCoords();
                } else {
                    board.add(clonedObj);
                }
                clipboard.top += 10;
                clipboard.left += 10;
                board.setActiveObject(clonedObj);
                board.requestRenderAll();
            })
        }
    }
})