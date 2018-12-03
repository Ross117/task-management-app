import React from "react";
import "../css/Task.css";

function Task(props) {
  const title = props.task[2].value;
  const desc = props.task[3].value;
  const completed = props.task[4].value;
  const scheduledDt = props.task[5].value;
  const priority = props.task[6].value;

  return (
    <div>
      <p>{title} {desc}</p>
      <p>{completed} {scheduledDt} {priority}</p>
    </div>
  );
}

export default Task;