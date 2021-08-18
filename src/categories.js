import React from "react";
import Icon from "./components/Icon";

export default {
  // MOTION CATEGORY
  motion: [
    {
      inner: "Move 10 steps",
      functionality: { x: 10 },
    },
    {
      inner: "Move 20 steps",
      functionality: { x: 20 },
    },
    {
      inner: "Move 30 steps",
      functionality: { x: 30 },
    },
    {
      inner: (
        <>
          {" "}
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </>
      ),
      functionality: { rotate: -15 },
    },
    {
      inner: (
        <>
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </>
      ),
      functionality: { rotate: 15 },
    },
    {
      inner: (
        <>
          {" "}
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"30 degrees"}
        </>
      ),
      functionality: { rotate: -30 },
    },
    {
      inner: (
        <>
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"30 degrees"}
        </>
      ),
      functionality: { rotate: 30 },
    },
    {
      inner: "Go to random Position",
      functionality: {
        x: 1,
        y: 1,
      },
    },
  ],
  // LOOKS CATEGORY
  looks: [
    {
      inner: <>{"Say Hello World"}</>,
      functionality: null,
    },
    {
      inner: <>{"Say Foo"}</>,
      functionality: null,
    },
    {
      inner: <>{"Say bye"}</>,
      functionality: null,
    },
    {
      inner: <>{"Change size by 10"}</>,
      functionality: null,
    },
    {
      inner: <>{"Think hmmm... for 2 seconds"}</>,
      functionality: null,
    },
    {
      inner: <>{"Show"}</>,
      functionality: null,
    },
    {
      inner: <>{"Hide"}</>,
      functionality: null,
    },
  ],
  // CONTROL CATEGORY
  control: [
    {
      inner: <>{"Wait 1 second"}</>,
      functionality: null,
    },
    {
      inner: <>{"Wait 5 second"}</>,
      functionality: null,
    },
    {
      inner: <>{"Stop all"}</>,
      functionality: null,
    },
    {
      inner: <>{"When I start as a clone"}</>,
      functionality: null,
    },
    {
      inner: <>{"Create clone of myself"}</>,
      functionality: null,
    },
    {
      inner: <>{"Delete this clone"}</>,
      functionality: null,
    },
  ],
  // EVENTS CATEGORY
  events: [
    {
      inner: (
        <>
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />{" "}
          {"clicked"}
        </>
      ),
      functionality: null,
    },
    {
      inner: "When this sprite clicked",
      functionality: null,
    },
    {
      inner: "When space key pressed",
      functionality: null,
    },
    {
      inner: "Broadcast message1 and wait",
      functionality: null,
    },
  ],
};
