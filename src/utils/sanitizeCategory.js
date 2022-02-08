export const sanitizeCategory = (category) => {
  const searchRegExp = /-/g;
  const replaceWith = " ";
  const replacedHyphens = category.replace(searchRegExp, replaceWith);

  const capitalizedCategory = replacedHyphens.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter) => letter.toUpperCase()
  );

  return capitalizedCategory;
};
