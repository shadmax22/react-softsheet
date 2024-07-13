import { set } from "js-upsert";
import { STATIC_TABLE_STATE } from "../utils/states";
import { ts_Table } from "../Table";

export function setFilter({
  filter_name,
  filter_value,
  tableId,
}: {
  filter_name: string;
  filter_value: any;
  tableId: number;
}) {
  let __state = STATIC_TABLE_STATE({ tableId });

  __state.upsert(set(filter_value, ["filter", filter_name]));

  return __state.get().filter;
}

const FILTER_VALUE_SCHEMA = (value: any, type: string) => {
  switch (type) {
    case "search":
      return value.toString().toLowerCase();

      break;

    case "select":
      return value.map((e: any) => e.toString().toLowerCase());
      break;
  }
};

const FILTER_CONDITION_SCHEMA = (value: any, colValue: any, type: string) => {
  switch (type) {
    case "search":
      console.log(colValue, value);
      return colValue.toString().toLowerCase().includes(value);

      break;

    case "select":
      return value.includes(colValue.toString().toLowerCase());
      break;
  }
};
export function doFilter({
  data,
  tableId,
  filterConfig,
}: {
  data: ts_Table["data"];
  tableId: number;
  filterConfig: ts_Table["filter"] | null;
}) {
  let __state = STATIC_TABLE_STATE({ tableId });
  let FILTERS = __state.get().filter;

  //   debugger;
  return data.filter((col) => {
    return Object.keys(FILTERS).reduce((stat: boolean, t: string): boolean => {
      if (!stat) return false;

      let FilterType = filterConfig?.data ? filterConfig?.data[t]?.type : false;

      if (!FilterType) return true;

      //   debugger;
      let thisFilterValue = FILTER_VALUE_SCHEMA(FILTERS[t], FilterType);

      let thisColValue = col[t];
      //   let thisColValue = typeof col[t] == "string" ? i[t].toLowerCase() : i[t];

      return (
        thisFilterValue.length == 0 ||
        FILTER_CONDITION_SCHEMA(thisFilterValue, thisColValue, FilterType)
      );
    }, true);
  });
}
