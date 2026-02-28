const getCurruntUser = require("../controllers/User.controller");
const authCheck = require("../middleware/auth.middleware");
const router = require("express").Router();

// http://localhost:5000/api/user/currunt-user"
router.get("/currunt-user", authCheck, getCurruntUser);

module.exports = router;
