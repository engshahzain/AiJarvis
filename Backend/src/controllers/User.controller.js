const uploadonCloudinary = require("../config/Cloudinary");
const UserModel = require("../models/user.model");
const getCurruntUser = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);
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

const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imgUrl } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadonCloudinary(req.file.path);
    } else {
      assistantImage = imgUrl;
    }
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImg: assistantImage,
      },
      { new: true },
    ).select("-password");

    res.status(200).send({
      success: true,
      message: "Assisstant update sucessfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getCurruntUser, updateAssistant };
