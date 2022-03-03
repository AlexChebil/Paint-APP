import React, { useContext, useEffect, useRef, useState } from "react";
import "./ColorPicker.scss";

function ColorPicker() {
  const colorRef = useRef();
  const [color, setColor] = useState("");
  const [similarColors, updateSimilarColors] = useState();
  const numberOfSimilarColors = [0, 1, 2, 3, 4, 5, 6];

  useEffect(() => {
    //for a random color on each mount
    let randomHex = Math.floor(Math.random() * 16777215).toString(16); //operation to get a random valid hex code
    setColor(`#${randomHex}`);
  }, []);

  async function getSimilarColors() {
    const colorVar = color;
    let cleanHexCode = colorVar.split("");
    cleanHexCode.shift();
    cleanHexCode = cleanHexCode.join("");

    const fetched = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${cleanHexCode}&count=7`
    );
    const res = await fetched.json();
    const data = await res.colors;
    updateSimilarColors(data);
  }

  useEffect(() => {
    getSimilarColors();
  }, [color]);

  return (
    <div>
      <input
        className='colorInput'
        onChange={(e) => setColor(e.target.value)}
        value={color}
        ref={colorRef}
        type='color'
      />
      <div className='similarColors'>
        {similarColors
          ? numberOfSimilarColors.map((entry) => (
              <div
                key={entry}
                onClick={() => setColor(similarColors[entry].hex.value)}
                style={{ backgroundColor: `${similarColors[entry].hex.value}` }}
              ></div>
            ))
          : null}
      </div>
    </div>
  );
}

export default ColorPicker;
