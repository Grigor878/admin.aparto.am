// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// split before "/"
export function splitBefore(str) {
  return str.split("/")[0];
}
// split after "/"
export function splitAfter(str) {
  return str.split("/")[1];
}