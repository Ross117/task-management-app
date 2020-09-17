import React from "react";
import "../css/DeleteTaskButton.css";

const DeleteTaskButton = (props) => {
  return(
    <button className="deleteTaskButton" type="button" onClick={props.deleteTask}>
      X
    </button>
  );
};

export default DeleteTaskButton;