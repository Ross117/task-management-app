import React from "react";
import "../css/Task.css";

function Task(props) {
  const [ id, createdDt, title, desc, isCompleted, scheduledDt, priority ] = props.task;
  const cleanedScheduledDt = (scheduledDt.value ? scheduledDt.value.substring(0, 10) : "");
  
  // think Task should be a form made up of input eles to allow edits

  return (
    <div className="task">
      <h2 className="task__title">{title.value}</h2>
      <input className="task__isCompleted" type="checkbox" checked={isCompleted.value}/>
      <p className="task__desc">{desc.value}</p>
      <p>
        <span className="task__scheduledDt">{cleanedScheduledDt}</span>
        <span className="task__priority">{priority.value}</span>
      </p>
    </div>
  );
}

export default Task;