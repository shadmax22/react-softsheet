import { SoftSelect } from "../components/Filters/Select/Select";
import { ts_Table } from "../Table";
import { __BLUR_HANDLER } from "../handle/Blur";
import { softsheetStyle } from "../utils/ease";
import { Search } from "../components/Filters/Search/Search";
import { setFilter } from "../worker/Fiilter";

const FILTER_TYPES = ({
  tableId,
  colName,
  onChange,
}: {
  tableId: number;
  colName: string;
  onChange: any;
}) => {
  let onFilterChange = ({ value, name, type }: any) => {
    let filter_props: any = {};
    switch (type) {
      case "search":
        filter_props = {
          filter_name: value?.target?.name ?? colName,
          filter_value: value?.target.value,
        };
        break;
      case "select":
        filter_props = {
          filter_name: name ?? colName,
          filter_value: value,
        };
        break;
    }

    return onChange(
      setFilter({
        ...filter_props,
        tableId,
      })
    );
  };

  return {
    select: (props: any) => (
      <SoftSelect
        {...props}
        onChange={(value, name) =>
          onFilterChange({ value, name, type: "select" })
        }
      ></SoftSelect>
    ),
    // "select-date": (props: any) => <SoftSelect {...props}></SoftSelect>,
    search: (props: any) => (
      <Search
        {...props}
        name={colName ?? props?.name ?? ""}
        onChange={(e: any) => onFilterChange({ value: e, type: "search" })}
      ></Search>
    ),
  };
};
export function buildFilter({
  data,
  tableId,
  FILTER_REF,
  header_key,
}: {
  data: ts_Table;
  tableId: number;
  FILTER_REF: any;
  header_key: any;
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
  let filter_data = data?.filter?.data ?? {};

  let reflect;

  let this_col_filter = {
    ...filter_data[header_key],
  };

  if (this_col_filter?.view) reflect = this_col_filter?.view();

  if (this_col_filter?.type)
    reflect = FILTER_TYPES({
      tableId,
      colName: this_col_filter?.name ?? header_key,
      onChange: data?.filter?.onChange,
    })[this_col_filter?.type](this_col_filter);

  return (
    <>
      <div className={softsheetStyle("filter")}>
        <div className="w-fit" ref={refSetter}>
          {reflect ?? <></>}
        </div>
      </div>
    </>
  );
}
