const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todo-app.db", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database");
});
module.exports = db;
