import { set } from "js-upsert";
import { TABLE_STATE } from "../utils/states";

export function __BLUR_HANDLER(tableId: number) {
  let __TABLE_STATE = TABLE_STATE({ tableId });
  return () => {
    __TABLE_STATE.upsert(set(false, "keyboard_events"));
  };
}

export function trackBlurablity(e: any, tableId: number) {
  let __TABLE_STATE = TABLE_STATE({ tableId });

  if (e.target.selectionStart > 0) {
    if (__TABLE_STATE?.get()?.keyboard_events) {
      __TABLE_STATE.upsert(set(false, "keyboard_events"));
    }
  } else {
    if (!__TABLE_STATE?.get()?.keyboard_events)
      __TABLE_STATE.upsert(set(true, "keyboard_events"));
  }
}
