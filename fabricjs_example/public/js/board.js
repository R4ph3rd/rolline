const board = new fabric.Canvas('board', {
    width: window.innerWidth,
    height: window.innerHeight
});

// responsiveboard();
board.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 300, left: 300 }));