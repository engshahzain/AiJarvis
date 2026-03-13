const express = require("express");
const App = express();
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./Routes/Auth.route");
const UserRoute = require("./Routes/User.route");
const gemniresponse = require("./Gemni");
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cookie_parser());
App.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // VERY IMPORTANT
  })
);

App.use("/api/Auth", AuthRoute);
App.use("/api/user", UserRoute);

module.exports = App;
