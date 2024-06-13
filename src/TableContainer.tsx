import React, { useEffect, useRef } from "react";
import { __KEYDOWN_HANDLER } from "./handle/Keydown";
import { __BLUR_HANDLER, trackBlurablity } from "./handle/Blur";
import { __FOCUS_HANDLER } from "./handle/Focus";
import { TABLE_DATA, TABLE_STATE } from "./utils/states";
import { ReflectFunction, ts_Table } from "./Table";
import { setClass } from "./utils/ease";

import "./style/SoftSheet.css";
import { down, left, right, setCellActive, up } from "./keyevents/AllEvents";
import { set } from "js-upsert";

export function TableContainer(props: ts_Table) {
  let { header, data, reflect } = props;
  let Ref = useRef<HTMLTableElement>(null);
  let TD_REF = useRef([]);

  let __TABLE_STATE = TABLE_STATE({
    initialLoad: {
      maxRowLength: data.length,
      maxColumnLength: Object.keys(header).length,
    },
  });

  let TABLE_DATA: TABLE_DATA = __TABLE_STATE.get();

  const handleFocus = __FOCUS_HANDLER({
    td_ref: TD_REF,
    table_ref: Ref,
  });

  const handleKeyDown = __KEYDOWN_HANDLER(TD_REF);

  let refSetter = (
    el: any,
    listener: any = null,
    thisCell: { row: number; col: number }
  ) => {
    // @ts-ignore
    if (el && !TD_REF.current.includes(el)) {
      el.addEventListener("keydown", trackBlurablity);
      el.addEventListener("click", () => {
        setCellActive(thisCell);
      });

      if (listener) el.addEventListener("customEvent", listener);

      // @ts-ignore
      TD_REF.current.push(el);
    }
  };

  useEffect(() => {
    __TABLE_STATE.upsert({ data: set(props) });
  }, [props]);

  useEffect(() => {
    handleFocus();
  }, [TABLE_DATA.activeCells.row, TABLE_DATA.activeCells.col]);

  useEffect(() => {
    if (Ref.current) {
      handleFocus();
    }
  }, []);

  return (
    <>
      <div
        className={setClass(
          "softsheet-main_container",
          "softsheet-lightTemplate"
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
                            up,
                            down,
                            left,
                            right,
                          },
                          cursor: {
                            setActive: setCellActive,
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

                      if (IS_REFLECT_AVAILABLE && !IS_REFLECT_REACT)
                        REFLECT_FUNCTION = REFLECT_FUNCTION as ReflectFunction;

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
                                IS_REFLECT_AVAILABLE &&
                                  !IS_REFLECT_REACT &&
                                  REFLECT_FUNCTION?.listener
                                  ? REFLECT_FUNCTION?.listener
                                  : null,
                                { row: RowNumber, col: i }
                              )
                            }
                            className={
                              RowNumber == TABLE_DATA.activeCells.row &&
                              i == TABLE_DATA.activeCells.col
                                ? "softsheet-active_cell"
                                : ""
                            }
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
