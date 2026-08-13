const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile
} = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.put(
  "/update",
  auth,
  updateProfile
);

module.exports = router;