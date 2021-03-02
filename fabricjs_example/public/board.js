const board = new fabric.Canvas('board', {
    width: window.innerWidth,
    height: window.innerHeight
});

// responsiveboard();
board.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 300, left: 300 }));

addEventListener('keydown', function(e){
    console.log(e)
    if (['Delete','Backspace'].includes(e.key)){
        board.getActiveObjects().forEach((obj) => {
            board.remove(obj)
        });
        board.discardActiveObject().renderAll()
        console.log('object(s) deleted');
    }
})