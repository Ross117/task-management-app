import React from "react";
import "../css/Task.css";

function Task(props) {
  const [ id, createdDt, title, desc, completed, scheduledDt, priority ] = props.task;
  const cleanedScheduledDt = (scheduledDt.value ? scheduledDt.value.substring(0, 10) : "");
  
  // need to made sure user can't set required fields to null - js form validation

  // need to test db field limits for task title & task desc fields
  
  // include save button?

  return (
    <div className="task">
      <form id={id.value}>
        <input className="task__title" type="text" name="task_title" value={title.value} onChange={props.updateTask} onBlur={props.putTaskUpdate} />
        <input className="task__completed" type="checkbox" name="task_completed" checked={completed.value} onChange={props.updateTask} />
        <input className="task__desc" type="text" name="task_desc" value={desc.value} onChange={props.updateTask} onBlur={props.putTaskUpdate} />
        <input className="task__scheduledDt" type="date" name="task_scheduled_dt" value={cleanedScheduledDt} onChange={props.updateTask} onBlur={props.putTaskUpdate} />
        <select className="task__priority" name="priority_desc" value={priority.value} onChange={props.updateTask} onBlur={props.putTaskUpdate}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </form>
    </div>
  );
}

export default Task;