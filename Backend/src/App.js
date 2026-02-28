const express = require("express");
const App = express();
const cookie_pareser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./Routes/Auth.route");
const UserRoute = require("./Routes/User.route");
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cookie_pareser());
App.use(cors());

App.use("/api/Auth", AuthRoute);
App.use("/api/user", UserRoute);
module.exports = App;
