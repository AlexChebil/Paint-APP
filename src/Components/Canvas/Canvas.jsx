import React, { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../Context/Context";
import "./Canvas.scss";

function Canvas() {
  const width = window.innerWidth - 20;
  const height = window.innerHeight - 375;
  const canvasRef = useRef();
  const canvasContext = useRef();
  const { mainColor } = useContext(ColorContext);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(25);
  const [lineOpacity, setLineOpacity] = useState(0.5);
  const [isErasing, setIsErasing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineWidth = 10;
    context.lineCap = "round";

    canvasContext.current = context;
  }, []);

  useEffect(() => {
    canvasContext.current.lineWidth = lineWidth;
    canvasContext.current.globalAlpha = lineOpacity;
  }, [lineWidth, lineOpacity]);

  useEffect(() => {
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

  function earaseHandler() {
    setIsErasing((prev) => !prev);

    switch (true) {
      case isErasing:
        canvasContext.current.strokeStyle = "white";
        break;

      default:
        canvasContext.current.strokeStyle = mainColor;
        break;
    }
  }

  return (
    <div className='canvas'>
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        onMouseDown={StartPainting}
        onMouseUp={EndPainting}
        onMouseMove={Painting}
      ></canvas>

      <div className='settings'>
        <div className='lineWidth'>
          <p>Line Width</p>
          <input
            type='range'
            value={lineWidth}
            min={1}
            max={50}
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </div>

        <div className='lineOpacity'>
          <p>lineOpacity</p>
          <input
            type='range'
            step='0.1'
            min={0.1}
            max={1}
            value={lineOpacity}
            onChange={(e) => setLineOpacity(e.target.value)}
          />
        </div>

        {isErasing ? (
          <button style={{ backgroundColor: "red" }} onClick={earaseHandler}>
            Erase
          </button>
        ) : (
          <button style={{ backgroundColor: "green" }} onClick={earaseHandler}>
            Erasing
          </button>
        )}
      </div>
    </div>
  );
}

export default Canvas;
