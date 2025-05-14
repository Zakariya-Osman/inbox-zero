const express = require("express");
const Task = require("../models/Task");

// Export a function that receives io
module.exports = function (io) {
  const router = express.Router();

  // Get all tasks
  router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  });

  // Add a task
  router.post("/", async (req, res) => {
    const { title } = req.body;
    const newTask = await Task.create({ title });

    const updatedTasks = await Task.find();
    io.emit("taskList", updatedTasks); // 💥 Real-time update

    res.status(201).json(newTask);
  });

  // Delete a task
  router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    const updatedTasks = await Task.find();
    io.emit("taskList", updatedTasks);

    res.sendStatus(204);
  });

  return router; // 👈 Return the router
};
