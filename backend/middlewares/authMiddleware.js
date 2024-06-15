const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = { id: user.id, username: user.username, isAdmin: user.isAdmin };
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is invalid or expired" });
  }
};

module.exports = authMiddleware;
