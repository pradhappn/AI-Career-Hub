const pdf = require("pdf-parse");
const { generateJson } = require("../services/geminiService");

exports.generateStudyMaterial = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Notes file is required" });
    const text = (await pdf(req.file.buffer)).text;
    const prompt = `Create study material from these notes. Return JSON only with summary (string), mcqs (array of {question, options}), flashcards (array of {question, answer}), and quiz (array of {question, options}).\nNotes:\n${text}`;
    res.json(await generateJson(prompt));
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Study material generation failed" });
  }
};
