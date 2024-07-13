import { set } from "js-upsert";
import { STATIC_TABLE_STATE } from "../utils/states";

export function __BLUR_HANDLER(tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });
  return () => {
    __TABLE_STATE.upsert(set(false, "keyboard_events"));
  };
}

export function trackBlurablity(e: any, tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  if (e.key == "Escape") {
    e.target.blur();
    e.target.closest(".softsheet-main_container").focus();
    __TABLE_STATE.upsert(set(true, "keyboard_events"));
    return;
  }

  console.log(e.target.selectionStart, e.target);
  if (e.target.selectionStart > 0 || e.target.value != "") {
    if (__TABLE_STATE?.get()?.keyboard_events) {
      __TABLE_STATE.upsert(set(false, "keyboard_events"));
    }
  } else {
    if (!__TABLE_STATE?.get()?.keyboard_events)
      __TABLE_STATE.upsert(set(true, "keyboard_events"));
  }
}
