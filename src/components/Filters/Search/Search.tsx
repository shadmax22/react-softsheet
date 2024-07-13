import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { softsheetStyle } from "../../../utils/ease";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function Search(props: any) {
  return (
    <>
      <div className={softsheetStyle("input-filter")}>
        <div className={softsheetStyle("input-cont flex items-center")}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          <input {...props}></input>
        </div>
      </div>
    </>
  );
}
