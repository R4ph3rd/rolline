const canvas_container = document.querySelector('.canvas-container')
canvas_container.addEventListener('drop', function (e) {
    console.log("DROP");
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    var dt = e.dataTransfer;
    var files = dt.files;
    for (var i=0; i<files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
          
        //attach event handlers here...
        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            var imgInstance = new fabric.Image(img, {
                left: 100,
                top: 100,
            });
            board.add(imgInstance);
        }
        reader.readAsDataURL(file);
    }
    return false;
});
canvas_container.addEventListener('dragover', cancel);
canvas_container.addEventListener('dragenter', cancel);

function cancel(e) {
    if (e.preventDefault) { e.preventDefault(); }
    return false;
}