const board = new fabric.Canvas('board', {
    width: window.innerWidth,
    height: window.innerHeight
});

// responsiveCanvas();
board.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
