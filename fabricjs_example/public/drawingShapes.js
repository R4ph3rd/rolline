let dragging = false, freeDrawing = false
let shapeOptions = {
    shapeType: 'rect',
    shape: {},
    initialPos : {},
    bounds: {},
    rectProps: {
        stroke: document.getElementById('stroke-color').value, 
        strokeWidth: parseInt(document.getElementById('stroke-width').value), 
        fill: document.getElementById('fill-color').value
    }
}

    
function onMouseDown(e) {
    dragging = true;
    if (!freeDrawing) return;

    shapeOptions.initialPos = { ...e.pointer }
    shapeOptions.bounds = {};

    if(shapeOptions.shapeType == 'rect'){
      shapeOptions.shape = new fabric.Rect({
        left: shapeOptions.initialPos.x,
        top: shapeOptions.initialPos.y,
        width: 0, height: 0,
       ...shapeOptions.rectProps
      });
       board.add(shapeOptions.shape)        
    }
}

function update(pointer) {
    if (shapeOptions.initialPos.x > pointer.x) {
      shapeOptions.bounds.x = Math.max(0, pointer.x)
      shapeOptions.bounds.width = shapeOptions.initialPos.x - shapeOptions.bounds.x
    } else {
      shapeOptions.bounds.x = shapeOptions.initialPos.x
      shapeOptions.bounds.width = pointer.x - shapeOptions.initialPos.x
    }

    if (shapeOptions.initialPos.y > pointer.y) {
      shapeOptions.bounds.y = Math.max(0, pointer.y)
      shapeOptions.bounds.height = shapeOptions.initialPos.y - shapeOptions.bounds.y
    } else {
      shapeOptions.bounds.height = pointer.y - shapeOptions.initialPos.y
      shapeOptions.bounds.y = shapeOptions.initialPos.y
    }
    
    if(shapeOptions.shapeType == 'rect'){
      shapeOptions.shape.left = shapeOptions.bounds.x
      shapeOptions.shape.top = shapeOptions.bounds.y
      shapeOptions.shape.width = shapeOptions.bounds.width
      shapeOptions.shape.height = shapeOptions.bounds.height
      shapeOptions.shape.dirty = true
      board.requestRenderAllBound()
    }
}

function onMouseMove(e) {
    if (!dragging || !freeDrawing) return
    requestAnimationFrame(() => update(e.pointer))
}

function onMouseUp(e) {
    dragging = false;
    if (!freeDrawing) {return}
    if (shapeOptions.shapeType == 'rect' && shapeOptions.shape && (shapeOptions.shape.width == 0 || shapeOptions.shape.height === 0)) {
        board.remove(shapeOptions.shape)
    }
    
    shapeOptions.shape = {};
}
