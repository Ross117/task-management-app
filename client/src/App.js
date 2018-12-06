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

    // possible to check if update represents an actual change?

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

    await fetch(`/addTask/${newTaskTitle}`, {
      method: "POST"
    })
      .then(() => this.setState({ newTaskTitle: "" }))
      .then(() => this.getAllTasks());
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
          // made a deep copy of the field obj
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
      console.log(error.message);
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
