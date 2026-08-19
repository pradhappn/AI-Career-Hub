

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes =
  require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const userRoutes = require("./routes/userRoutes");
const studyRoutes = require("./routes/studyRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const supportRoutes = require("./routes/supportRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/support", supportRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});