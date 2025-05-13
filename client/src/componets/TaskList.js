// TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, handleDelete }) {
  return (
    <ul style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} handleDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
