require("dotenv").config();
const jwt = require("jsonwebtoken");
const genToken = async (userID) => {
  try {
    const token = await jwt.sign({ userID }, process.env.SECRETKEY, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { genToken };
