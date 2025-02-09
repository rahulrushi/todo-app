const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();
require("dotenv").config();
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
    [name, email, hashedPassword], 
    function (err) {
      if (err) return res.status(400).json({ error: "User already exists" });
      res.json({ id: this.lastID, name, email });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  });
});

// Get Authenticated User
router.get("/me", authMiddleware, (req, res) => {
  db.get("SELECT id, name, email, role FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  });
});

module.exports = router;