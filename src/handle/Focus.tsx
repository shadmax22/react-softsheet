import { set } from "js-upsert";
import { TABLE_DATA, TABLE_STATE } from "../utils/states";

export function __FOCUS_HANDLER({
  td_ref,
  table_ref,
}: {
  td_ref: any;
  table_ref: any;
}) {
  return () => {
    let __TABLE_STATE = TABLE_STATE();

    let data: TABLE_DATA = __TABLE_STATE?.get();

    let CurrentCell = td_ref.current[
      data.activeCells.col + data.activeCells.row * data.maxColumnLength
    ] as any;
    if (data?.prevActiveCells) {
      let PrevCell = td_ref.current[
        data?.prevActiveCells?.col +
          data?.prevActiveCells?.row * data.maxColumnLength
      ] as any;

      let BLURABLE_ELEMENT = PrevCell.querySelector("input, button");
      if (BLURABLE_ELEMENT) {
        BLURABLE_ELEMENT.blur();
        table_ref.current.focus();
        __TABLE_STATE.upsert(set(true, "keyboard_events"));
      }
    }

    let FOCUSABLE_ELEMENT = CurrentCell.querySelector("input, button");

    if (FOCUSABLE_ELEMENT) {
      FOCUSABLE_ELEMENT.focus();

      // const BLUR_APPLIER = (w: any) => {
      //   console.log(w.target.value);
      // };

      // DISABLE KEYBOARD EVENT AND FOCUS IN ELEMENT

      if (FOCUSABLE_ELEMENT.value != "") {
        __TABLE_STATE.upsert(set(false, "keyboard_events"));
        table_ref.current.focus();
      }
    }
  };
}

export function setFocus(ref: any) {
  let __TABLE_STATE = TABLE_STATE();

  let data: TABLE_DATA = __TABLE_STATE?.get();

  if (data?.prevActiveCells) {
    let PrevCell = ref.current[
      data?.prevActiveCells?.col +
        data?.prevActiveCells?.row * data.maxColumnLength
    ] as any;

    let BLURABLE_ELEMENT = PrevCell.querySelector("input, button");
    if (BLURABLE_ELEMENT) {
      __TABLE_STATE.upsert(set(true, "keyboard_events"));
    }
  }
}
