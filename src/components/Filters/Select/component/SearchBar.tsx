import { set, upsert } from "js-upsert";
import { softsheetStyle } from "../../../../utils/ease";
import { Keydown } from "../../Keydown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { setter } from "../Select";

export function SearchBar({ state }: { state: setter }) {
  const searchOption = (searchString: string) => {
    let new_data = upsert(state.data, {
      searchQuery: set(searchString),
    });
    state.set(new_data);
  };

  return (
    <>
      <div className={softsheetStyle("filterOption-search sticky top-0")}>
        <input
          autoFocus={true}
          key={1}
          className={softsheetStyle("filterOptions-search-input")}
          onKeyDown={(e) => {
            Keydown(e, state);
          }}
          onBlur={() => {
            console.log("blurred search");
          }}
          onKeyUp={(e: any) => searchOption(e.target.value)}
        ></input>
        <FontAwesomeIcon
          className="searchIcon"
          icon={faSearch}
        ></FontAwesomeIcon>
      </div>
    </>
  );
}
