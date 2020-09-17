import React from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import "../css/Task.css";

const Task = (props) => {
  const {
    task_id,
    task_title,
    task_desc,
    task_completed,
    task_scheduled_dt,
    priority_desc,
  } = props.task;
  const cleanedScheduledDt = task_scheduled_dt
    ? task_scheduled_dt.substring(0, 10)
    : "";
  const priorityColour =
    priority_desc === "High" ? "task__priority--high" : "task__priority";
  return (
    <div className="task">
      <form id={task_id} autoComplete="off">
        <input
          className="task__title"
          type="text"
          name="task_title"
          value={task_title}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__completed"
          type="checkbox"
          name="task_completed"
          checked={task_completed}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <textarea
          className="task__desc"
          type="text"
          name="task_desc"
          rows="3"
          cols="20"
          placeholder="..."
          value={task_desc}
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
          value={priority_desc}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <DeleteTaskButton deleteTask={props.deleteTask} taskID={task_id} />
      </form>
    </div>
  );
};

export default Task;
