import { useCallback, useEffect, useRef, useState } from "react";
import { __KEYDOWN_HANDLER } from "./handle/Keydown";
import { __BLUR_HANDLER } from "./handle/Blur";
import { __FOCUS_HANDLER } from "./handle/Focus";
import { TABLE_DATA, TABLE_STATE } from "./utils/states";
import { ts_Table } from "./Table";
import { setClass, softsheetStyle } from "./utils/ease";

import { set } from "js-upsert";

import { buildRows } from "./builder/buildRows";
import { buildHeader } from "./builder/buildHeader";
import { doFilter } from "./worker/Fiilter";
// import { buildFilter } from "./builder/buildFilter";

export function TableContainer(props: ts_Table) {
  let [tableId] = useState(Math.ceil(Math.random() * 100000));

  // useEffect(() => {
  //   setTableId(Math.ceil(Math.random() * 100000));
  // }, []);

  let Ref = useRef<HTMLTableElement>(null);
  let TD_REF = useRef([]);
  let FILTER_REF = useRef([]);

  let { header, data, reflect, serial_no } = props;

  let __TABLE_STATE = TABLE_STATE({
    initialLoad: {
      maxRowLength: data?.length,
      maxColumnLength: Object.keys(header ?? {}).length,
    },
    tableId,
  });

  let TABLE_DATA: TABLE_DATA = __TABLE_STATE.get();

  const handleFocus = __FOCUS_HANDLER({
    td_ref: TD_REF,
    table_ref: Ref,
    tableId,
  });
  const handleKeyDown = useCallback(__KEYDOWN_HANDLER(TD_REF, tableId), [
    TABLE_DATA.activeCells,
  ]);

  useEffect(() => {
    __TABLE_STATE.upsert({
      maxRowLength: set(data?.length),
    });
  }, [data?.length]);
  useEffect(() => {
    __TABLE_STATE.upsert({
      maxColumnLength: set(Object.keys(header ?? {}).length),
    });
  }, [Object.keys(header ?? {}).length]);

  useEffect(() => {
    handleFocus();
  }, [TABLE_DATA.activeCells.row, TABLE_DATA.activeCells.col]);

  useEffect(() => {
    if (Ref.current) {
      if (props?.autoFocus) Ref.current.focus();
    }
  }, [Ref.current]);

  if (!tableId) return <></>;

  let VIEWABLE_TABLE_DATA = doFilter({
    data,
    tableId,
    filterConfig: props.filter,
  });
  if (!data || !header) return <></>;

  let PROPS_FETCHER_FOR_COMPONENT = (
    component_name:
      | "mainContainer"
      | "mainTable"
      | "tableHead"
      | "tableBody"
      | "tableRow"
  ) => (props?.props ?? {})[component_name] ?? {};

  return (
    <>
      <div
        {...PROPS_FETCHER_FOR_COMPONENT("mainContainer")}
        className={setClass(
          "softsheet-main_container",
          softsheetStyle("softsheet-main_container"),
          softsheetStyle(
            `softsheet-template-${props?.template ?? "lightTemplate"}`
          ),
          props?.className ?? softsheetStyle("lightTemplate"),
          PROPS_FETCHER_FOR_COMPONENT("mainContainer")?.className ?? ""
        )}
        onKeyDown={handleKeyDown}
        // onBlur={handleBlur}

        ref={Ref}
        tabIndex={-1}
      >
        <table
          {...PROPS_FETCHER_FOR_COMPONENT("mainTable")}
          className={setClass(
            softsheetStyle("softsheet-main_table"),
            PROPS_FETCHER_FOR_COMPONENT("mainTable")?.className ?? ""
          )}
        >
          <thead {...PROPS_FETCHER_FOR_COMPONENT("tableHead")}>
            {/* <tr className="filter">
              <td></td>
              <td>
                <SoftSelect></SoftSelect>
              </td>
              <td>
                <SoftSelect></SoftSelect>
              </td>
            </tr> */}

            {buildHeader({
              header,
              serial_no,
              props,
              FILTER_REF,
              tableId,
            })}
          </thead>
          <tbody {...PROPS_FETCHER_FOR_COMPONENT("tableBody")}>
            {data?.length == 0 && (
              <tr>
                <td colSpan={Object.keys(header ?? {}).length + 1}>
                  <div
                    className={setClass("flex items-center  justify-center")}
                  >
                    NOTHING TO SHOW
                  </div>
                </td>
              </tr>
            )}

            {(VIEWABLE_TABLE_DATA ?? []).map((ROW: any, RowNumber: number) =>
              buildRows({
                RowNumber,
                ROW,
                tableId,
                reflect,
                TD_REF,
                TABLE_DATA,
                header,
                type: "row",
                serial_no,
                rowProps: PROPS_FETCHER_FOR_COMPONENT("tableRow"),
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
