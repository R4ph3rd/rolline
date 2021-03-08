board.on('mouse:down', onMouseDown);
board.on('mouse:move', onMouseMove);
board.on('mouse:up', onMouseUp);
board.on('object:added', insertIntoLayer);
board.on('path:created', insertIntoLayer);
board.on('object:removed', removeObjectInLayer);
board.on('path:removed', removeObjectInLayer);

board.on('mouse:wheel', Zoom);
board.on('mouse:down', startPan);
board.on('mouse:move', pan);
board.on('mouse:up', endPan);
board.on('mouse:down', writeText);
board.on('mouse:up', clipEraserPath);
