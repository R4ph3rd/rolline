const board = new fabric.Canvas('board', {
    width: window.innerWidth,
    height: window.innerHeight
});

board.on('mouse:down', onMouseDown);
board.on('mouse:move', onMouseMove);
board.on('mouse:up', onMouseUp);

// responsiveboard();
board.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));


let initialPos, bounds, rect, dragging = false, freeDrawing = false
const options = {
    drawRect: true,
    onlyOne: false,
    rectProps: {
        stroke: 'red', 
        strokeWidth: 1, 
        fill: 'blue'
    }
}

    
function onMouseDown(e) {
    dragging = true;
    if (!freeDrawing) return;

    initialPos = { ...e.pointer }
    bounds = {};

    if(options.drawRect){
      rect = new fabric.Rect({
        left: initialPos.x,
        top: initialPos.y,
        width: 0, height: 0,
       ...options.rectProps
      });
       board.add(rect)        
    }
}

function update(pointer) {
    if (initialPos.x > pointer.x) {
      bounds.x = Math.max(0, pointer.x)
      bounds.width = initialPos.x - bounds.x
    } else {
      bounds.x = initialPos.x
      bounds.width = pointer.x - initialPos.x
    }
    if (initialPos.y > pointer.y) {
      bounds.y = Math.max(0, pointer.y)
      bounds.height = initialPos.y - bounds.y
    } else {
      bounds.height = pointer.y - initialPos.y
      bounds.y = initialPos.y
    }
    if(options.drawRect){
      rect.left = bounds.x
      rect.top = bounds.y
      rect.width = bounds.width
      rect.height = bounds.height
      rect.dirty = true
      board.requestRenderAllBound()
    }
}

function onMouseMove(e) {
    if (!dragging || !freeDrawing) {
      return
    }
    requestAnimationFrame(() => update(e.pointer))
}

function onMouseUp(e) {
    dragging = false;
    if (!freeDrawing) {return}
    if (options.drawRect && rect && (rect.width == 0 || rect.height === 0)) {
        board.remove(rect)
    }
    if(!options.drawRect||!rect){
        rect = new fabric.Rect({
        ...bounds, left: bounds.x, top: bounds.y,
        ...options.rectProps
        });
        board.add(rect)  
        rect.dirty = true
        board.requestRenderAllBound()
    }
    rect.setCoords() // important! 
}
