const { generateText } = require("../services/geminiService");

exports.askMentor =
async (req,res) => {

try {

const { question } =
req.body;

const answer = await generateText(question);

res.json({
answer
});

} catch(error){
res.status(error.statusCode || 500).json({ message: error.statusCode === 503 ? error.message : "Mentor unavailable" });

}

};