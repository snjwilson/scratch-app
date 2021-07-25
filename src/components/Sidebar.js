import React from "react";
import Icon from "./Icon";

export default function Sidebar({ category, setCategory }) {
  return (
    <div className="h-full flex flex-row">
      <div className="w-15 overflow-y-auto flex flex-col items-starts border-r border-gray-200">
        <div
          className={`text-center text-xs hover:text-blue-400 cursor-pointer w-full p-1 mb-1 ${
            category === "motion" ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory("motion")}
        >
          <div className="rounded-full bg-blue-500 w-6 h-6 mx-auto"></div>
          <p>Motion</p>
        </div>
        <div
          className={`text-center text-xs hover:text-blue-400 cursor-pointer w-full p-1 my-1 ${
            category === "looks" ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory("looks")}
        >
          <div className="rounded-full bg-purple-500 w-6 h-6 mx-auto"></div>
          <p>Looks</p>
        </div>
        <div
          className={`text-center text-xs hover:text-blue-400 cursor-pointer w-full p-1 my-1 ${
            category === "control" ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory("control")}
        >
          <div className="rounded-full bg-yellow-500 w-6 h-6 mx-auto"></div>
          <p>Control</p>
        </div>
        <div
          className={`text-center text-xs hover:text-blue-400 cursor-pointer w-full p-1 my-1 ${
            category === "events" ? "bg-gray-300" : ""
          }`}
          onClick={() => setCategory("events")}
        >
          <div className="rounded-full bg-yellow-200 w-6 h-6 mx-auto"></div>
          <p>Events</p>
        </div>
      </div>
      <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
        <div className="font-bold"> {"Motion"} </div>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"Move 10 steps"}
        </div>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
        <div className="font-bold"> {"Events"} </div>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </div>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"When this sprite clicked"}
        </div>
      </div>
    </div>
  );
}
