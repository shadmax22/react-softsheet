import { ThisProvider } from "react-usethis/thisProvider";
import { TableContainer } from "./TableContainer";
import { createContext, CSSProperties, ReactElement } from "react";
import { setCellActive } from "./keyevents/AllEvents";
import { FitlerOptions } from "./components/Filters/Select/Select";

export interface ReflectFunction {
  cellClass?: string;
  cellStyle?: any;
  view?: ReactElement;
  props?: React.HTMLAttributes<HTMLTableSectionElement>;
}

export interface ReflectHeaderProps {
  row: any;
  col: any;
  index: number;
}
export interface ReflectProps {
  row: any;
  col: any;
  row_no: number;
  index: number;
  keyboard: KeyboardProps;
  col_name: string;
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
  header: {
    [key: string]: string | ((data: ReflectHeaderProps) => ReflectFunction);
  };
  data: { [key: string]: string }[];
  reflect?: {
    [key: string]: (data: ReflectProps) => ReflectFunction | ReactElement;
  };
  filter?: {
    data: {
      [key: string]: {
        name?: string;
        multiple?: boolean;
        defaultValue?: FitlerOptions["value"];
        placeholder?: string;
        type?: "select" | "search";
        options?: FitlerOptions[];
        view?: () => void;
      };
    };
    onChange?: (selected: FitlerOptions, name: string | null) => void;
  };

  serial_no?: {
    visible?: boolean;
    reflect?: {
      header?: (data: ReflectHeaderProps) => ReflectFunction;
      row?: (data: ReflectHeaderProps) => ReflectFunction;
    };
  };
  template?: string;
  style?: CSSProperties;
  autoFocus?: boolean;
  className?: string;
  props?: {
    mainContainer?: React.HTMLAttributes<HTMLDivElement>;
    mainTable?: any;
    tableHead?: React.HTMLAttributes<HTMLTableSectionElement>;
    tableBody?: React.HTMLAttributes<HTMLTableSectionElement>;
    tableRow?: React.HTMLAttributes<HTMLTableRowElement>;
  };
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
