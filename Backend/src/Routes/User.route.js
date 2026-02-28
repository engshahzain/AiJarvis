const getCurruntUser = require("../controllers/User.controller");

const router = require("express").Router();

// http://localhost:5000/api/user/currunt-user"
router.post("/currunt-user", getCurruntUser);

module.exports = router;
