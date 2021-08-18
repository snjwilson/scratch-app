import React from "react";
import CatSprite from "./sprites/CatSprite";
import AppleSprite from "./sprites/AppleSprite";

export default [
  {
    name: "Cat Sprite",
    component: <CatSprite name={"Cat Sprite"} />,
    x: 0,
    y: 0,
    rotate: 0,
    currentSprite: true,
    show: true,
  },
  {
    name: "Apple Sprite",
    component: <AppleSprite name={"Apple Sprite"} />,
    x: 0,
    y: 0,
    rotate: 0,
    currentSprite: false,
    show: true,
  },
];
