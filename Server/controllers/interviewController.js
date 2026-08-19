const { generateJson } = require("../services/geminiService");

exports.generateQuestions = async (
req,
res
) => {

try {

const { role } = req.body;
if (!role?.trim()) {
return res.status(400).json({ message: "Role is required" });
}

const prompt = `
Generate 10 interview questions
for ${role}.

Return JSON only.

{
 "questions":[]
}
`;

res.json(await generateJson(prompt));

} catch(error){
res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Question generation failed" });

}

};

exports.evaluateAnswer = async (req, res) => {
	try {
		const { question, answer } = req.body;
		if (!question || !answer?.trim()) {
			return res.status(400).json({ message: "Question and answer are required" });
		}

		const prompt = `Evaluate this interview answer. Return JSON only with score (number 0-10), feedback (string), and improvements (array of strings).\nQuestion: ${question}\nAnswer: ${answer}`;
		res.json(await generateJson(prompt));
	} catch (error) {
		res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Answer evaluation failed" });
	}
};