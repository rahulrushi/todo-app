const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// Fetch all users (Admin only)
router.get("/", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  db.all("SELECT id, name, email, role FROM users", [], (err, users) => {
    if (err) return res.status(500).json(err);
    res.json(users);
  });
});

// Update user (Admin only)
router.put("/:id", async (req, res) => {
  const { name, email, role, password } = req.body;
  const userId = req.params.id;

  // Validate role (only "admin" or "user" allowed)
  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Hash the password if provided
  let hashedPassword = null;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  // Update user in the database
  db.run(
    `UPDATE users 
     SET name = COALESCE(?, name), 
         email = COALESCE(?, email), 
         role = COALESCE(?, role), 
         password = COALESCE(?, password) 
     WHERE id = ?`,
    [name, email, role, hashedPassword, userId],
    function (err) {
      if (err) return res.status(500).json(err);
      if (this.changes === 0) return res.status(404).json({ message: "User not found" });

      res.json({ message: "User updated successfully" });
    }
  );
});

// Delete user (Admin only)
router.delete("/:id", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
});

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4OTU0ODk4LCJleHAiOjE3Mzg5NTg0OTh9.qgDmUCL4WqL57luV-6meYhI14OtHKOcFjjc0jCPxFW0