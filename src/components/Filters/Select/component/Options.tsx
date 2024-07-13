import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setClass, softsheetStyle } from "../../../../utils/ease";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { set, upsert } from "js-upsert";
import { FILTER_DATA, setter } from "../Select";

export const selectOption = (
  value: FILTER_DATA["options"][number]["value"],
  state: setter
) => {
  let filterSelected = state.data.selected;
  let isValuePresent = filterSelected.findIndex((v) => v == value);
  let new_data;
  if (state.data.multiple) {
    new_data = upsert(state.data, {
      selected: set(
        isValuePresent > -1
          ? filterSelected.filter((v) => v != value)
          : [...filterSelected, value]
      ),
    });
  } else {
    new_data = upsert(state.data, {
      selected: set(isValuePresent == -1 ? [value] : []),
    });
  }
  state.set(new_data);
};
export function Options({ state }: { state: setter }) {
  return (
    <>
      {state.data.options
        .filter(
          (e) =>
            e.label
              .toLowerCase()
              .includes(state.data.searchQuery.toLowerCase()) ||
            state.data.searchQuery == ""
        )

        .map((e, i) => {
          let is_selected = state.data.selected.includes(e.value);
          return (
            <div
              className={setClass(
                softsheetStyle(
                  "filterOption-listitem items-center gap-2 hover:bg-gray-200 cursor-pointer"
                ),
                i == state.data.hover
                  ? softsheetStyle("filterOption-hover") + " hovered_option"
                  : ""
              )}
              onClick={() => selectOption(e.value, state)}
            >
              {is_selected ? (
                <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-gray-400"
                ></FontAwesomeIcon>
              )}

              {e.label}
            </div>
          );
        })}
    </>
  );
}
