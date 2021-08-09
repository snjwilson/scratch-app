import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import SpritesArea from "./components/SpritesArea";
import allSprites from "./components/allSprites";
import Modal from "./components/Modal";
import "./App.css";

export default function App() {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [category, setCategory] = useState("motion");
  const [showModal, setShowModal] = useState(false);
  const [selectedSprites, setSelectedSprites] = useState([allSprites[0]]);
  const [currentSprite, setCurrentSprite] = useState(allSprites[0]);
  const dragged = useRef(null);

  // handle drag start of all draggable elements
  function handleDragStart(event, data) {
    let draggedFromSideBar = true;
    if (event.target.parentNode.id.match(/main-outer/)) {
      draggedFromSideBar = false;
    }
    // reference to dragged element
    dragged.current = {
      element: event.target,
      data,
      innerClickX: event.clientX - event.target.getBoundingClientRect().x,
      innerClickY: event.clientY - event.target.getBoundingClientRect().y,
      draggedFromSideBar,
    };
    event.dataTransfer.effectAllowed = "move";
  }

  useEffect(() => {
    const elementToBeScrolled = document.getElementById("all-blocks");
    if (category === "motion") {
      elementToBeScrolled.scroll(0, 0);
    } else if (category === "looks") {
      elementToBeScrolled.scroll(0, 220);
    } else if (category === "control") {
      elementToBeScrolled.scroll(0, 500);
    } else if (category === "events") {
      elementToBeScrolled.scroll(0, 500);
    }
  }, [category]);

  return (
    <>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          selectedSprites={selectedSprites}
          setSelectedSprites={setSelectedSprites}
        />
      ) : null}
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row  ">
          <div className="flex-1 h-full overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar
              category={category}
              setCategory={setCategory}
              dragged={dragged}
              handleDragStart={handleDragStart}
              codeBlocks={codeBlocks}
              setCodeBlocks={setCodeBlocks}
            />{" "}
            <MidArea
              dragged={dragged}
              handleDragStart={handleDragStart}
              codeBlocks={codeBlocks}
              setCodeBlocks={setCodeBlocks}
              currentSprite={currentSprite}
            />
          </div>
          <div className="w-1/3 h-full overflow-hidden flex flex-col border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
            <SpritesArea
              setShowModal={setShowModal}
              selectedSprites={selectedSprites}
              currentSprite={currentSprite}
              setCurrentSprite={setCurrentSprite}
            />
          </div>
        </div>
      </div>
    </>
  );
}
