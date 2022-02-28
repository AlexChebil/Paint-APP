import React, { useEffect, useRef, useState } from "react";

function ColorPicker() {
  const colorRef = useRef();
  const [color, setColor] = useState("");

  useEffect(() => {
    //for a random color on each mount
    let randomHex = Math.floor(Math.random() * 16777215).toString(16); //operation to get a random valid hex code
    setColor(`#${randomHex}`);
  }, []);
  // add color api here for similar colors

  return (
    <div>
      <input
        onChange={(e) => setColor(e.target.value)}
        value={color}
        ref={colorRef}
        type='color'
      />
    </div>
  );
}

export default ColorPicker;
