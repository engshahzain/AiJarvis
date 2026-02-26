const { genToken } = require("../config/token");
const { HashPassword, ComparePass } = require("../Helpers/Password.helper");
const userModel = require("../models/user.model");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ExistedEmail = await userModel.findOne({ email });
    if (ExistedEmail) {
      return res
        .status(400)
        .send({ message: "email already existed", success: false });
    }
    const hashpass = await HashPassword(password);
    const user = await userModel.create({
      name,
      email,
      password: hashpass,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 100,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).send({
      message: "registration SuccessFull !",
      success: true,
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Registration Error !", success: false });
  }
};

// Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "User Was Not Found", success: false });
    }
    const isMatch = await ComparePass(password, user.password);

    if (!isMatch)
      return res.status(401).send({
        message: "password was Not Match",
        success: false,
        isMatch,
      });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 100,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).send({
      message: "Login SuccessFull !",
      success: true,
      user: user,
      token: token,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Registration Error !", success: false });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "Logout Success" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { Register, Login, Logout };
