import React, { useState } from "react";
import "./App.scss";
import ColorPicker from "./Components/ColorPicker/ColorPicker";
import Name from "./Components/Name/Name";
import { ColorContext } from "./Components/Context/Context";

function App() {
  const [mainColor, setMainColor] = useState("");

  return (
    <div>
      <ColorContext.Provider value={{ mainColor, setMainColor }}>
        <Name />
        <ColorPicker />
      </ColorContext.Provider>
    </div>
  );
}

export default App;
