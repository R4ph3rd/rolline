const board = new fabric.Canvas('board', {
    width: window.innerWidth,
    height: window.innerHeight
});

// find items in fabricjs canvas
fabric.Canvas.prototype.getItemsByName = function(name) {
    let objectList = [],
        objects = this.getObjects();
  
    for (let i = 0, len = this.size(); i < len; i++) {
      if (objects[i].name && objects[i].name === name) {
        objectList.push(objects[i]);
      }
    }
  
    return objectList;
};

// responsiveboard();
board.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 300, left: 300 }));