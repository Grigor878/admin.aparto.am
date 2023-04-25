// Email Validator
export function isValidEmail(mail) {
  return /\S+@\S+\.\S+/.test(mail);
}

export function random(num) {
  return Math.floor(Math.random() * num);
}
