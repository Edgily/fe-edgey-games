export const formatDate = (date) => {
  const dateFormatted = date.slice(0, -5).split("T").join(" at ");

  return dateFormatted;
};
