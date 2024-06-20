import { SelectFilter } from "../components/Filters/Select";
import { ts_Table } from "../Table";
import { __BLUR_HANDLER } from "../handle/Blur";

const FILTER_TYPES = {
  select: (props: any) => <SelectFilter {...props}></SelectFilter>,
  "select-date": (props: any) => <SelectFilter {...props}></SelectFilter>,
  search: () => <input></input>,
};
export function buildFilter({
  data,
  tableId,
  FILTER_REF,
}: {
  data: ts_Table;
  tableId: number;
  FILTER_REF: any;
}) {
  let refSetter = (el: any) => {
    if (el && !FILTER_REF.current.includes(el as never)) {
      el.querySelectorAll("input").forEach((e: any) =>
        e.addEventListener("focus", __BLUR_HANDLER(tableId))
      );
      // @ts-ignore
      FILTER_REF.current.push(el);
    }
  };
  if (!data) return false;

  if (!data?.filter) return <></>;

  return (
    <>
      <tr className="filter">
        <td></td>
        {Object.keys(data.header).map((key: any) => {
          let filter_data = data?.filter ?? {};

          let reflect;
          let t = filter_data[key];

          if (t?.view) reflect = t?.view();

          if (t?.type) reflect = FILTER_TYPES[t?.type]({});

          return <td ref={refSetter}>{reflect ?? <></>}</td>;
        })}
      </tr>
    </>
  );
}
