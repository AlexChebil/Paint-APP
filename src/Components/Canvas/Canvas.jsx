import React, { useEffect, useRef } from "react";
import "./Canvas.scss";
function Canvas() {
  const canvasRef = useRef();

  useEffect(() => {
    canvasRef.current.getContext("2d");
    console.log(canvasRef);
  }, []);

  function startPainting(e) {
    console.log(e.nativeEvent);
  }

  function painting() {}

  function endPainting() {}

  return (
    <div className='canvas'>
      <canvas
        ref={canvasRef}
        onMouseDown={startPainting}
        onMouseMove={painting}
        onMouseUp={endPainting}
      ></canvas>
    </div>
  );
}

export default Canvas;
