const {
  getCurruntUser,
  updateAssistant,
} = require("../controllers/User.controller");
const authCheck = require("../middleware/auth.middleware");
const router = require("express").Router();
const uploadImage = require("../middleware/Multer.middleware");
// http://localhost:5000/api/user/currunt-user"
router.get("/currunt-user", authCheck, getCurruntUser);
// http://localhost:5000/api/user/update-assistant"
router.post(
  "/update-assistant",
  authCheck,
  uploadImage.single("assistantImage"),
  updateAssistant,
);

module.exports = router;
