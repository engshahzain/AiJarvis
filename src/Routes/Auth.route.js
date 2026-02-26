const { Register, Login, Logout } = require("../controllers/Auth.controller");
const router = require("express").Router();

// http://localhost:5000/api/Auth/register"
router.post("/register", Register);
// http://localhost:5000/api/Auth/login"
router.post("/login", Login);
// http://localhost:5000/api/Auth/logout"
router.post("/logout", Logout);

module.exports = router;
