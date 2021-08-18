import React from "react";
import categories from "../categories";
import colours from "../colours";

export default function Sidebar({
  category,
  setCategory,
  dragged,
  handleDragStart,
  codeBlocks,
  setCodeBlocks,
  selectedSprites,
  setSelectedSprites,
}) {
  const currentSprite = selectedSprites.find((sprite) => sprite.currentSprite);

  // handle removing blocks when dragged from main to side
  function handleDrop(event) {
    event.preventDefault();
    if (!dragged.current.draggedFromSideBar) {
      dragged.current.element.remove();
    }
  }

  // handle drag over
  function handleDragOver(event) {
    event.preventDefault();
  }

  // handle drag end
  function handleDragEnd(event) {
    event.preventDefault();
    console.log(`Drag ended`);
    let newCodeBlocks = [...codeBlocks];
    newCodeBlocks = newCodeBlocks
      .filter((blocks) => blocks.length > 0)
      .map((blocks) => blocks.filter((block) => block.valid));
    setCodeBlocks(newCodeBlocks);
  }

  // capitalize first letter function
  function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  function handleFunctionality(blocks) {
    let {
      x: translateX,
      y: translateY,
      rotate: rotateDeg,
      name,
    } = currentSprite;
    const sprite = document.getElementById(name);
    let transformString = sprite.style.transform;
    blocks.map((block) => {
      if (block.category === "motion") {
        const { x, y, rotate } =
          categories[block.category][block.subCategory].functionality;
        if (x && !y) {
          translateX += x;
          transformString = /translateX\([0-9]+px\)/.test(transformString)
            ? transformString.replace(
                /translateX\([0-9]+px\)/,
                `translateX(${translateX}px)`
              )
            : transformString + `translateX(${translateX}px) `;
        } else if (y && !x) {
          translateY += y;
          transformString = /translateY\([0-9]+px\)/.test(transformString)
            ? transformString.replace(
                /translateY\([0-9]+px\)/,
                `translateY(${translateY}px)`
              )
            : transformString + `translateY(${translateY}px) `;
        } else if (rotate) {
          rotateDeg += rotate;
          transformString = /rotate\(-{0,1}[0-9]+deg\)/.test(transformString)
            ? transformString.replace(
                /rotate\(-{0,1}[0-9]+deg\)/,
                `rotate(${rotateDeg}deg)`
              )
            : transformString + `rotate(${rotateDeg}deg) `;
        } else if (x && y) {
          translateX = Math.round(x * Math.random() * 350);
          translateY = Math.round(y * Math.random() * 350);
          transformString = /translateX\([0-9]+px\)/.test(transformString)
            ? transformString.replace(
                /translateX\([0-9]+px\)/,
                `translateX(${translateX}px)`
              )
            : transformString + `translateX(${translateX}px) `;
          transformString = /translateY\([0-9]+px\)/.test(transformString)
            ? transformString.replace(
                /translateY\([0-9]+px\)/,
                `translateY(${translateY}px)`
              )
            : transformString + `translateY(${translateY}px) `;
        }
        sprite.style.transform = transformString;
      }
    });
    currentSprite.x = translateX;
    currentSprite.y = translateY;
    currentSprite.rotate = rotateDeg;
    const newSelectedSprites = selectedSprites.map((sprite) => {
      if (sprite.name === name) {
        return currentSprite;
      }
      return sprite;
    });
    setSelectedSprites(newSelectedSprites);
  }

  return (
    <div
      className="h-full flex flex-row"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="w-15 overflow-y-auto flex flex-col items-starts border-r border-gray-200">
        {Object.keys(categories).map((categoryType, index) => {
          return (
            <div
              key={index}
              className={`text-center text-xs hover:text-blue-400 cursor-pointer w-full p-1 mb-1 ${
                category === categoryType ? "bg-gray-300" : ""
              }`}
              onClick={() => setCategory(categoryType)}
            >
              <div
                className={`rounded-full ${colours[categoryType]} w-6 h-6 mx-auto`}
              ></div>
              <p>{categoryType}</p>
            </div>
          );
        })}
      </div>
      <div
        id="all-blocks"
        className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
      >
        {Object.keys(categories).map((categoryType, mainIndex) => {
          const blocksHeader = (
            <div className="font-bold" key={`${mainIndex}-sidebar-header`}>
              {capitalizeFirstLetter(categoryType)}
            </div>
          );
          const blocks = categories[categoryType].map((type, index) => {
            return (
              <div
                key={`${mainIndex}-${index}-sidebar`}
                className={`flex flex-row flex-wrap ${colours[categoryType]} text-white px-2 py-1 my-2 text-sm cursor-pointer border border-gray-300`}
                draggable
                onDragStart={(event) =>
                  handleDragStart(event, {
                    category: categoryType,
                    subCategory: index,
                  })
                }
                onDragEnd={handleDragEnd}
                onClick={() =>
                  handleFunctionality([
                    {
                      category: categoryType,
                      subCategory: index,
                    },
                  ])
                }
              >
                {type.inner}
              </div>
            );
          });
          return (
            <>
              {blocksHeader}
              {blocks}
            </>
          );
        })}
      </div>
    </div>
  );
}
