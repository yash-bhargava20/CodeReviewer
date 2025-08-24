const aiGemini = require("../services/gemini");

exports.reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const response = await aiGemini(code, language);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return res.status(500).json({
      message: "Failed to generate review",
      error: error.message,
    });
  }
};
