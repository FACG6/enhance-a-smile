const validateEamil = email => /^[\w.-_%+]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(email);

if (typeof module !== 'undefined') {
  module.exports = { validateEamil };
}
