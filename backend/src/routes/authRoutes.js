const express = require("express");
const {
  signup,
  login,
  logout,
  getMe,
} = require("../controllers/authController");
const protectedRoute = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protectedRoute, getMe);

module.exports = router;
