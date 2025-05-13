import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./componets/TaskInput";
import TaskList from "./componets/TaskList";
import Header from "./componets/Header";

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
      <Header></Header>
      <TaskInput title={title} setTitle={setTitle} addTask={addTask} />
      <TaskList tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
