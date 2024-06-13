import React from "react";
import { TABLE_STATE } from "../utils/states";
import { down, keyEnabled, left, right, up } from "../keyevents/AllEvents";
import { DispatchEvent } from "./DispatchEvent";

export function __KEYDOWN_HANDLER(ref: any) {
  let __TABLE_STATE = TABLE_STATE();

  let { maxColumnLength, maxRowLength } = __TABLE_STATE?.get();
  if (maxColumnLength != 0) maxColumnLength -= 1;
  if (maxRowLength != 0) maxRowLength -= 1;
  return (event: React.KeyboardEvent) => {
    let dispatchEvent_req = DispatchEvent(ref, event?.key);

    if (!dispatchEvent_req) {
      return false;
    }

    switch (event.key) {
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "ArrowDown":
        down();
        break;
      case "ArrowUp":
        up();
        break;

      case "Escape":
        keyEnabled(false);
        break;
      case "Enter":
        right();
        // keyEnabled((v: any) => (v ? !v : v));

        break;
    }
  };
}
