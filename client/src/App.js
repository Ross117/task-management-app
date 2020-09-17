import React, { Component } from "react";
import Task from "./components/Task";
import NewTaskForm from "./components/NewTaskForm";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null,
      isFetched: false,
      tasks: [],
      newTaskTitle: "",
    };

    this.getAllTasks = this.getAllTasks.bind(this);
    this.putTaskUpdate = this.putTaskUpdate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.postNewTask = this.postNewTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async getAllTasks() {
    const res = await fetch("/allTasks");
    try {
      const data = await res.json();
      this.setState({
        isFetched: true,
        tasks: data,
      });
    } catch (error) {
      this.setState({
        error,
        isFetched: true,
      });
    }
  }

  handleTaskUpdate(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    updateValue =
      fieldToUpdate === "task_completed" ? e.target.checked : e.target.value;

    const updatedTaskState = this.state.tasks.map((task) => {
      const updateTask = (task) => {
        const taskCopy = JSON.parse(JSON.stringify(task));
        taskCopy[fieldToUpdate] = updateValue;

        return taskCopy;
      };

      if (task.task_id === taskID) {
        return updateTask(task);
      } else {
        return task;
      }
    });

    this.setState({ tasks: updatedTaskState });
  }

  putTaskUpdate(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    this.state.tasks.forEach((val) => {
      if (val.task_id === taskID) updateValue = val[fieldToUpdate];
    });

    if (fieldToUpdate === "task_title" && updateValue === "") return;

    const encodeUpdateValue = (updateValue) => {
      const encodedStr = updateValue
        .replace(/%/g, "%25")
        .replace(/[\n]/g, "%0A")
        .replace(/\//g, "%2f")
        .replace(/\\/g, "%5C")
        .replace(/\?/g, "%3f")
        .replace(/'/g, "''")
        .replace(/#/g, "%23");

      return encodedStr;
    };

    if (fieldToUpdate === "task_title" || fieldToUpdate === "task_desc") {
      updateValue = encodeUpdateValue(updateValue);

      if (updateValue === "") updateValue = "NULL";
    }

    fetch(`/amendTask/${taskID}/field/${fieldToUpdate}/value/${updateValue}`, {
      method: "PUT",
    });
  }

  async deleteTask(e) {
    const response = window.confirm(
      "Are you sure that you want to delete this task?"
    );

    if (response) {
      const taskID = Number(e.target.parentNode.id);
      await fetch(`/deleteTask/${taskID}`, {
        method: "DELETE",
      });
      this.getAllTasks();
    }
  }

  handleNewTaskChange(e) {
    const newTaskTitle = e.target.value;

    this.setState({ newTaskTitle });
  }

  async postNewTask() {
    const newTaskTitle = this.state.newTaskTitle;

    if (newTaskTitle === "") return;

    await fetch(`/addTask/${newTaskTitle}`, {
      method: "POST",
    });

    this.setState({ newTaskTitle: "" });
    this.getAllTasks();
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
      const tasks = this.state.tasks.map((task) => {
        return (
          <Task
            key={task.task_id}
            task={task}
            handleTaskUpdate={this.handleTaskUpdate}
            putTaskUpdate={this.putTaskUpdate}
            deleteTask={this.deleteTask}
          />
        );
      });
      return (
        <section className="tasksContainer">
          <NewTaskForm
            newTaskTitle={this.state.newTaskTitle}
            handleNewTaskChange={this.handleNewTaskChange}
            postNewTask={this.postNewTask}
          />
          {tasks}
        </section>
      );
    }
  }
}

export default App;
