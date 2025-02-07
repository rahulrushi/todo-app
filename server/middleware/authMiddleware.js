const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Invalid Token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user details to req
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
