const express = require("express");

const router = express.Router();

const {
askMentor
} = require("../controllers/mentorController");

router.post(
"/ask",
askMentor
);

module.exports = router;