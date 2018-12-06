import React from "react";
import NewTaskButton from "./NewTaskButton";
import "../css/NewTaskForm.css";

const NewTaskForm = (props) => { 

  return (
    <div>
      <form>
        <input type="text" placeholder="Task Title" value={props.newTaskTitle} onChange={props.handleNewTaskChange}/>
        <NewTaskButton postNewTask={props.postNewTask}/>
      </form>
    </div>
  );
};

export default NewTaskForm;