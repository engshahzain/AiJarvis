const uploadonCloudinary = require("../config/Cloudinary");
const gemniresponse = require("../Gemni");
const userModel = require("../models/user.model");
const UserModel = require("../models/user.model");
const moment = require("moment");
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
      { new: true }
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

const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await userModel.findById(req.userId);
    const userName = user.name;
    const assistantName = user.assistantName;
    const result = await gemniresponse(command, assistantName, userName);
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).send({ response: "sorry , i can't understand " });
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;
    console.log(gemResult);
    switch (type) {
      case "get_date":
        return res.send({
          type,
          userinput: gemResult.userinput,
          response: `currunt date  is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.send({
          type,
          userinput: gemResult.userinput,
          response: `Current time is ${moment().format("HH:mm:ss")}`,
        });

      case "get_day":
        return res.send({
          type,
          userinput: gemResult.userinput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.send({
          type,
          userinput: gemResult.userinput,
          response: `Current month is ${moment().format("MMMM")}`,
        });
      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "get_time":
      case "get_date":
      case "get_day":
      case "get_month":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
        return res.send({
          type,
          userinput: gemResult.userinput,
          response: gemResult.response,
        });

      default:
        return res.send({
          type: "general",
          userinput: gemResult.userinput,
          response: gemResult.response || "Sorry, I didn't understand.",
        });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getCurruntUser, updateAssistant, askToAssistant };
