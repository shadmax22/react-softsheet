import React from "react";
import { setter } from "./Select";
import { set, upsert } from "js-upsert";

export function Keydown(e: React.KeyboardEvent, state: setter) {
  switch (e.key) {
    case "ArrowDown":
      upsert(state.data, {
        hover: set((i: number) =>
          state.data.options.length == i + 1 ? 0 : i + 1
        ),
      });
      break;
    case "ArrowUp":
      upsert(state.data, {
        hover: set((i: number) =>
          -1 == i - 1 ? state.data.options.length - 1 : i - 1
        ),
      });
      break;
  }
}
