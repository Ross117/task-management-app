import React from "react";
import "../css/NewTaskButton.css";

const NewTaskButton = (props) => {
  return (
    <button className="newTaskButton" type="button" onClick={props.postNewTask}>
      Add Task
    </button>
  );
};

export default NewTaskButton;
