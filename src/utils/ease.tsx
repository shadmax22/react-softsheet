export function setClass(...classes: (string | null | boolean)[]) {
  let CLASSES_BREAKED = classes.filter((e) => e).join(" ");

  return CLASSES_BREAKED;
}
