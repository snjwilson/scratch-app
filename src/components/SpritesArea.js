import React, { useState } from "react";
import Icon from "./Icon";

function SpritesArea({ selectedSprites, setSelectedSprites, setShowModal }) {
  const currentSprite = selectedSprites.find((sprite) => sprite.currentSprite);

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
    <div className="h-1/2 mt-4 bg-gray-100 border-t rounded-tl-xl">
      <div className="all-sprites-top-bar bg-white p-2">
        <div className="p-1">
          <span className="m-2 text-sm font-bold">Sprite</span>
          <input
            className="border-2 border-gray-200 focus:border-blue-300 p-2"
            value={currentSprite.name}
          ></input>
        </div>
      </div>
      <div className="flex w-max p-3">
        {selectedSprites.map((sprite, index) => (
          <div
            onClick={() => {
              const newSelectedSprites = selectedSprites.map(
                (selectedSprite) => {
                  if (selectedSprite.name === sprite.name) {
                    selectedSprite.currentSprite = true;
                  } else {
                    selectedSprite.currentSprite = false;
                  }
                  return selectedSprite;
                }
              );
              setSelectedSprites(newSelectedSprites);
            }}
            key={`sprites-area-${index}`}
            className={`border-gray-300 border-4 rounded-lg w-max transform scale-75 bg-gray-100 hover:border-blue-400 hover:bg-white ${
              sprite.currentSprite ? "border-blue-500" : ""
            }`}
          >
            <div className="p-2 h-3/4">{sprite.component}</div>
            <div
              className={`text-center p-2 ${
                sprite.currentSprite ? "bg-blue-400 text-white" : ""
              }`}
            >
              {sprite.name}
            </div>
          </div>
        ))}
      </div>
      <div
        className="transition ease-in absolute bottom-8 right-8"
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
