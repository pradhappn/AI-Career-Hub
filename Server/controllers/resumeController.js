const pdf = require("pdf-parse");
const { GoogleGenerativeAI } =
  require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

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

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

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

    const result =
      await model.generateContent(
        prompt
      );

    let response =
      result.response.text();

    response = response
      .replace("```json", "")
      .replace("```", "")
      .trim();

    const parsed =
      JSON.parse(response);

    res.json(parsed);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Analysis failed"
    });
  }
};