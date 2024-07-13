import React from "react";
import { down, left, right, setCellActive, up } from "../keyevents/AllEvents";
import { setClass, softsheetStyle } from "../utils/ease";
import { trackBlurablity } from "../handle/Blur";
import { buildSerialNo } from "./buildSerialNo";

export function buildRows({
  RowNumber,
  ROW,
  tableId,
  reflect,
  TABLE_DATA,
  header,
  type,
  TD_REF,
  serial_no = true,
  rowProps,
}: any) {
  let refSetter = (
    el: any,
    listener: any = null,
    thisCell: { row: number; col: number; tableId: number }
  ) => {
    if (el && !TD_REF.current.includes(el as never)) {
      el.addEventListener("keydown", (e: any) => trackBlurablity(e, tableId));
      el.addEventListener("click", () => {
        setCellActive(thisCell);
      });

      if (listener) el.addEventListener("customEvent", listener);

      // @ts-ignore
      TD_REF.current.push(el);
    }
  };

  return (
    <>
      <tr
        {...rowProps}
        className={setClass(
          softsheetStyle(type == "filter" && "filter"),
          rowProps?.className
        )}
      >
        {/* {serial_no && (
          <>
            <td className={setClass(softsheetStyle("softsheet_main-count-no"))}>
              {RowNumber + 1}
            </td>
          </>
        )} */}

        {
          <>
            {buildSerialNo({
              serial_no_data: serial_no ?? {},
              type: "row",
              header,
              value: RowNumber + 1,
              row: ROW,
              index: RowNumber,
            })}
            {/* <th scope="col" className="">
              #
            </th> */}
          </>
        }
        {Object.keys(header).map((e: any, i: number) => {
          let TD_INDEX = i + RowNumber * Object.keys(header).length;

          const REFLECT_PROPS = {
            index: RowNumber,
            col: ROW[e],
            row: ROW,
            row_no: RowNumber + 1,
            col_name: e,
            keyboard: {
              navigation: {
                up: () => up(tableId),
                down: () => down(tableId),
                left: () => left(tableId),
                right: () => right(tableId),
              },
              cursor: {
                setActive: (props: { row?: number; col?: number }) =>
                  setCellActive({ ...props, tableId }),
              },
            },
          };

          let IS_REFLECT_AVAILABLE =
            reflect && (reflect ?? {})[e] ? true : false;

          let REFLECT_FUNCTION = IS_REFLECT_AVAILABLE
            ? (reflect ?? {})[e](REFLECT_PROPS)
            : ROW[e];

          const IS_REFLECT_REACT = IS_REFLECT_AVAILABLE
            ? React.isValidElement(REFLECT_FUNCTION)
            : false;

          const IS_REFLECT_VIEW_PROVIDED = (attr: string) =>
            IS_REFLECT_AVAILABLE &&
            !IS_REFLECT_REACT &&
            (REFLECT_FUNCTION[attr] ?? false);

          // const REFLECT =
          //   reflect && (reflect ?? {})[e] // CHECK IF REFLECT AVAILABLE & REFLECT IS EXECUTABLE
          //     ? (reflect[e](REFLECT_PROPS) as ReflectProps)?.view
          //     : ROW[e];\

          let CURRENT_CELL_CLASS =
            RowNumber == TABLE_DATA.activeCells.row &&
            i == TABLE_DATA.activeCells.col
              ? `softsheet-active_cell softsheet-active_cell_anim-${TABLE_DATA?.prevActiveCells?.type ?? ""}`
              : "";
          return (
            <>
              <td
                ref={(e: any) =>
                  refSetter(
                    e,
                    IS_REFLECT_VIEW_PROVIDED("listener")
                      ? REFLECT_FUNCTION?.listener
                      : null,
                    { row: RowNumber, col: i, tableId }
                  )
                }
                className={setClass(
                  softsheetStyle(CURRENT_CELL_CLASS),
                  CURRENT_CELL_CLASS,
                  // IF CELL CLASS PROVIDED BY USER
                  IS_REFLECT_VIEW_PROVIDED("cellClass")
                    ? REFLECT_FUNCTION?.cellClass
                    : ""
                )}
                // IF CELL STYLE PROVIDED BY USER

                {...(IS_REFLECT_VIEW_PROVIDED("cellStyle")
                  ? { style: REFLECT_FUNCTION?.cellStyle }
                  : {})}
                autoFocus={
                  RowNumber == TABLE_DATA.activeCells.row &&
                  i == TABLE_DATA.activeCells.col
                }
                tabIndex={TD_INDEX}
              >
                {
                  // IF REFLECT IS APPLICABLE
                  IS_REFLECT_AVAILABLE && !IS_REFLECT_REACT
                    ? REFLECT_FUNCTION?.view ?? ROW[e]
                    : REFLECT_FUNCTION
                }
              </td>
            </>
          );
        })}
      </tr>
    </>
  );
}
