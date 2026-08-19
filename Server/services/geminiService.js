const { GoogleGenerativeAI } = require("@google/generative-ai");

const getModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error("GEMINI_API_KEY is not configured");
    error.statusCode = 503;
    throw error;
  }

  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  });
};

const parseJsonResponse = (text) => {
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

const generateJson = async (prompt) => {
  const result = await getModel().generateContent(prompt);
  return parseJsonResponse(result.response.text());
};

const generateText = async (prompt) => {
  const result = await getModel().generateContent(prompt);
  return result.response.text();
};

module.exports = { generateJson, generateText };
