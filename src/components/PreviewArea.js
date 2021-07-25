import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea() {
  return (
    <div className="flex-none h-1/2 bg-white overflow-y-auto p-2 border-b rounded-bl-xl">
      <CatSprite />
    </div>
  );
}
