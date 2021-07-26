import React, { useState } from "react";
import Icon from "./Icon";

function SpritesArea({ setShowModal }) {
  const [addSpriteHoveredOn, setAddSpriteHoveredOn] = useState({
    show: false,
    text: "",
  });

  function handleClick() {
    setShowModal(true);
  }

  function handleMouseEnter(text) {
    setAddSpriteHoveredOn({ show: true, text });
  }

  function handleMouseLeave() {
    setAddSpriteHoveredOn({ show: false, text: "" });
  }
  return (
    <div className="h-1/2 mt-4 bg-white border-t rounded-tl-xl">
      <div
        className="border-8 rounded-full border-white transition ease-in hover:border-blue-100 absolute bottom-8 right-8"
        onMouseEnter={() => handleMouseEnter("Choose a sprite")}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {addSpriteHoveredOn.show ? (
          <span className="bg-green-500 text-white absolute right-16 bottom-2 rounded px-8 py-1 w-max">
            {addSpriteHoveredOn.text}
          </span>
        ) : null}

        <Icon
          name="plus"
          size="50"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-green-500 border-4 border-blue-100"
        />
      </div>
    </div>
  );
}

export default SpritesArea;
