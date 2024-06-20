import { useEffect, useRef, useState } from "react";
import { __KEYDOWN_HANDLER } from "./handle/Keydown";
import { __BLUR_HANDLER } from "./handle/Blur";
import { __FOCUS_HANDLER } from "./handle/Focus";
import { TABLE_DATA, TABLE_STATE } from "./utils/states";
import { ts_Table } from "./Table";
import { setClass } from "./utils/ease";

import { set } from "js-upsert";

import { buildRows } from "./builder/buildRows";
// import { buildFilter } from "./builder/buildFilter";

export function TableContainer(props: ts_Table) {
  let [tableId, setTableId] = useState(0);

  useEffect(() => {
    setTableId(Math.ceil(Math.random() * 100000));
  }, []);

  let Ref = useRef<HTMLTableElement>(null);
  let TD_REF = useRef([]);
  // let FILTER_REF = useRef([]);

  let { header, data, reflect } = props;

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

  const handleKeyDown = __KEYDOWN_HANDLER(TD_REF, tableId);

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

  let VIEABLE_TABLE_DATA = data;
  if (!data || !header) return <></>;

  // let PROPS_FETCHER_FOR_COMPONENT = (
  //   component_name:
  //     | "softsheet-main_container"
  //     | "softsheet-main_table"
  //     | "softsheet-main_table_thead"
  //     | "softsheet-main_table_tbody"
  // ) => (props?.props ?? {})[component_name] ?? {};

  return (
    <>
      <div
        className={setClass(
          "softsheet-main_container",
          `softsheet-template-${props?.template ?? "lightTemplate"}`,
          props?.className ?? "lightTemplate"
        )}
        onKeyDown={handleKeyDown}
        // onBlur={handleBlur}
        ref={Ref}
        tabIndex={-1}
      >
        <table className={setClass("softsheet-main_table")}>
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
                  <div
                    className={setClass("flex items-center  justify-center")}
                  >
                    NOTHING TO SHOW
                  </div>
                </td>
              </tr>
            )}

            {/* {props?.filter && buildFilter({ data: props, FILTER_REF, tableId })} */}

            {(VIEABLE_TABLE_DATA ?? []).map((ROW: any, RowNumber: number) =>
              buildRows({
                RowNumber,
                ROW,
                tableId,
                reflect,
                TD_REF,
                TABLE_DATA,
                header,
                type: "row",
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
