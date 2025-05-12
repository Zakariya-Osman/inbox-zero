import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks on load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);
  // delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log("Error deleting task", err);
    }
  };
  // Add new task
  const addTask = async () => {
    if (!title) return;

    console.log("Adding task:", title); // ADD THIS LINE

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
      console.log("Server responded with:", res.data); // ADD THIS TOO

      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err); // This shows what's wrong
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📋 Inbox Zero</h1>
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "0.5rem",
          marginRight: "1rem",
          width: "300px",
          fontSize: "1rem",
        }}
      />
      <button onClick={addTask} style={{ padding: "0.5rem 1rem" }}>
        Add Task
      </button>

      <ul style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.done ? "✅" : ""}
            <button
              onClick={() => handleDelete(task._id)}
              style={{ padding: "0.5rem 1rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
