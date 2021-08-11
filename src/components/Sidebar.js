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
}) {
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
