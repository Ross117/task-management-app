import React from "react";
import "../css/DeleteTaskButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteTaskButton = (props) => {
  return (
    <button
      className="deleteTaskButton"
      type="button"
      onClick={() => props.deleteTask(props.taskID)}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteTaskButton;
