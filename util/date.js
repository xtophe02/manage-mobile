export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
  // return date.toISOString().slice(0, 10).split("-").reverse().join(".");
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
