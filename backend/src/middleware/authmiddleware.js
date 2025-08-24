const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Token is not available" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!User) return res.status(401).json({ error: "User is not available" });
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Invalid Token" });
  }
};
module.exports = protectedRoute;
