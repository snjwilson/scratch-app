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
  function handleDrop(event) {
    event.preventDefault();
    if (!dragged.current.draggedFromSideBar) {
      dragged.current.element.remove();
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnd(event) {
    event.preventDefault();
    console.log(`Drag ended`);
    const newCodeBlocks = [...codeBlocks];
    newCodeBlocks.map((blocks) => {
      return blocks.map((block) => {
        block.valid = true;
        return block;
      });
    });

    setCodeBlocks(newCodeBlocks);
  }

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
                className={`flex flex-row flex-wrap ${colours[categoryType]} text-white px-2 py-1 my-2 text-sm cursor-pointer`}
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
        {/* <div className="font-bold"> {"Motion"} </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Move 10 steps"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Move 20 steps"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Move 30 steps"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"30 degrees"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"30 degrees"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Go to random position"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"If on edge bounce"}
        </div>
        <div className="font-bold"> {"Looks"} </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Say Hello World"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Say Foo"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Say Bye"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Change size by 10"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Think hmmm... for 2 seconds"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Show"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Hide"}
        </div>
        <div className="font-bold"> {"Control"} </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Wait 1 second"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"wait 5 seconds"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Stop all"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"When I start as a clone"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"Create clone of myself"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"delete this clone"}
        </div>
        <div className="font-bold"> {"Events"} </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-300 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-300 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"When this sprite clicked"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-300 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"When space key pressed"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-yellow-300 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          draggable
          onDragStart={handleDragStart}
        >
          {"broadcast message1 and wait"}
        </div> */}
      </div>
    </div>
  );
}
