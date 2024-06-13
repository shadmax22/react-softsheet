import { ThisProvider } from "react-usethis/thisProvider";
import { TableContainer } from "./TableContainer";
import { ReactElement } from "react";
import { setCellActive } from "./keyevents/AllEvents";

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
}
export function Table(props: ts_Table) {
  return (
    <>
      <ThisProvider>
        <TableContainer {...props}></TableContainer>
      </ThisProvider>
    </>
  );
}
