import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
const API = process.env.REACT_APP_SERVER_LINK;
const socket = io(API);

// ✅ Add these for debugging
console.log("✅ Socket object created:", socket);

socket.on("connect", () => {
  console.log("🔌 Socket connected to server (ID):", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Initial fetch error:", err));

    socket.on("taskList", (updatedTasks) => {
      console.log("🔥 Received taskList from server:", updatedTasks);
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("taskList"); // ✅ Just remove listener, keep connection alive
    };
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      console.log("➕ Adding task:", title);
      await axios.post(`${API}/api/tasks`, { title });
      setTitle(""); // just clear input, don't touch tasks list!
    } catch (err) {
      console.error("❌ Error adding task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("🗑️ Deleting task:", id);
      await axios.delete(`${API}/api/tasks/${id}`);
      // Don't update task state here — wait for the socket to do it
    } catch (err) {
      console.log("❌ Error deleting task", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Header />
      <TaskInput title={title} setTitle={setTitle} addTask={addTask} />
      <TaskList tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
