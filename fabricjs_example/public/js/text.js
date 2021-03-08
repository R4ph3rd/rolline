let texting = false;

function writeText(options) {
    console.log('cool')
    if (texting && options.target == null) {
        addText(options.e);
    }
}

function addText(e) {
    let text = new fabric.IText('',{
        left: e.offsetX,
        top: e.offsetY
    });

    board.add(text);
    text.enterEditing();
}