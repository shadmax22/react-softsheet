import s from "../style/SoftSheet.module.css";

export function setClass(...classes: (string | null | boolean)[]) {
  let CLASSES_BREAKED = classes.filter((e) => e).join(" ");

  return CLASSES_BREAKED;
}

export function softsheetStyle(className: string | boolean) {
  if (typeof className != "string") return "";

  let classess_breaked = className.split(" ");

  return classess_breaked.reduce(
    (init: string, t: string) => init + " " + (s[t] ?? ""),
    ""
  );
}
