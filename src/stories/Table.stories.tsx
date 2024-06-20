import type { Meta, StoryObj } from "@storybook/react";

import { SoftSheet } from "../Table";
import { fn } from "@storybook/test";

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

export const Basic: Story = {
  args: basicDatas,
};
export const UsingReflect: Story = {
  args: reflectDatas,
};
