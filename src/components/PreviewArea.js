import React from "react";
import CatSprite from "./sprites/CatSprite";

export default function PreviewArea({ selectedSprites }) {
  return (
    <div className="flex-none h-1/2 bg-white overflow-y-auto p-2 border-b rounded-bl-xl">
      {selectedSprites.map((sprite) => sprite.component)}
    </div>
  );
}
