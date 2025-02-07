const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
require("./models/User");
require("./models/Todo");

dotenv.config();

const app = express();

// Middleware
app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todo"));
app.use("/api/users", require("./routes/user"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
