const bcrypt = require("bcrypt");
const HashPassword = async (password) => {
  try {
    const hashpass = await bcrypt.hash(password, 10);
    return hashpass;
  } catch (error) {
    console.log("error on hashing Password");
  }
};
const ComparePass = async (password, hashpass) => {
  try {
    const isMatch = await bcrypt.compare(password, hashpass);
    return isMatch;
  } catch (error) {
    console.log("error on hashing Password");
  }
};
module.exports = { HashPassword, ComparePass };
