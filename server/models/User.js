const db = require("../config/db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK(role IN ('user', 'admin')) DEFAULT 'user'
    )
  `);
});

module.exports = db;
