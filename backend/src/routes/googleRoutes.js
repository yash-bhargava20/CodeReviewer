const express = require("express");
const passport = require("passport");
const { googleCallback } = require("../controllers/googleController");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

module.exports = router;
