import { ts_Table } from "../Table";
import { setClass, softsheetStyle } from "../utils/ease";

export function buildSerialNo({
  serial_no_data,
  type,
  value,
  row,
  index,
}: {
  serial_no_data?: ts_Table["serial_no"];
  type: "header" | "row";
  header: ts_Table["header"];
  value: string;
  row: ts_Table["data"] | null;
  index: number;
}) {
  const REFLECT_HEADER_PROPS = {
    index,
    col: value,
    row,
  };

  let IF_SERIAL_DISABLED = serial_no_data && !(serial_no_data?.visible ?? true);

  if (IF_SERIAL_DISABLED) return <></>;

  // debugger;
  let REFLECT_HEADER_IS_REACT = ((serial_no_data?.reflect as any) ?? {})[type]
    ? (serial_no_data?.reflect as any)[type](REFLECT_HEADER_PROPS)
    : null;

  let REFLECT_PROPS = REFLECT_HEADER_IS_REACT;

  return (
    <>
      {type == "header" ? (
        <>
          <th
            scope="col"
            className={REFLECT_PROPS?.cellClass ?? ""}
            style={REFLECT_PROPS?.cellStyle ?? {}}
            {...(REFLECT_HEADER_IS_REACT?.props as React.ThHTMLAttributes<HTMLTableHeaderCellElement>)}
          >
            {REFLECT_HEADER_IS_REACT?.view ?? value}
          </th>
        </>
      ) : (
        <>
          <>
            <td
              className={setClass(
                softsheetStyle("softsheet_main-count-no"),
                REFLECT_PROPS?.cellClass ?? ""
              )}
              style={REFLECT_PROPS?.cellStyle ?? {}}
              {...(REFLECT_HEADER_IS_REACT?.props as React.ThHTMLAttributes<HTMLTableHeaderCellElement>)}
            >
              {REFLECT_HEADER_IS_REACT?.view ?? value}
            </td>
          </>
        </>
      )}
    </>
  );
}
