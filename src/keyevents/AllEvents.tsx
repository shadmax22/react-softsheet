import { set } from "js-upsert";
import { TABLE_DATA, TABLE_STATE } from "../utils/states";

export interface setCellActive {
  row?: any;
  col?: any;
}
export function setCellActive({ row, col }: setCellActive) {
  let __TABLE_STATE = TABLE_STATE();

  let n = {
    activeCells: {
      ...((row || row === 0) && { row: set(row) }),
      ...((col || col === 0) && { col: set(col) }),
    },
    prevActiveCells: {
      row: set(__TABLE_STATE.get().activeCells.row),
      col: set(__TABLE_STATE.get().activeCells.col),
    },
  };

  __TABLE_STATE.upsert(n);
}
export function left() {
  let __TABLE_STATE = TABLE_STATE();

  let data: TABLE_DATA = __TABLE_STATE?.get();
  let { maxColumnLength } = data;
  maxColumnLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.col - 1 >= 0) {
    setCellActive({ col: (value: any) => value - 1 });
  }
  if (data.activeCells.col - 1 < 0 && data.activeCells.row - 1 >= 0) {
    setCellActive({ col: maxColumnLength, row: (value: any) => value - 1 });
  }
}
export function right() {
  let __TABLE_STATE = TABLE_STATE();

  let data: TABLE_DATA = __TABLE_STATE?.get();
  let { maxColumnLength, maxRowLength } = data;
  maxRowLength -= 1;
  maxColumnLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.col + 1 <= maxColumnLength) {
    setCellActive({ col: (value: any) => value + 1 });
  }

  if (
    data.activeCells.col + 1 > maxColumnLength &&
    data.activeCells.row + 1 <= maxRowLength
  ) {
    setCellActive({ col: 0, row: (value: any) => value + 1 });
  }
}

export function down() {
  let __TABLE_STATE = TABLE_STATE();

  let data: TABLE_DATA = __TABLE_STATE?.get();

  let { maxRowLength } = data;
  maxRowLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.row + 1 <= maxRowLength) {
    setCellActive({ row: (value: any) => value + 1 });
  }

  if (data.activeCells.row + 1 > maxRowLength) {
    setCellActive({ row: 0 });
  }
}
export function up() {
  let __TABLE_STATE = TABLE_STATE();

  let data: TABLE_DATA = __TABLE_STATE?.get();
  let { maxRowLength } = data;

  maxRowLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.row - 1 >= 0) {
    setCellActive({ row: (value: any) => value - 1 });
  }

  if (data.activeCells.row - 1 < 0) {
    setCellActive({ row: maxRowLength });
  }
}

export function keyEnabled(stat: any) {
  let __TABLE_STATE = TABLE_STATE();

  __TABLE_STATE.upsert(set(stat, "keyboard_events"));
}
