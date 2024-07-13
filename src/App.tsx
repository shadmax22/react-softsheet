import { SoftSheet } from "./Table";
// import { SoftSelect } from "./components/Filters/Select/Select";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "chocolate", label: "Chocolate2" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

function App() {
  const HEADER = {
    col1: () => ({
      view: <b>Green</b>,
      props: {},
    }),
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
    // col1: () => <SoftSelect></SoftSelect>,
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
        props={{
          mainContainer: {},
          tableHead: {
            className: "bg-red-400",
          },
        }}
        autoFocus={true}
        header={HEADER}
        data={DATA}
        filter={{
          data: {
            col1: {
              type: "search",
              options: [
                { label: "Helo", value: "greeen" },
                { label: "Hii", value: "greeenx" },
              ],
            },
            col2: {
              type: "select",
              options: [
                { label: "Helo", value: "greeen" },
                { label: "Hii", value: "greeenx" },
              ],
              multiple: false,
            },
          },
          onChange: (a, b) => {
            console.log(a, b);
          },
        }}
        reflect={Reflect}
      ></SoftSheet>
    </>
  );
}

export default App;
