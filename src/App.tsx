import { useState } from "react";

import Select from "react-select";
import { ReflectProps, Table } from "./Table";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate2" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function App() {
  const [count, setCount] = useState(0);

  const HEADER = {
    col1: "Column 1",
    col2: "Column 2",
  };

  const DATA = [
    {
      col1: "COL 1 VALUE",
      col2: "COL 2 VALUE",
    },
    {
      col1: "COL 1 VALUE",
      col2: "COL 2 VALUE",
    },
    {
      col1: "COL 1 VALUE",
      col2: "COL 2 VALUE",
    },
  ];

  const Reflect = {
    col1: () => <Select options={options}></Select>,
    col2: (col: ReflectProps) => ({
      view: <button onClick={() => {}}>CHECK BUTTONS</button>,
      listener: (e: any) => {
        // e.preventDefault();
      },
    }),
  };

  return (
    <>
      {/* <Table
        header={HEADER}
        template="darkTemplate"
        data={DATA}
        reflect={Reflect}
      ></Table> */}
      <Table header={HEADER} data={DATA} reflect={Reflect}></Table>
    </>
  );
}

export default App;
