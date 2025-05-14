// TaskItem.js
import React from "react";

function TaskItem({ task, handleDelete }) {
  return (
    <li>
      {task.title} {task.done ? "✅" : ""}
      <button
        onClick={() => handleDelete(task._id)}
        style={{ padding: "0.5rem 1rem" }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
