const UserModel = require("../models/user.model");
const getCurruntUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).send({ message: "User Not Found" });
    }
    return res
      .status(200)
      .send({ message: "user Found", user: user, success: true });
  } catch (error) {
    return res.status(500).send({ message: "GEt currunt user error" });
  }
};

module.exports = getCurruntUser;
