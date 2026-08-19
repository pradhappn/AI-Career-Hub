const express = require("express");
const multer = require("multer");
const { analyzeRoadmap } = require("../controllers/roadmapController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("resume"), analyzeRoadmap);

module.exports = router;
