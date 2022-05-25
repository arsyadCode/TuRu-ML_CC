/* eslint-disable eol-last */
/* eslint-disable arrow-body-style */
const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidPass = (pass) => {
  return pass.length >= 6;
};

module.exports = {
  isValidEmail,
  isValidPass,
};
