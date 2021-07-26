import React, { useState } from "react";
import Icon from "./Icon";
import CatSprite from "./CatSprite";
import allSprites from "./allSprites";

function Modal({ setShowModal, selectedSprites, setSelectedSprites }) {
  function handleSelection(spriteChosen) {
    setSelectedSprites([...selectedSprites, spriteChosen]);
    setShowModal(false);
  }
  return (
    <div className="h-screen w-screen bg-white absolute z-10">
      <div className="bg-blue-500">
        <div
          className="cursor-pointer flex text-white p-4 w-max"
          onClick={() => setShowModal(false)}
        >
          <Icon name="arrow-left" className="text-white" />
          <span className="ml-4">Back</span>
        </div>
      </div>
      <div className="all-sprites flex">
        {allSprites.map((spriteObj) => (
          <div
            className="p-2 border-gray-300 border-2 hover:border-blue-300 m-2 cursor-pointer"
            onClick={() => handleSelection(spriteObj)}
          >
            {spriteObj.component}
          </div>
        ))}
        {/* <div className="p-2 border-gray-300 border-2 hover:border-blue-300 m-2 cursor-pointer">
          <CatSprite />
        </div>
        <div className="p-2 border-gray-300 border-2 hover:border-blue-300 m-2 cursor-pointer">
          <CatSprite />
        </div> */}
      </div>
    </div>
  );
}

export default Modal;
