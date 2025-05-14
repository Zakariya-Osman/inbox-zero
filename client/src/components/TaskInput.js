// TaskInput.js
import React from "react";

function TaskInput({ title, setTitle, addTask }) {
  return (
    <>
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
    </>
  );
}

export default TaskInput;
