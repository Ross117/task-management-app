import React from "react";
import "../css/Task.css";

function Task(props) {
  const [ id, createdDt, title, desc, isCompleted, scheduledDt, priority ] = props.task;
  
  return (
    <div>
      <h2>{title.value}</h2>
      <p>{desc.value}</p>
      <p>{isCompleted.value} {scheduledDt.value} {priority.value}</p>
    </div>
  );
}

export default Task;