const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

dotenv.config(); // loads environment variables

const app = express();
app.use(cors()); // enables CORS for all routes
app.use(express.json()); // allows us to read JSON from requests

connectDB(); // connect to MongoDB

app.use("/api/tasks", taskRoutes); // mount our task routes

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
