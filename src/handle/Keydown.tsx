import React from "react";
import { STATIC_TABLE_STATE } from "../utils/states";
import { down, keyEnabled, left, right, up } from "../keyevents/AllEvents";
import { DispatchEvent } from "./DispatchEvent";
import { setFocus } from "./Focus";

export function __KEYDOWN_HANDLER(ref: any, tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

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
        keyEnabled(true, tableId);
        break;
      case "Enter":
        let is_contunable = setFocus(ref, tableId);

        if (is_contunable) {
          right(tableId);
        }

        // keyEnabled((v: any) => (v ? !v : v));

        break;
    }
  };
}
