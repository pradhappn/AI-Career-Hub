const express = require("express");
const { askSupport } = require("../controllers/supportController");

const router = express.Router();

router.post("/ask", askSupport);

module.exports = router;
