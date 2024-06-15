import React from "react";
import { TABLE_STATE } from "../utils/states";
import { down, keyEnabled, left, right, up } from "../keyevents/AllEvents";
import { DispatchEvent } from "./DispatchEvent";

export function __KEYDOWN_HANDLER(ref: any, tableId: number) {
  let __TABLE_STATE = TABLE_STATE({ tableId });

  let { maxColumnLength, maxRowLength } = __TABLE_STATE?.get();

  if (maxColumnLength != 0) maxColumnLength -= 1;
  if (maxRowLength != 0) maxRowLength -= 1;
  return (event: React.KeyboardEvent) => {
    let dispatchEvent_req = DispatchEvent(ref, event?.key, tableId);

    if (!dispatchEvent_req) {
      return false;
    }

    switch (event.key) {
      case "ArrowLeft":
        left(tableId);
        break;
      case "ArrowRight":
        right(tableId);
        break;
      case "ArrowDown":
        down(tableId);
        break;
      case "ArrowUp":
        up(tableId);
        break;

      case "Escape":
        keyEnabled(false, tableId);
        break;
      case "Enter":
        right(tableId);
        // keyEnabled((v: any) => (v ? !v : v));

        break;
    }
  };
}
