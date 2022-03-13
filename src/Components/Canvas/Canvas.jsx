import React, { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../Context/Context";
import "./Canvas.scss";
import Slider from "@mui/material/Slider";

function Canvas() {
  const [width, setWidth] = useState(window.innerWidth - 20);
  const [height, setHeigh] = useState(window.innerHeight - 265);
  const canvasRef = useRef();
  const canvasContext = useRef();
  const { mainColor } = useContext(ColorContext);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(25);
  const [lineOpacity, setLineOpacity] = useState(0.1);
  const [isErasing, setIsErasing] = useState(true);

  //It sets the width and height of the graph based on the size of the browser window.
  function resizeHandler() {
    setWidth(window.innerWidth - 20);
    setHeigh(window.innerHeight - 265);
    // '-20 /-265' = Window width margin from the canvas.
  }

  /* Adding an event listener to the window. */
  window.addEventListener("resize", resizeHandler);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineWidth = 10;
    context.lineCap = "round";
    context.shadowColor = "blue";

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
        setLineOpacity(0.1);
        setLineWidth(50);
        break;

      default:
        canvasContext.current.strokeStyle = mainColor;
        setLineOpacity(0.5);
        setLineWidth(25);
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

          <Slider
            className='slider'
            size='small'
            aria-label='Default'
            valueLabelDisplay='auto'
            value={lineWidth}
            min={1}
            max={50}
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </div>

        <div className='lineOpacity'>
          <p>Line Opacity</p>

          <Slider
            className='slider'
            size='small'
            aria-label='Small steps'
            valueLabelDisplay='auto'
            value={lineOpacity}
            step={0.1}
            min={0.1}
            max={1}
            marks /* `marks` is a prop that allows you to add a label to the slider. */
            onChange={(e) => setLineOpacity(e.target.value)}
          />
        </div>

        {isErasing ? (
          <button onClick={earaseHandler}>Erase</button>
        ) : (
          <button style={{ backgroundColor: "red" }} onClick={earaseHandler}>
            Erasing
          </button>
        )}
      </div>
    </div>
  );
}

export default Canvas;
