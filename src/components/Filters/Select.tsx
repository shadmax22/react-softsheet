import {
  faChevronCircleDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Keydown } from "./Keydown";

export function SelectFilter() {
  const [_FILTER_DATA, setFilterData] = useState({
    selected: [],
    options: [
      { label: "Green", value: "blue" },
      { label: "Green2", value: "blue2" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
      { label: "Green3", value: "blue3" },
    ],
  });

  return (
    <>
      <div className="filterContainer">
        <div className="searchFilter">
          <div className="filter-input">
            {_FILTER_DATA.selected.length > 0 ? (
              <></>
            ) : (
              <span className="chips">All</span>
            )}

            <FontAwesomeIcon
              className="filterIcon"
              icon={faChevronCircleDown}
            ></FontAwesomeIcon>
          </div>
          <div className="filterOptions-cont overflow-hidden">
            <div className="filterOption-search">
              <input
                className="filterOptions-search-input"
                onKeyDown={Keydown}
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
              {_FILTER_DATA.options.map((e) => (
                <div className="filterOption-list">{e.label}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
