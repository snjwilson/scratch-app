import React, { useEffect, useState } from "react";
import categories from "../categories";
import colours from "../colours";

export default function MidArea({
  dragged,
  handleDragStart,
  codeBlocks,
  setCodeBlocks,
  selectedSprites,
  setSelectedSprites,
}) {
  const currentSprite = selectedSprites.find((sprite) => sprite.currentSprite);
  const [draggingOverBlocks, setDraggingOverBlocks] = useState(false);
  const [appendAtIndex, setAppendAtIndex] = useState(null);
  // handle drop over mid area
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (dragged.current.draggedFromSideBar && e.target.id === "main") {
      // CASE 1
      // dropped from side bar onto empty mid area
      console.log(`Dropped from side bar onto empty mid area`);
      setCodeBlocks([
        ...codeBlocks,
        [
          {
            category: dragged.current.data.category,
            subCategory: dragged.current.data.subCategory,
            position: {
              top: e.clientY - dragged.current.innerClickY,
              left: e.clientX - dragged.current.innerClickX,
            },
            valid: true,
            sprite: currentSprite.name,
          },
        ],
      ]);
    } else if (
      dragged.current.draggedFromSideBar &&
      e.target.id.match(/main-inner/)
    ) {
      // CASE 2
      // dropped from side onto another set of blocks
      console.log(`Dropped from side onto ${e.target.id}`);
      const innerBlock = document.getElementById(e.target.id);
      let newCodeBlocks = [...codeBlocks].map((blocks) =>
        blocks.map((block) => {
          block.valid = true;
          return block;
        })
      );
      setCodeBlocks(newCodeBlocks);
    } else if (!dragged.current.draggedFromSideBar && e.target.id === "main") {
      // CASE 3
      // dropped from inside main to another new empty mid area
      console.log(`Dropped from inside main to another new empty area`);
      const mainIndex = dragged.current.element.parentNode.id.split("-")[3];
      const subIndex = dragged.current.element.id.split("-")[3];
      console.log(`Not dragged from side - ${mainIndex} -${subIndex}`);
      const newCodeBlocks = [...codeBlocks];
      const temp = newCodeBlocks[mainIndex].slice(subIndex);
      temp[0].position = {
        top: e.clientY - dragged.current.innerClickY,
        left: e.clientX - dragged.current.innerClickX,
      };
      newCodeBlocks[mainIndex] = newCodeBlocks[mainIndex]
        .slice(0, subIndex)
        .filter((block) => block.valid);
      newCodeBlocks.push(temp);
      setCodeBlocks(newCodeBlocks);
    } else if (
      !dragged.current.draggedFromSideBar &&
      e.target.id.match(/main-inner/)
    ) {
      // CASE 4
      // dropped from inside main to another set of blocks
      console.log(`Dropped from inside main to another set of blocks`);
      const mainIndex = parseInt(
        dragged.current.element.parentNode.id.split("-")[3]
      );
      const subIndex = dragged.current.element.id.split("-")[3];
      const { mainIndex: targetMainIndex, subIndex: appendIndex } =
        appendAtIndex;
      if (mainIndex === targetMainIndex) {
        // moving inside blocks itself
        let newCodeBlocks = [...codeBlocks].map((blocks) =>
          blocks.filter((block) => block.valid)
        );
        const temp = newCodeBlocks[targetMainIndex].slice(subIndex);
        temp[0].position = {
          top: e.clientY - dragged.current.innerClickY,
          left: e.clientX - dragged.current.innerClickX,
        };
        console.log(temp);
        newCodeBlocks[mainIndex] = newCodeBlocks[mainIndex].slice(0, subIndex);
        newCodeBlocks[targetMainIndex] = [
          ...newCodeBlocks[targetMainIndex].slice(0, appendIndex),
          ...temp,
          ...newCodeBlocks[targetMainIndex].slice(appendIndex),
        ];
        newCodeBlocks = newCodeBlocks.filter((blocks) => blocks.length > 0);
        setCodeBlocks(newCodeBlocks);
      } else {
        // moving from one set of blocks to new set of blocks
        let newCodeBlocks = [...codeBlocks];
        const temp = newCodeBlocks[mainIndex].slice(subIndex);
        temp[0].position = {
          top: e.clientY - dragged.current.innerClickY,
          left: e.clientX - dragged.current.innerClickX,
        };
        newCodeBlocks[mainIndex] = newCodeBlocks[mainIndex].slice(0, subIndex);
        newCodeBlocks[targetMainIndex] = [
          ...newCodeBlocks[targetMainIndex].slice(0, appendIndex),
          ...temp,
          ...newCodeBlocks[targetMainIndex].slice(appendIndex + 1),
        ];
        newCodeBlocks = newCodeBlocks.filter((blocks) => blocks.length > 0);
        setCodeBlocks(newCodeBlocks);
      }
    }
  }

  // handle drag enter into a set of blocks
  function handleDragEnter(e) {
    e.preventDefault();
    if (e.currentTarget.id) {
      // find the main outer block
      console.log(`Drag enter ${e.currentTarget.id}`);
      const outerBlock = document.getElementById(e.currentTarget.id);
      setDraggingOverBlocks(true);
    }
  }

  function handleMouseMove(e) {
    // find the inner block index
    const { clientX: x, clientY: y } = e;
    const innerBlock = e.target;
    const innerBlockIndex = parseInt(e.target.id.split("-")[3]);
    const outerBlockIndex = parseInt(e.currentTarget.id.split("-")[3]);
    const innerBlockDimensions = innerBlock.getBoundingClientRect();
    const mid = parseInt(
      (innerBlockDimensions.top + innerBlockDimensions.bottom) / 2
    );
    // find if below or above
    const appendPosition = y <= mid ? innerBlockIndex : innerBlockIndex + 1;
    setAppendAtIndex({
      mainIndex: outerBlockIndex,
      subIndex: appendPosition,
    });
    // reorder the blocks
    reorder(outerBlockIndex, appendPosition);
  }

  function handleDragEnd(e) {
    console.log(`Drag ended`);
    const filtered = codeBlocks
      .map((blocks) => {
        return blocks.filter((block) => block.valid);
      })
      .filter((blocks) => blocks.length > 0);
    setCodeBlocks(filtered);
  }

  // handle drag over mid area
  function handleDragOver(event) {
    event.preventDefault();
  }

  // reorder blocks to show the position of dummy div
  function reorder(outerBlockIndex, appendPosition) {
    const previousPosition = codeBlocks[outerBlockIndex][0].position;
    let newCodeBlocks = [...codeBlocks].map((blocks) => {
      return blocks.filter((block) => block.valid);
    });
    newCodeBlocks[outerBlockIndex] = [
      ...newCodeBlocks[outerBlockIndex].slice(0, appendPosition),
      {
        category: dragged.current.data.category,
        subCategory: dragged.current.data.subCategory,
        position: {
          top: 0,
          left: 0,
        },
        valid: false,
        sprite: currentSprite.name,
      },
      ...newCodeBlocks[outerBlockIndex].slice(appendPosition),
    ];
    newCodeBlocks.filter((blocks) => blocks.length > 0);
    newCodeBlocks[outerBlockIndex][0].position = previousPosition;
    setCodeBlocks(newCodeBlocks);
  }

  // handle drag leave from a set of blocks
  function handleDragLeave(event) {
    setDraggingOverBlocks(false);
    if (draggingOverBlocks) {
      console.log(`drag leave fired ${event.target.id}`);
      const filtered = codeBlocks.map((blocks) => {
        return blocks.filter((block) => block.valid);
      });
      setCodeBlocks(filtered);
    }
  }

  function handleFunctionality(blocks) {
    let {
      x: translateX,
      y: translateY,
      rotate: rotateDeg,
      name,
    } = currentSprite;
    const sprite = document.getElementById(name);
    console.log(sprite.style.transform);
    // let transformString = sprite.style.transform;
    let transformString = "";
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
          // transformString = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateDeg}deg)`;
        } else if (y && !x) {
          translateY += y;
          transformString = /translateY\([0-9]+px\)/.test(transformString)
            ? transformString.replace(
                /translateY\([0-9]+px\)/,
                `translateY(${translateY}px)`
              )
            : transformString + `translateY(${translateY}px) `;
          // transformString = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotateDeg}deg)`;
        } else if (rotate) {
          rotateDeg += rotate;
          transformString = /rotate\(-{0,1}[0-9]+deg\)/.test(transformString)
            ? transformString.replace(
                /rotate\(-{0,1}[0-9]+deg\)/,
                `rotate(${rotateDeg}deg)`
              )
            : transformString + `rotate(${rotateDeg}deg) `;
          // transformString = `rotate(${rotateDeg}deg) translateX(${translateX}px) translateY(${translateY}px)`;
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
          // transformString = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateDeg}deg)`;
        }
        console.log(transformString);
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
      id="main"
      className="flex-1 h-full overflow-auto drop"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {codeBlocks.map((blocks, mainIndex) => {
        return blocks.length > 0 ? (
          <div
            id={`main-outer-block-${mainIndex}`}
            className="flex flex-col absolute main-outer-block"
            style={{
              top: blocks.find((block) => block.valid === true).position.top,
              left: blocks.find((block) => block.valid === true).position.left,
            }}
            onDragEnter={handleDragEnter}
            onDragOver={handleMouseMove}
            onDragLeave={handleDragLeave}
            onClick={() => handleFunctionality(blocks)}
          >
            {blocks.map((block, index) => {
              if (block.sprite === currentSprite.name) {
                return (
                  <div
                    key={`${mainIndex}-${index}-main`}
                    id={`main-inner-block-${index}`}
                    className={`flex flex-row flex-wrap px-2 py-1 text-sm cursor-pointer main-inner-block w-max border border-gray-300 ${
                      !block.valid
                        ? `bg-gray-300 text-gray-300`
                        : `${colours[block.category]} text-white`
                    }`}
                    draggable
                    onDragEnd={handleDragEnd}
                    onDragStart={(event) =>
                      handleDragStart(event, {
                        category: block.category,
                        subCategory: block.subCategory,
                      })
                    }
                  >
                    {categories[block.category][block.subCategory].inner}
                  </div>
                );
              }
            })}
          </div>
        ) : null;
      })}
    </div>
  );
}
