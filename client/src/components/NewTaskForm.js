import React from "react";
import NewTaskButton from "./NewTaskButton";
import "../css/NewTaskForm.css";

const NewTaskForm = (props) => {
  return (
    <div className="newTaskForm">
      <form>
        <input
          className="newTaskForm__titleInput"
          type="text"
          placeholder="Task Title"
          value={props.newTaskTitle}
          onChange={props.handleNewTaskChange}
        />
        <NewTaskButton postNewTask={props.postNewTask} />
      </form>
    </div>
  );
};

export default NewTaskForm;
