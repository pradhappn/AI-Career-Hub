const express = require("express");
const router = express.Router();

const {
  generateQuestions,
  evaluateAnswer
} = require("../controllers/interviewController");

router.post("/generate", generateQuestions);

router.post("/evaluate", evaluateAnswer);

module.exports = router;