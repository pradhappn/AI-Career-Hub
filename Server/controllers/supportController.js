const { generateText } = require("../services/geminiService");

exports.askSupport = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question?.trim()) {
      return res.status(400).json({ message: "A support question is required" });
    }

    const answer = await generateText(`You are the AI Career Hub support assistant. Answer this user question clearly and briefly. If it concerns account access, billing, or a server problem you cannot verify, say so and recommend contacting support.\nQuestion: ${question}`);
    res.json({ answer });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Support assistant unavailable" });
  }
};
