import Select from "react-select";
import { SoftSheet } from "./Table";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "chocolate", label: "Chocolate2" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function App() {
  const HEADER = {
    col1: "Column 1",
    col2: "Column 2",
    col3: "Column 3",
  };

  // const FILTER = {
  //   col1: {
  //     type: "select",
  //   },
  //   col2: {
  //     type: "select",
  //   },
  // };

  const DATA = [
    {
      col1: "COL 1 VALUE",
      col2: "COL 2 VALUE",
      col3: "COL 2 VALUE",
    },
    {
      col1: "COL 1 VALUE",
      col2: "COL 2 VALUE",
      col3: "COL 2 VALUE",
    },
    {
      col1: "COL 1 VALUE",
      col2: "COL 2 VALUE",
      col3: "COL 2 VALUE",
    },
  ];

  const Reflect = {
    col1: () => <Select options={options}></Select>,
    col2: () => ({
      view: <input />,
      listener: () => {
        // e.preventDefault();
      },
    }),
    // col3: (d) => {
    //   return <input onKeyDown={() => d.keyboard.navigation.down()}></input>;
    // },
  };

  return (
    <>
      {/* <Table
        header={HEADER}
        template="darkTemplate"
        data={DATA}
        reflect={Reflect}
      ></Table> */}
      <SoftSheet
        autoFocus={true}
        header={HEADER}
        data={DATA}
        filter={{
          col1: {
            type: "select-date",
            name: "green",
          },
        }}
        reflect={Reflect}
      ></SoftSheet>
    </>
  );
}

export default App;
