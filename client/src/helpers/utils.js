// Email Validator
export function isValidEmail(mail) {
  return /\S+@\S+\.\S+/.test(mail);
}
// random number
export function random(num) {
  return Math.floor(Math.random() * num);
}
// capitalize
export function capitalize(str){
 return str.charAt(0).toUpperCase() + str.slice(1)
}