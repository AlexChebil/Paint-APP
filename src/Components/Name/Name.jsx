import React, { useState } from "react";
import "./Name.scss";

function Name() {
  const [name, setName] = useState("");

  return (
    <label htmlFor='name'>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onClick={() => setName("")}
        placeholder='Untitled'
        type='text'
        id='name'
      />
    </label>
  );
}

export default Name;
