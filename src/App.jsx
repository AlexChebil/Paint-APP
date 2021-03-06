import React, { useState } from "react";
import "./App.scss";
import ColorPicker from "./Components/ColorPicker/ColorPicker";
import Name from "./Components/Name/Name";
import { ColorContext } from "./Components/Context/Context";
import Canvas from "./Components/Canvas/Canvas";

function App() {
  const [mainColor, setMainColor] = useState("");

  return (
    <div>
      <Name />
      <ColorContext.Provider value={{ mainColor, setMainColor }}>
        <ColorPicker />
        <Canvas />
      </ColorContext.Provider>
    </div>
  );
}

export default App;
