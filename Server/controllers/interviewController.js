const { GoogleGenerativeAI } =
require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

exports.generateQuestions = async (
req,
res
) => {

try {

const { role } = req.body;

const model =
genAI.getGenerativeModel({
model: "gemini-2.5-flash"
});

const prompt = `
Generate 10 interview questions
for ${role}.

Return JSON only.

{
 "questions":[]
}
`;

const result =
await model.generateContent(prompt);

let response =
result.response.text();

response = response
.replace("```json","")
.replace("```","")
.trim();

res.json(JSON.parse(response));

} catch(error){

res.status(500).json(error);

}

};