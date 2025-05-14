const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ allow your React frontend
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

app.use("/api/tasks", taskRoutes(io));

// ✅ Export io for use in routes
module.exports.io = io;

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
