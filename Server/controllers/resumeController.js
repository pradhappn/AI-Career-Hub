const pdf = require("pdf-parse");
const { generateJson } = require("../services/geminiService");

exports.analyzeResume = async (
  req,
  res
) => {
  try {

    if (!req.file) {
      return res
        .status(400)
        .json({
          message: "Resume required"
        });
    }

    const pdfData =
      await pdf(req.file.buffer);

    const resumeText =
      pdfData.text;

    const prompt = `
Analyze this resume.

Return ONLY JSON.

{
  "atsScore": number,
  "skills": [],
  "missingSkills": [],
  "strengths": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    res.json(await generateJson(prompt));

  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Analysis failed" });
  }
};