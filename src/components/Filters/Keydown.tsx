import React from "react";
import { setter } from "./Select/Select";
import { set, upsert } from "js-upsert";
import { selectOption } from "./Select/component/Options";

export function Keydown(
  e: React.KeyboardEvent,
  state: setter
  // mainInputRef: React.RefObject<HTMLInputElement>
) {
  switch (e.key) {
    case "ArrowDown":
      upsert(state.data, {
        hover: set((i: number) =>
          state.data.options.length == i + 1 ? 0 : i + 1
        ),
      });
      e.stopPropagation();
      break;
    case "ArrowUp":
      upsert(state.data, {
        hover: set((i: number) =>
          -1 == i - 1 ? state.data.options.length - 1 : i - 1
        ),
      });
      e.stopPropagation();

      break;
    case "Enter":
      selectOption(state.data.options[state.data.hover].value, state);
      e.stopPropagation();
      break;
    case "Escape":
      state.set(upsert(state.data, set(false, "visible")));
      e.preventDefault();
      break;

    default:
      e.stopPropagation();
  }
}
