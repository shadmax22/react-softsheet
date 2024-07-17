import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { set, upsert } from "js-upsert";
import { setClass, softsheetStyle } from "../../../utils/ease";
import { SearchBar } from "./component/SearchBar";
import { Selected } from "./component/Selected";
import { Options } from "./component/Options";
import { createPortal } from "react-dom";

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
  set: Dispatch<SetStateAction<FILTER_DATA>>;
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

const _FILTER_DIV = memo(({ mainFilter, setter }: any) => {
  const mainFilterDropdown = useRef<HTMLDivElement>(null);
  const showFilter = (stat = true) => {
    setter.set(upsert(setter.data, set(stat, "visible")));
  };

  useEffect(() => {
    if (mainFilterDropdown?.current) {
      const activeElement =
        mainFilterDropdown.current.querySelector(".hovered_option");
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    console.log(setter.data.visible);
  }, [setter.data]);

  return createPortal(
    <div
      key={1}
      className={setClass(
        "softselect-dropdown",
        softsheetStyle("filterContainer fixed searchFilter-opened")
      )}
      onMouseLeave={() => showFilter(false)}
      style={{
        width: (mainFilter?.current?.offsetWidth + 12 ?? "") + "px",
        left:
          (mainFilter?.current?.getBoundingClientRect()?.left - 12 ?? "") +
          "px",
        top: (mainFilter?.current?.getBoundingClientRect()?.top ?? "") + "px",
      }}
    >
      <div
        key={1}
        className={softsheetStyle("searchFilter gap-2 anim-popback")}
      >
        <Selected state={setter}></Selected>

        {setter.data?.visible && (
          <>
            <div
              className={softsheetStyle("filterOptions-cont overflow-hidden")}
            >
              <SearchBar state={setter}></SearchBar>
              <div
                className={softsheetStyle(
                  "flex flex-col gap-2 filterOption-scroller"
                )}
                ref={mainFilterDropdown}
                style={{ maxHeight: "200px" }}
              >
                <Options state={setter}></Options>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
});

export function SoftSelect(props: FilterProps) {
  const [_FILTER_DATA, setFilterData] = useState<FILTER_DATA>({
    selected: props?.defaultValue ? [props?.defaultValue] : [],
    hover: 0,
    options: props.options,
    searchQuery: "",
    visible: false,
    placeholder: props?.placeholder ?? null,
    multiple: props?.multiple ?? false,
  });

  useEffect(() => {
    if (props?.onChange)
      props?.onChange(_FILTER_DATA?.selected, props?.name ?? null);
  }, [_FILTER_DATA?.selected]);

  const setter: setter = { data: _FILTER_DATA, set: setFilterData };

  const mainFilter = useRef<HTMLDivElement>(null);

  const showFilter = (stat = true) => {
    setFilterData(upsert(_FILTER_DATA, set(stat, "visible")));
  };

  const main_select_element = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        ref={mainFilter}
        className={setClass(softsheetStyle("filterContainer transition"))}
        onMouseOver={() => showFilter(true)}
        style={{
          opacity: _FILTER_DATA?.visible ? "0" : "1",
        }}
      >
        <input
          style={{ height: 0, width: 0 }}
          onFocus={() => showFilter(true)}
          ref={main_select_element}
        ></input>
        <div className={softsheetStyle("searchFilter gap-2")}>
          <Selected state={setter}></Selected>
        </div>
      </div>

      {_FILTER_DATA?.visible && (
        <div key={1}>
          <_FILTER_DIV
            mainInputRef={main_select_element}
            mainFilter={mainFilter}
            showFilter={showFilter}
            setter={setter}
          ></_FILTER_DIV>
        </div>
      )}
    </>
  );
}
