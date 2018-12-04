import React from "react";
import "../css/Task.css";

function Task(props) {
  const [ id, createdDt, title, desc, completed, scheduledDt, priority ] = props.task;
  const cleanedScheduledDt = (scheduledDt.value ? scheduledDt.value.substring(0, 10) : "");
  
  // need to made sure user can't set required fields to null
  // js form validation?
  // need to test db field limits for task tile & task desc fields


  // can I conditionally render task depending on whether it's been updated?

  return (
    <div className="task" id={id.value}>
      <form>
        <input className="task__title" type="text" name="task_title" defaultValue={title.value} minLength="1" maxLength="100" required/>
        <input className="task__completed" type="checkbox" name="task_completed" checked={completed.value}/>
        <input className="task__desc" type="text" name="task_desc" defaultValue={desc.value} maxLength="250"/>
        <input className="task__scheduledDt" type="date" name="task_scheduled_dt" defaultValue={cleanedScheduledDt}/>
        <select className="task__priority" name="priority_id" defaultValue={priority.value}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </form>
    </div>
  );
}

export default Task;