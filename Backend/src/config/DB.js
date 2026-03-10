require("dotenv").config();
const mongoose = require("mongoose");

const Db = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongoo Db SuccessFully Connected"))
    .catch((err) => {
      console.log("Error Connecting to DB");
      process.exit(1);
    });
};

module.exports = Db;
