import React, { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../Context/Context";
import "./Canvas.scss";

function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();
  const canvasContext = useRef();
  const { mainColor } = useContext(ColorContext);
  const [drawingColor, setDrawingColor] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineWidth = 10;
    context.lineCap = "round";

    canvasContext.current = context;
  }, []);

  useEffect(() => {
    setDrawingColor(mainColor);
    if (mainColor) {
      canvasContext.current.strokeStyle = mainColor;
    }
  }, [mainColor]);

  function StartPainting(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    canvasContext.current.beginPath();
    canvasContext.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function EndPainting() {
    canvasContext.current.closePath();
    setIsDrawing(false);
  }

  function Painting(e) {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    canvasContext.current.lineTo(offsetX, offsetY);
    canvasContext.current.stroke();
  }

  return (
    <div className='canvas'>
      <canvas
        ref={canvasRef}
        onMouseDown={StartPainting}
        onMouseUp={EndPainting}
        onMouseMove={Painting}
      ></canvas>
    </div>
  );
}

export default Canvas;
