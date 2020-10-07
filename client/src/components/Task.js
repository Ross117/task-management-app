import React from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import "../css/Task.css";

const Task = (props) => {
  const {
    task_id: taskID,
    task_title: taskTitle,
    task_desc: taskDesc,
    task_completed: taskCompleted,
    task_scheduled_dt: taskScheduledDt,
    priority_desc: priorityDesc,
  } = props.task;
  const cleanedScheduledDt = taskScheduledDt
    ? taskScheduledDt.substring(0, 10)
    : "";
  const priorityColour =
    priorityDesc === "High" ? "task__priority--high" : "task__priority";
  return (
    <div className="task">
      <form id={taskID} autoComplete="off">
        <input
          className="task__title"
          type="text"
          name="task_title"
          value={taskTitle}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        />
        <input
          className="task__completed"
          type="checkbox"
          name="task_completed"
          checked={taskCompleted}
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
          value={taskDesc}
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
          value={priorityDesc}
          onChange={props.handleTaskUpdate}
          onBlur={props.putTaskUpdate}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <DeleteTaskButton deleteTask={props.deleteTask} taskID={taskID} />
      </form>
    </div>
  );
};

export default Task;
