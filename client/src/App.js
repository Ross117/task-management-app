import React, { Component } from "react";
import Task from "./components/Task";
import NewTaskForm from "./components/NewTaskForm";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetched: false,
      tasks: [],
      newTaskTitle: ""
    };

    this.getAllTasks = this.getAllTasks.bind(this);
    this.putTaskUpdate = this.putTaskUpdate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.postNewTask = this.postNewTask.bind(this);
  }

  getAllTasks = async () => {
    const res = await fetch("/allTasks");
    await res.json().then(
      data => {
        this.setState({
          isFetched: true,
          tasks: data
        });
      },
      error => {
        this.setState({
          error,
          isFetched: true
        });
      }
    );
  };

  putTaskUpdate(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    if (fieldToUpdate === "task_title" && updateValue === "") return;

    updateValue =
      fieldToUpdate === "task_completed"
        ? e.target.checked
          ? 1
          : 0
        : e.target.value;
    
    fetch(`/amendTask/${taskID}/field/${fieldToUpdate}/value/${updateValue}`, {
      method: "PUT"
    });
  }

  postNewTask = async () => {
    const newTaskTitle = this.state.newTaskTitle;

    if (newTaskTitle === "") return;

    const biggestTaskID = this.state.tasks.map(task => {
      return task[0].value;
    }).reduce((acc, val) => {
      if (val > acc) {
        return val;
      } else {
        return acc;
      } 
    });

    const newTaskID = biggestTaskID + 1;

    const newTask = [
      { value: newTaskID, metadata: { colName: "task_id" } }, 
      { value: "", metadata: { colName: "task_creation_dt" } }, 
      { value: newTaskTitle, metadata: { colName: "task_title" } }, 
      { value: "", metadata: { colName: "task_desc" } }, 
      { value: "", metadata: { colName: "task_completed" } }, 
      { value: "", metadata: { colName: "task_scheduled_dt" } }, 
      { value: "", metadata: { colName: "priority_desc" } }
    ];
    
    const tasksCopy = JSON.parse(JSON.stringify(this.state.tasks));
    tasksCopy.push(newTask);
    
    this.setState({ tasks: tasksCopy });
    this.setState({ newTaskTitle: "" });

    // what if the addTask API call returned the updated tasks data? Could then use it tp setState, triggering re-render

    await fetch(`/addTask/${newTaskTitle}`, {
      method: "POST"
    });
  };

  handleTaskUpdate(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    updateValue =
      fieldToUpdate === "task_completed"
        ? e.target.checked
          ? 1
          : 0
        : e.target.value;

    const updatedTaskState = this.state.tasks.map(task => {
      const updateTaskfield = field => {
        if (field.metadata.colName === fieldToUpdate) {
          // made a deep copy of the field obj to prevent accidental state mutation

          const fieldCopy = JSON.parse(JSON.stringify(field));
          fieldCopy.value = updateValue;
          return fieldCopy;
        } else {
          return field;
        }
      };

      if (task[0].value === taskID) {
        return task.map(updateTaskfield);
      } else {
        return task;
      }
    });

    this.setState({ tasks: updatedTaskState });
  }

  handleNewTaskChange(e) {
    const newTaskTitle = e.target.value;

    this.setState({ newTaskTitle });
  }

  componentDidMount() {
    this.getAllTasks();
  }

  render() {
    const { error, isFetched } = this.state;
    if (error) {
      return (
        <section>
          <p>Sorry, something went wrong. Please try again.</p>
        </section>
      );
    } else if (!isFetched) {
      return (
        <section>
          <p>Your tasks are loading...</p>
        </section>
      );
    } else {
      const tasks = this.state.tasks.map(task => {
        return (
          <Task
            key={task[0].value}
            task={task}
            handleTaskUpdate={this.handleTaskUpdate}
            putTaskUpdate={this.putTaskUpdate}
          />
        );
      });
      return (
        <section className="tasksContainer">
          {tasks}
          <NewTaskForm
            newTaskTitle={this.state.newTaskTitle}
            handleNewTaskChange={this.handleNewTaskChange}
            postNewTask={this.postNewTask}
          />
        </section>
      );
    }
  }
}

export default App;
