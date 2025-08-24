const { reviewCode } = require("../controllers/reviewController");
const express = require("express");
//const protectedRoute = require("../middleware/authmiddleware");

const router = express.Router();
router.post("/review", reviewCode);
//router.post("/fix", protectedRoute, fixCode);
module.exports = router;
