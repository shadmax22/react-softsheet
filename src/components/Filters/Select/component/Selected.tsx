import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { softsheetStyle } from "../../../../utils/ease";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { setter } from "../Select";
import { selectOption } from "./Options";

export function Selected({ state }: { state: setter }) {
  return (
    <>
      <div
        className={softsheetStyle(
          "filter-options-selected gap-1 justify-between overflow-hidden"
        )}
      >
        <div className={softsheetStyle("w-full flex gap-1 flex-wrap")}>
          {state.data.selected.length > 0 ? (
            state.data.selected.map((e) => {
              const this_selected_option = state.data.options.find(
                (o) => o.value == e
              );
              return (
                <span
                  className={softsheetStyle(
                    "chips relative hover:bg-red-400 cursor-pointer hover:text-white"
                  )}
                  onClick={() =>
                    selectOption(this_selected_option?.value ?? "", state)
                  }
                >
                  {this_selected_option?.label}
                </span>
              );
            })
          ) : (
            <span className={softsheetStyle("chips")}>
              {state?.data?.placeholder ??
                (state?.data?.multiple ? "All" : "Select")}
            </span>
          )}
        </div>

        <FontAwesomeIcon
          className={softsheetStyle("filterIcon")}
          icon={faChevronCircleDown}
        ></FontAwesomeIcon>
      </div>
    </>
  );
}
