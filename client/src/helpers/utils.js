// Email Validator
export function isValidEmail(mail) {
  return /\S+@\S+\.\S+/.test(mail);
}
// random number
export function random(num) {
  return Math.floor(Math.random() * num);
}

// current year
export function getCurrentYear() {
  return new Date().getFullYear();
}

// debounce
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
