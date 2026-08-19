const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER

exports.registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
      return res.status(400).json({ message: "Name, email and a 6-character password are required" });
    }

    const userExists = await User.findOne({
      email
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword
      });

    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);

  } catch (error) {
    res.status(500).json(error);
  }
};


// LOGIN

exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};


// UPDATE PROFILE

exports.updateProfile = async (req, res) => {
  const { name, role, skills } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      ...(name?.trim() ? { name: name.trim() } : {}),
      ...(role?.trim() ? { role: role.trim() } : {}),
      ...(typeof skills === "string" ? { skills: skills.split(",").map((item) => item.trim()).filter(Boolean) } : {})
    },
    { new: true }
  );

  res.json(user);
};