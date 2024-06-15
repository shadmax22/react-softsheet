import { TABLE_DATA, TABLE_STATE } from "../utils/states";

export function DispatchEvent(td_ref: any, key: any, tableId: number) {
  let __TABLE_STATE = TABLE_STATE({ tableId });

  let data: TABLE_DATA = __TABLE_STATE?.get();

  let CurrentCell = td_ref.current[
    data.activeCells.col + data.activeCells.row * data.maxColumnLength
  ] as any;

  const event = new CustomEvent("customEvent", {
    detail: {
      keypressed: key,
    },
    cancelable: true,
  });

  const dispatchEventStat = CurrentCell.dispatchEvent(event);

  return dispatchEventStat;
}
