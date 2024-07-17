# SoftSheet Library

## Overview

**SoftSheet** is a comprehensive table library for React applications, providing powerful features for managing table state, keyboard navigation, filtering, and dynamic rendering of table content.

## Installation

To install the SoftSheet library, use the following npm command:

    npm install softsheet

## Setup

Wrap your application with `ThisProvider` to provide SoftSheet to your app:

    import { ThisProvider } from "react-usethis/thisProvider";

    <ThisProvider>
      <App />
    </ThisProvider>


Now SoftSheet is ready to use inside your `App`.

## API Reference

### Keyboard Navigation

The library provides several functions for managing keyboard navigation within tables:

- `setCellActive({ row, col, tableId })`: Sets the active cell in the table.
- `left(tableId)`: Moves the active cell to the left.
- `right(tableId)`: Moves the active cell to the right.
- `down(tableId)`: Moves the active cell down.
- `up(tableId)`: Moves the active cell up.
- `keyEnabled(stat, tableId)`: Enables key navigation for the table.

### Filter Options

The SoftSheet library includes components and interfaces for handling filtering:

    export interface FILTER_DATA {
        selected: (string | number)[];
        hover: number;
        options: {
            label: string;
            value: string | number;
        }[];
        searchQuery: string;
        visible: boolean;
        multiple: boolean;
        placeholder: string | null;
    }
    export interface setter {
        data: FILTER_DATA;
        set: Dispatch>;
    }
    export interface FitlerOptions {
        label: string;
        value: string | number;
    }
    export interface FilterProps {
        name?: string;
        options: FitlerOptions[];
        onChange?: (selected: FILTER_DATA["selected"], name: string | null) => void;
        multiple?: boolean;
        defaultValue?: FitlerOptions["value"];
        placeholder?: string;
    }


The `SoftSelect` component can be used to create filterable select inputs:

    import { SoftSelect } from "softsheet";

    function Example() {
        const options = [
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 },
        ];

        return (
            <SoftSelect
                name="example"
                options={options}
                onChange={(selected, name) => console.log(selected, name)}
            />
        );
    }


### Reflect Functions

The library allows you to dynamically render table cells and headers using reflect functions:

    export interface ReflectFunction {
        cellClass?: string;
        cellStyle?: any;
        view?: ReactElement;
        props?: React.HTMLAttributes;
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


### Table Configuration

The main `ts_Table` interface defines the structure of a SoftSheet table:

    export interface ts_Table {
        header: {
            [key: string]: string | ((data: ReflectHeaderProps) => ReflectFunction);
        };
        data: {
            [key: string]: string;
        }[];
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
            mainContainer?: React.HTMLAttributes;
            mainTable?: any;
            tableHead?: React.HTMLAttributes;
            tableBody?: React.HTMLAttributes;
            tableRow?: React.HTMLAttributes;
        };
    }


### Example Usage

    import { SoftSheet } from "softsheet";

    const tableProps = {
        header: {
            name: "Name",
            email: "Email",
        },
        data: [
            { name: "Alice Johnson", email: "alice.johnson@example.com" },
            { name: "Bob Smith", email: "bob.smith@example.com" },
            { name: "Charlie Brown", email: "charlie.brown@example.com" },
        ],
        reflect: {
            name: (data) => ({
                view: <strong>{data.row.name}</strong>,
                cellStyle: { color: "blue" },
            }),
        },
        filter: {
            data: {
                name: {
                    type: "search",
                    options: [
                        { label: "Alice", value: "alice.johnson@example.com" },
                        { label: "Bob", value: "bob.smith@example.com" },
                    ],
                },
            },
            onChange: (selected, name) => console.log(selected, name),
        },
    };

    function App() {
        return <SoftSheet {...tableProps} />;
    }


## Conclusion

`SoftSheet` is a versatile and powerful library for managing tables in React applications. By leveraging its robust features for state management, filtering, and dynamic rendering, you can create highly interactive and customizable tables with ease.
