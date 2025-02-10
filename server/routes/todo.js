const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// Fetch user-specific todos
router.get("/", authMiddleware, (req, res) => {
  db.all(
    "SELECT * FROM todos WHERE user_id = ?",
    [req.user.id],
    (err, todos) => {
      if (err) return res.status(500).json(err);
      res.json(todos);
    }
  );
});

// Create todo
router.post("/", authMiddleware, (req, res) => {
  const { title } = req.body;
  db.run(
    "INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)",
    [req.user.id, title, false],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, title, completed: false });
    }
  );
});

// Update todo
router.put("/:id", authMiddleware, (req, res) => {
  const { title, completed } = req.body;

  db.run(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: req.params.id, title, completed });
    }
  );
});

// Delete todo
router.delete("/:id", authMiddleware, (req, res) => {
  db.run("DELETE FROM todos WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "Todo deleted" });
  });
});

module.exports = router;
