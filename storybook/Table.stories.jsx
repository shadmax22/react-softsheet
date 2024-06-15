import React from "react";
import Table from "./Table"; // Adjust the import path as necessary

export default {
  title: "Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Provide default props for the table
  columns: [
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "age" },
  ],
  data: [
    { name: "John Doe", age: 28 },
    { name: "Jane Doe", age: 22 },
  ],
};
