const pdf = require("pdf-parse");
const { generateJson } = require("../services/geminiService");

exports.analyzeRoadmap = async (req, res) => {
  try {
    const { role, skills = "" } = req.body;
    if (!role?.trim()) return res.status(400).json({ message: "Target role is required" });

    let resumeText = "";
    if (req.file) resumeText = (await pdf(req.file.buffer)).text;
    const prompt = `Analyze a candidate for the target role ${role}. Return JSON only with skillMatch (number 0-100), jobReadiness (number 0-100), missingSkills (array), projects (array of strings), and roadmap (array of objects with title and description). Current skills: ${skills}. Resume text: ${resumeText}`;
    res.json(await generateJson(prompt));
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Roadmap analysis failed" });
  }
};
