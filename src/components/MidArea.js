import React from "react";

export default function MidArea({ dragged, handleDragStart }) {
  function handleDrop(event) {
    event.preventDefault();
    if (dragged.current.draggedFromSideBar) {
      // APPEND NEW BLOCK
      console.log(`dropped in mid drop zone from side bar`);
      const clone = dragged.current.element.cloneNode(true);
      const translateX = `${event.clientX - dragged.current.innerClickX}px`;
      const translateY = `${event.clientY - dragged.current.innerClickY}px`;
      clone.style.top = translateY;
      clone.style.left = translateX;
      clone.classList.add("w-max", "absolute");
      event.target.appendChild(clone);
    } else {
      // ONLY MOVE THE BLOCK
      console.log(`Moved within main`);
      const translateX = `${event.clientX - dragged.current.innerClickX}px`;
      const translateY = `${event.clientY - dragged.current.innerClickY}px`;
      dragged.current.element.style.top = translateY;
      dragged.current.element.style.left = translateX;
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div
      id="main"
      className="flex-1 h-full overflow-auto drop"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    ></div>
  );
}
