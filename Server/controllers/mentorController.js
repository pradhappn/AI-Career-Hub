const {
GoogleGenerativeAI
} =
require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

exports.askMentor =
async (req,res) => {

try {

const { question } =
req.body;

const model =
genAI.getGenerativeModel({
model:"gemini-2.5-flash"
});

const result =
await model.generateContent(
question
);

const answer =
result.response.text();

res.json({
answer
});

} catch(error){

res.status(500).json(error);

}

};