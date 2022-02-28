import React from "react";
import "./App.scss";
import ColorPicker from "./Components/ColorPicker/ColorPicker";
import Name from "./Components/Name/Name";

function App() {
  return (
    <div>
      <Name />
      <ColorPicker />
    </div>
  );
}

export default App;
