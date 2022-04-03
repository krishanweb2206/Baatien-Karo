const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/UserController");
const { protect } = require("../Middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
