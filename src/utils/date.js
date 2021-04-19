export const addHours = (date, hours) => {
  const copy = new Date(date);
  copy.setTime(copy.getTime() + hours * 60 * 60 * 1000);
  return copy;
};
