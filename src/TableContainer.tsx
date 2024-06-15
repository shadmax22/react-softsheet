import React, { useEffect, useRef, useState } from "react";
import { __KEYDOWN_HANDLER } from "./handle/Keydown";
import { __BLUR_HANDLER, trackBlurablity } from "./handle/Blur";
import { __FOCUS_HANDLER } from "./handle/Focus";
import { TABLE_DATA, TABLE_STATE } from "./utils/states";
import { ts_Table } from "./Table";
import { setClass } from "./utils/ease";

import "./style/SoftSheet.css";
import { down, left, right, setCellActive, up } from "./keyevents/AllEvents";
import { set } from "js-upsert";

import { SelectFilter } from "./components/Filters/Select";

export function TableContainer(props: ts_Table) {
  let [tableId, setTableId] = useState(0);

  useEffect(() => {
    //@ts-ignore
    setTableId(Math.ceil(Math.random() * 100000));
  }, []);

  let Ref = useRef<HTMLTableElement>(null);
  let TD_REF = useRef([]);

  let { header, data, reflect } = props;

  if (!data || !header) return <></>;

  let __TABLE_STATE = TABLE_STATE({
    initialLoad: {
      maxRowLength: data.length,
      maxColumnLength: Object.keys(header).length,
    },
    tableId,
  });

  let TABLE_DATA: TABLE_DATA = __TABLE_STATE.get();

  const handleFocus = __FOCUS_HANDLER({
    td_ref: TD_REF,
    table_ref: Ref,
    tableId,
  });

  const handleKeyDown = __KEYDOWN_HANDLER(TD_REF, tableId);

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

  useEffect(() => {
    __TABLE_STATE.upsert({
      maxRowLength: set(data.length),
    });
  }, [data.length]);
  useEffect(() => {
    __TABLE_STATE.upsert({
      maxColumnLength: set(Object.keys(header).length),
    });
  }, [Object.keys(header).length]);

  useEffect(() => {
    handleFocus();
  }, [TABLE_DATA.activeCells.row, TABLE_DATA.activeCells.col]);

  useEffect(() => {
    if (Ref.current) {
      handleFocus();
    }
  }, []);
  if (!tableId) return <></>;
  return (
    <>
      <div
        className={setClass(
          "softsheet-main_container",
          `softsheet-template-${props?.template ?? "lightTemplate"}`
        )}
        onKeyDown={handleKeyDown}
        // onBlur={handleBlur}
        ref={Ref}
        tabIndex={-1}
      >
        <table className="softsheet-main_table">
          <thead className="">
            <tr>
              <th scope="col" className="">
                #
              </th>
              {Object.keys(header).map((e: any) => {
                return (
                  <>
                    <th scope="col" className="">
                      {header[e]}
                    </th>
                  </>
                );
              })}
            </tr>

            {/* <tr className="filter">
              <td></td>
              <td>
                <SelectFilter></SelectFilter>
              </td>
              <td>
                <SelectFilter></SelectFilter>
              </td>
            </tr> */}
          </thead>
          <tbody>
            {data?.length == 0 && (
              <tr>
                <td colSpan={Object.keys(header ?? {}).length + 1}>
                  <div className="flex items-center  justify-center">
                    NOTHING TO SHOW
                  </div>
                </td>
              </tr>
            )}
            {(data ?? []).map((ROW: any, RowNumber: number) => {
              return (
                <>
                  <tr>
                    <td className="softsheet_main-count-no">{RowNumber + 1}</td>
                    {Object.keys(header).map((e: any, i: number) => {
                      let TD_INDEX = i + RowNumber * Object.keys(header).length;

                      const REFLECT_PROPS = {
                        index: RowNumber,
                        col: ROW[e],
                        row: ROW,
                        row_no: RowNumber + 1,
                        keyboard: {
                          navigation: {
                            up: () => up(tableId),
                            down: () => down(tableId),
                            left: () => left(tableId),
                            right: () => right(tableId),
                          },
                          cursor: {
                            setActive: (props: {
                              row?: number;
                              col?: number;
                            }) => setCellActive({ ...props, tableId }),
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
                              RowNumber == TABLE_DATA.activeCells.row &&
                                i == TABLE_DATA.activeCells.col
                                ? `softsheet-active_cell softsheet-active_cell_anim-${TABLE_DATA?.prevActiveCells?.type ?? ""}`
                                : "",
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
                                ? REFLECT_FUNCTION?.view
                                : REFLECT_FUNCTION
                            }
                          </td>
                        </>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
