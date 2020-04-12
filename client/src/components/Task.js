import React from "react";
import "../css/Task.css";

function Task(props) {
  console.log(props.task);
  const {id, creationDt, title, desc, completed, scheduledDt, priority} = props.task;
  const cleanedScheduledDt = scheduledDt
    ? scheduledDt.value.substring(0, 10)
    : "";
  const priorityColour =
    priority === "High" ? "task__priority--high" : "task__priority";

  return (
    <div className="task">
      <form id={id}>
        <input
          className="task__title"
          type="text"
          name="task_title"
          value={title}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__completed"
          type="checkbox"
          name="task_completed"
          checked={completed}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__desc"
          type="text"
          name="task_desc"
          placeholder="..."
          value={desc}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__scheduledDt"
          type="date"
          name="task_scheduled_dt"
          value={cleanedScheduledDt}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <select
          className={priorityColour}
          name="priority_desc"
          value={priority}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </form>
    </div>
  );
}

export default Task;
