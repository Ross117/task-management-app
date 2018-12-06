import React from "react";
import "../css/NewTaskButton.css";

const NewTaskButton = (props) => {

  return (
    <button type="button" onClick={props.postNewTask}>Add Task</button>
  );
};

export default NewTaskButton;