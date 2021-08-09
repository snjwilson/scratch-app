import React from "react";
import categories from "../categories";
import colours from "../colours";

export default function MidArea({
  dragged,
  handleDragStart,
  codeBlocks,
  setCodeBlocks,
  currentSprite,
}) {
  // handle drop over mid area
  function handleDrop(event) {
    event.preventDefault();
    if (!dragged.current.draggedFromSideBar) {
      const mainIndex = dragged.current.element.parentNode.id.split("-")[3];
      const subIndex = dragged.current.element.id.split("-")[3];
      console.log(`Not dragged from side - ${mainIndex} -${subIndex}`);
      const newCodeBlocks = [...codeBlocks];
      const temp = newCodeBlocks[mainIndex].slice(subIndex);
      temp[0].position = {
        top: event.clientY - dragged.current.innerClickY,
        left: event.clientX - dragged.current.innerClickX,
      };
      newCodeBlocks[mainIndex] = newCodeBlocks[mainIndex].slice(0, subIndex);
      newCodeBlocks.push(temp);
      setCodeBlocks(newCodeBlocks);
    } else if (event.target.id === "main") {
      setCodeBlocks([
        ...codeBlocks,
        [
          {
            category: dragged.current.data.category,
            subCategory: dragged.current.data.subCategory,
            position: {
              top: event.clientY - dragged.current.innerClickY,
              left: event.clientX - dragged.current.innerClickX,
            },
            valid: true,
            sprite: currentSprite.name,
          },
        ],
      ]);
    }
  }

  // handle drag over mid area
  function handleDragOver(event) {
    event.preventDefault();
  }

  // handle drag enter
  function handleDragEnter(event) {
    if (event.target.id.match(/main-inner-block/)) {
      const targetDimensions = event.target.getBoundingClientRect();
      const appendAt = targetDimensions.top <= event.clientY ? "bottom" : "top";
      const parent = event.target.parentNode;
      const mainIndex = parent.id.split("-")[3];
      const subIndex = parseInt(event.target.id.split("-")[3]);
      // console.log(`Going to append in block set - ${mainIndex}`);
      const sliceTillIndex = appendAt === "top" ? subIndex : subIndex + 1;
      const newCodeBlocks = [...codeBlocks];
      newCodeBlocks[mainIndex] = [
        ...newCodeBlocks[mainIndex].slice(0, sliceTillIndex),
        {
          category: dragged.current.data.category,
          subCategory: dragged.current.data.subCategory,
          position: {
            top: event.clientY - dragged.current.innerClickY,
            left: event.clientX - dragged.current.innerClickX,
          },
          valid: false,
          sprite: currentSprite.name,
        },
        ...newCodeBlocks[mainIndex].slice(sliceTillIndex),
      ];

      setCodeBlocks(newCodeBlocks);
    }
  }

  function handleDragLeave(event) {
    const filtered = codeBlocks.map((blocks) => {
      return blocks.filter((block) => block.valid);
    });
    setCodeBlocks(filtered);
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
            onDragLeave={handleDragLeave}
          >
            {blocks.map((block, index) => {
              if (block.sprite === currentSprite.name) {
                return (
                  <div
                    key={`${mainIndex}-${index}-main`}
                    id={`main-inner-block-${index}`}
                    data-category={block.category}
                    data-subcategory={block.subCategory}
                    className={`flex flex-row flex-wrap text-white px-2 py-1 text-sm cursor-pointer main-inner-block w-max border border-gray-300 ${
                      colours[block.category]
                    }`}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, {
                        category: block.category,
                        subCategory: block.subCategory,
                      })
                    }
                    onDragEnter={block.valid ? handleDragEnter : null}
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
