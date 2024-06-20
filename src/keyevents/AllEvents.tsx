import { set } from "js-upsert";
import { TABLE_DATA, STATIC_TABLE_STATE } from "../utils/states";

export interface setCellActive {
  row?: any;
  col?: any;
}
export function setCellActive({
  row,
  col,
  tableId,
}: setCellActive & { tableId: number }) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  let DETERMINE_MODE = (
    row: { prev: number; current: number },
    col: { prev: number; current: number }
  ) => {
    let res;
    const rowCURRENTvPrev = row.current - row.prev;
    const colCURRENTvPrev = col.current - col.prev;

    // If Down/Up
    if (rowCURRENTvPrev != 0) res = rowCURRENTvPrev > 0 ? "down" : "up";

    if (colCURRENTvPrev != 0) res = colCURRENTvPrev > 0 ? "right" : "left";

    return res;
  };
  let newActiveCells = {
    activeCells: {
      ...((row || row === 0) && { row: set(row) }),
      ...((col || col === 0) && { col: set(col) }),
    },
  };

  const __TABLE_STATE_OLD_VALUE = __TABLE_STATE.get().activeCells;

  let determineValue = DETERMINE_MODE(
    {
      prev: __TABLE_STATE_OLD_VALUE.row,
      current:
        typeof row == "function"
          ? row(__TABLE_STATE_OLD_VALUE.row)
          : __TABLE_STATE_OLD_VALUE.row,
    },
    {
      prev: __TABLE_STATE_OLD_VALUE.col,
      current:
        typeof col == "function"
          ? col(__TABLE_STATE_OLD_VALUE.col)
          : __TABLE_STATE_OLD_VALUE.col,
    }
  );
  let n = {
    ...newActiveCells,
    prevActiveCells: {
      row: set(__TABLE_STATE_OLD_VALUE.row),
      col: set(__TABLE_STATE_OLD_VALUE.col),
      type: set(determineValue),
    },
  };

  __TABLE_STATE.upsert(n);
}
export function left(tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  let data: TABLE_DATA = __TABLE_STATE?.get();
  let { maxColumnLength } = data;
  maxColumnLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.col - 1 >= 0) {
    setCellActive({ col: (value: any) => value - 1, tableId });
  }
  if (data.activeCells.col - 1 < 0 && data.activeCells.row - 1 >= 0) {
    setCellActive({
      col: maxColumnLength,
      row: (value: any) => value - 1,
      tableId,
    });
  }
}
export function right(tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  let data: TABLE_DATA = __TABLE_STATE?.get();
  let { maxColumnLength, maxRowLength } = data;
  maxRowLength -= 1;
  maxColumnLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.col + 1 <= maxColumnLength) {
    setCellActive({ col: (value: any) => value + 1, tableId });
  }

  if (
    data.activeCells.col + 1 > maxColumnLength &&
    data.activeCells.row + 1 <= maxRowLength
  ) {
    setCellActive({ col: 0, row: (value: any) => value + 1, tableId });
  }
}

export function down(tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  let data: TABLE_DATA = __TABLE_STATE?.get();

  let { maxRowLength } = data;
  maxRowLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.row + 1 <= maxRowLength) {
    setCellActive({ row: (value: any) => value + 1, tableId });
  }

  if (data.activeCells.row + 1 > maxRowLength) {
    setCellActive({ row: 0, tableId });
  }
}
export function up(tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  let data: TABLE_DATA = __TABLE_STATE?.get();
  let { maxRowLength } = data;

  maxRowLength -= 1;

  if (!data.keyboard_events) return;
  if (data?.activeCells.row - 1 >= 0) {
    setCellActive({ row: (value: any) => value - 1, tableId });
  }

  if (data.activeCells.row - 1 < 0) {
    setCellActive({ row: maxRowLength, tableId });
  }
}

export function keyEnabled(stat: any, tableId: number) {
  let __TABLE_STATE = STATIC_TABLE_STATE({ tableId });

  __TABLE_STATE.upsert(set(stat, "keyboard_events"));
}
