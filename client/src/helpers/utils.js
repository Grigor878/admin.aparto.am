// Email Validator
export function isValidEmail(mail) {
  return /\S+@\S+\.\S+/.test(mail);
}
