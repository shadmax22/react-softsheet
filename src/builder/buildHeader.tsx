// import { SoftSelect } from "../components/Filters/Select/Select";
import { ts_Table } from "../Table";
import { softsheetStyle } from "../utils/ease";
import { buildFilter } from "./buildFilter";
import { buildSerialNo } from "./buildSerialNo";

// const FILTER_TYPES = {
//   select: (props: any) => <SoftSelect {...props}></SoftSelect>,
//   "select-date": (props: any) => <SoftSelect {...props}></SoftSelect>,
//   search: () => <input></input>,
// };

export function buildHeader({
  header,
  serial_no,
  props,
  tableId,
  FILTER_REF,
}: {
  header: any;
  serial_no?: ts_Table["serial_no"];
  props?: ts_Table;
  tableId?: any;
  FILTER_REF?: any;
}) {
  return (
    <>
      <tr>
        {
          <>
            {buildSerialNo({
              serial_no_data: serial_no ?? {},
              type: "header",
              header,
              value: "#",
              row: null,
              index: -1,
            })}
            {/* <th scope="col" className="">
              #
            </th> */}
          </>
        }
        {Object.keys(header).map((e: any, i: number) => {
          const REFLECT_HEADER_PROPS = {
            index: i,
            col: header[e],
            row: header,
          };

          let REFLECT_HEADER_IS_REACT = typeof header[e] == "function";

          let REFLECT_FUN = REFLECT_HEADER_IS_REACT
            ? header[e](REFLECT_HEADER_PROPS)
            : header[e];

          let REFLECT_PROPS = REFLECT_HEADER_IS_REACT ? REFLECT_FUN?.props : {};

          return (
            <>
              <th scope="col" className="" {...(REFLECT_PROPS ?? {})}>
                <div className={softsheetStyle("header-title")}>
                  {REFLECT_HEADER_IS_REACT
                    ? REFLECT_FUN?.view ?? header[e]
                    : REFLECT_FUN}
                </div>

                {props?.filter &&
                  buildFilter({
                    data: props,
                    FILTER_REF,
                    tableId,
                    header_key: e,
                  })}
              </th>
            </>
          );
        })}
      </tr>
    </>
  );
}
