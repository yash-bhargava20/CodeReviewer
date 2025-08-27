const jwt = require("jsonwebtoken");
exports.googleCallback = (req, res) => {
  try {
    const user = req.user;
    console.log(req.user);
    if (!user) {
      return res.status(401).json({
        message: "Google authentication failed.",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.redirect(`${process.env.FRONTEND_URL}/google/callback?token=${token}`);
  } catch (error) {
    console.error("Google Callback Error:", error);
    res
      .status(500)
      .json({ message: "Google auth failed", error: error.message });
  }
};
