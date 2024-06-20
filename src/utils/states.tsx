import { getThis, useThis } from "react-usethis";
import { ts_Table } from "../Table";

export interface TABLE_DATA {
  activeCells: {
    row: number;
    col: number;
  };
  readOnly: never[];
  maxColumnLength: number;
  maxRowLength: number;
  keyboard_events: boolean;
  data: ts_Table;
  prevActiveCells?: {
    row: number;
    col: number;
    type: string;
  };
}

export const TABLE_STATE = (data: { initialLoad?: any; tableId: number }) =>
  useThis(
    "table_state_" + data?.tableId,
    data?.initialLoad
      ? {
          activeCells: {
            row: 0,
            col: 0,
          },
          readOnly: [],
          maxRowLength: null,
          maxColumnLength: null,
          keyboard_events: true,
          data: {},
          ...data?.initialLoad,
        }
      : null
  );
export const STATIC_TABLE_STATE = (data: { tableId: number }) =>
  getThis("table_state_" + data?.tableId);
