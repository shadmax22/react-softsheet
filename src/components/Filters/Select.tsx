import {
  faCheckCircle,
  faChevronCircleDown,
  faCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { Keydown } from "./Keydown";
import { set, upsert } from "js-upsert";
import { setClass } from "../../utils/ease";

interface FILTER_DATA {
  selected: (string | number)[];
  hover: number;
  options: {
    label: string;
    value: string | number;
  }[];
  searchQuery: string;
}
export interface setter {
  data: FILTER_DATA;
  set: Dispatch<SetStateAction<FILTER_DATA>>;
}
export function SelectFilter() {
  const [_FILTER_DATA, setFilterData] = useState<FILTER_DATA>({
    selected: [],
    hover: 0,
    options: [
      { label: "Green", value: "blue" },
      { label: "Blue", value: "blue" },
      { label: "Green2", value: "blue2" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
    ],
    searchQuery: "",
  });

  const setter: setter = { data: _FILTER_DATA, set: setFilterData };
  const selectOption = (value: FILTER_DATA["options"][number]["value"]) => {
    let filterSelected = _FILTER_DATA.selected;
    let isValuePresent = filterSelected.findIndex((v) => v == value);

    let new_data = upsert(_FILTER_DATA, {
      selected: set(
        isValuePresent > -1
          ? filterSelected.filter((v) => v != value)
          : [...filterSelected, value]
      ),
    });
    setFilterData(new_data);
  };

  const searchOption = (searchString: string) => {
    let new_data = upsert(_FILTER_DATA, {
      searchQuery: set(searchString),
    });
    setFilterData(new_data);
  };
  return (
    <>
      <div className="filterContainer">
        <div className="searchFilter gap-2">
          <div className="filter-options-selected gap-1 justify-between">
            <div className="w-2/3 flex gap-1">
              {_FILTER_DATA.selected.length > 0 ? (
                _FILTER_DATA.selected.map((e) => (
                  <span className="chips">
                    {_FILTER_DATA.options.find((o) => o.value == e)?.label}
                  </span>
                ))
              ) : (
                <span className="chips">All</span>
              )}
            </div>

            <FontAwesomeIcon
              className="filterIcon"
              icon={faChevronCircleDown}
            ></FontAwesomeIcon>
          </div>
          <div className="filterOptions-cont overflow-hidden">
            <div className="filterOption-search">
              <input
                className="filterOptions-search-input"
                onKeyDown={(e) => {
                  Keydown(e, setter);
                }}
                onKeyUp={(e: any) => searchOption(e.target.value)}
              ></input>
              <FontAwesomeIcon
                className="searchIcon"
                icon={faSearch}
              ></FontAwesomeIcon>
            </div>
            <div
              className="flex flex-col gap-2 filterOption-scroller"
              style={{ maxHeight: "200px" }}
            >
              {_FILTER_DATA.options
                .filter(
                  (e) =>
                    e.label
                      .toLowerCase()
                      .includes(_FILTER_DATA.searchQuery.toLowerCase()) ||
                    _FILTER_DATA.searchQuery == ""
                )
                .map((e, i) => {
                  let is_selected = _FILTER_DATA.selected.includes(e.value);
                  return (
                    <div
                      className={setClass(
                        "filterOption-list items-center gap-2",
                        i == _FILTER_DATA.hover ? "filterOption-hover" : ""
                      )}
                      onClick={() => selectOption(e.value)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
