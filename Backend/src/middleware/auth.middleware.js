require("dotenv").config();
const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .send({ message: "Please Login First", success: false });
    const decode = await jwt.verify(token, process.env.SECRETKEY);
    req.userId = decode._id;
    next();
  } catch (error) {
    console.log(error + "Error on auth check middleware");
    return res
      .status(500)
      .send({ success: false, message: "Error on auth middleware server" });
  }
};

module.export = { authCheck };
