import { set } from "js-upsert";
import { STATIC_TABLE_STATE, TABLE_DATA } from "../utils/states";

export function __FOCUS_HANDLER({
  td_ref,
  table_ref,
  tableId,
}: {
  td_ref: any;
  table_ref: any;
  tableId: number;
}) {
  return () => {
    let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });
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

    if (CurrentCell) {
      let FOCUSABLE_ELEMENT = CurrentCell.querySelector("input, button");

      if (FOCUSABLE_ELEMENT) {
        // FOCUSABLE_ELEMENT.focus();
        // if (FOCUSABLE_ELEMENT?.tagName == "INPUT") {
        //   let length = FOCUSABLE_ELEMENT.value.length;
        //   FOCUSABLE_ELEMENT.setSelectionRange(length, length);
        // }
        // const BLUR_APPLIER = (w: any) => {
        //   console.log(w.target.value);
        // };
        // DISABLE KEYBOARD EVENT AND FOCUS IN ELEMENT
        // if (FOCUSABLE_ELEMENT.value != "") {
        //   __TABLE_STATE.upsert(set(false, "keyboard_events"));
        //   // table_ref.current.focus();
        // }
      }
    }
  };
}

export function setFocus(ref: any, tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  let data: TABLE_DATA = __TABLE_STATE?.get();

  let CurrentCell = ref.current[
    data.activeCells.col + data.activeCells.row * data.maxColumnLength
  ] as any;

  if (!data.keyboard_events) {
    __TABLE_STATE.upsert(set(true, "keyboard_events"));

    return true;
  }
  if (CurrentCell) {
    let FOCUSABLE_ELEMENT = CurrentCell.querySelector("input, button");

    if (FOCUSABLE_ELEMENT) {
      FOCUSABLE_ELEMENT.focus();

      // if (FOCUSABLE_ELEMENT?.tagName == "INPUT") {
      //   let length = FOCUSABLE_ELEMENT.value.length;
      //   FOCUSABLE_ELEMENT.setSelectionRange(length, length);
      // }
      // const BLUR_APPLIER = (w: any) => {
      //   console.log(w.target.value);
      // };

      // DISABLE KEYBOARD EVENT AND FOCUS IN ELEMENT

      if (FOCUSABLE_ELEMENT.value != "") {
        __TABLE_STATE.upsert(set(false, "keyboard_events"));
        // table_ref.current.focus();
      }
      return false;
    }
  }

  return true;
  // if (data?.prevActiveCells) {
  //   let PrevCell = ref.current[
  //     data?.prevActiveCells?.col +
  //       data?.prevActiveCells?.row * data.maxColumnLength
  //   ] as any;

  //   if (PrevCell) {
  //     let BLURABLE_ELEMENT = PrevCell.querySelector("input, button");
  //     if (BLURABLE_ELEMENT) {
  //       __TABLE_STATE.upsert(set(true, "keyboard_events"));
  //     }
  //   }
  // }
}
