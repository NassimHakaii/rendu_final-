const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  console.log(password);
  if (!password) {
    throw new Error("Password is required");
  }
  return bcrypt.hash(password, 10);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
