export const classNamesHelper = (classes: (string | boolean)[]) => {
  return classes.filter((val) => typeof val === 'string').join(" ");
};