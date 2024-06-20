import { ThisProvider } from "react-usethis/thisProvider";
import { TableContainer } from "./TableContainer";
import { createContext, CSSProperties, ReactElement } from "react";
import { setCellActive } from "./keyevents/AllEvents";

import "./style/SoftSheet.css";
export interface ReflectFunction {
  cellClass?: string;
  cellStyle?: any;
  view: ReactElement;
}

export interface ReflectProps {
  row: any;
  col: any;
  row_no: number;
  index: number;
  keyboard: KeyboardProps;
}
export interface FilterProps {
  row: any;
  col: any;
  row_no: number;
  index: number;
  keyboard: KeyboardProps;
}

interface KeyboardProps {
  navigation: {
    up: () => void;
    down: () => void;
    left: () => void;
    right: () => void;
  };
  cursor: {
    setActive: (props: setCellActive) => void;
  };
}

export interface ts_Table {
  header: { [key: string]: string };
  data: { [key: string]: string }[];
  reflect?: {
    [key: string]: (data: ReflectProps) => ReflectFunction | ReactElement;
  };
  filter?: {
    [key: string]: {
      name: string;
      type?: "select" | "select-date" | "search";
      options?: { label: string; value: string | number }[];
      view?: () => void;
    };
  };
  template?: string;
  style?: CSSProperties;
  autoFocus?: boolean;
  className?: string;
  // props?: {
  //   "softsheet-main_container"?: React.DetailedHTMLProps<
  //     React.HTMLAttributes<HTMLDivElement>,
  //     HTMLDivElement
  //   >;
  //   "softsheet-main_table"?: React.DetailedHTMLProps<
  //     React.TableHTMLAttributes<HTMLTableElement>,
  //     HTMLTableElement
  //   >;
  //   "softsheet-main_table_thead"?: React.DetailedHTMLProps<
  //     React.HTMLAttributes<HTMLTableSectionElement>,
  //     HTMLTableSectionElement
  //   >;
  //   "softsheet-main_table_tbody"?: React.DetailedHTMLProps<
  //     React.HTMLAttributes<HTMLTableSectionElement>,
  //     HTMLTableSectionElement
  //   >;
  // };
}
export const GlobalDatas = createContext({});
export function SoftSheet(props: ts_Table) {
  const _GLOBAL_DATA_PROVIDED = { style: props?.style ?? {} };
  return (
    <>
      <ThisProvider>
        <GlobalDatas.Provider value={_GLOBAL_DATA_PROVIDED}>
          <TableContainer {...props}></TableContainer>
        </GlobalDatas.Provider>
      </ThisProvider>
    </>
  );
}
