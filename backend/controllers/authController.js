const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "User creation failed", details: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ 
      message: "Signin successful", 
      token, 
      user: {
        id: user.id,
        email: user.email,
        username: user.username // Explicitly include the username in the response
      } 
    });
  } catch (error) {
    res.status(500).json({ error: "Signin failed", details: error.message });
  }
};


exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed", details: error.message });
  }
};
