import type { Meta, StoryObj } from "@storybook/react";

import { SoftSheet } from "../Table";
import { fn } from "@storybook/test";
import { softsheetStyle } from "../utils/ease";
// import { filter } from "lodash";

const meta = {
  title: "Example/Table",
  component: SoftSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SoftSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicDatas = {
  data: [
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Smith", email: "bob.smith@example.com" },
    { name: "Charlie Brown", email: "charlie.brown@example.com" },
  ],
  header: {
    name: "Name",
    email: "Email",
  },
  className: softsheetStyle("table_styled"),
};

const reflectDatas = {
  ...basicDatas,

  reflect: {
    name: fn(() => {
      return {
        view: <h1>Green</h1>,
        cellStyle: { color: "red" },
      };
    }),
  },
};

const filterDatas = {
  ...basicDatas,

  filter: {
    data: {
      name: {
        type: "search" as "search",
        options: [
          { label: "Helo", value: "greeen" },
          { label: "Hii", value: "greeenx" },
        ],
      },
      email: {
        type: "select" as "select",
        options: [
          { label: "Alice Johnson", value: "Alice Johnson" },
          { label: "Charle", value: "greeenx" },
        ],
        multiple: true,
      },
    },
    onChange: () => {},
  },
};

export const Basic: Story = {
  args: basicDatas,
};
export const Reflect: Story = {
  args: reflectDatas,
};
export const Filters: Story = {
  args: filterDatas,
};
