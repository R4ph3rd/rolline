window.onresize = resizeCanvas;

function resizeCanvas() {
    const winW = window.innerWidth,
          winH = window.innerHeight,
          curW = board.getWidth(),
          curH = board.getHeight(),
          canW = winW - 75,
          canH = winH - 60;

    /*  $wrapper.add('.refs').css({
      width: canW,
      height: canH
    }); */
    board.setWidth(canW);
    board.setHeight(canH);
    board.renderAll();
  };