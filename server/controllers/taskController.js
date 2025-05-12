const Task = require("../models/Task");

// GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getTasks, createTask, deleteTask };
