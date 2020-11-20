import React, { Component } from "react";
import Task from "./components/Task";
import NewTaskForm from "./components/NewTaskForm";
import SortBy from "./components/SortBy";
import "./css/App.css";
import { encodeUpdateValue, convertToNumber } from "./utilityFunctions";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null,
      isFetched: false,
      tasks: [],
      taskOrder: {
        orderByField: "task_creation_dt",
        direction: "Descending",
      },
      newTaskTitle: "",
    };

    this.getAllTasks = this.getAllTasks.bind(this);
    this.putTaskUpdate = this.putTaskUpdate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
    this.postNewTask = this.postNewTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
  }

  async getAllTasks(newTask) {
    const { orderByField, direction } = this.state.taskOrder;
    const res = await fetch(
      `/allTasks/${orderByField}/${direction}/${newTask}`
    );
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

    if (fieldToUpdate === "task_completed") {
      updateValue = e.target.checked;
    } else if (fieldToUpdate === "task_scheduled_dt") {
      if (e.target.value !== "") {
        updateValue = e.target.value + "T00:00:00.000Z";
      } else {
        updateValue = null;
      }
    } else {
      updateValue = e.target.value;
    }

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

    if (fieldToUpdate === "task_title" || fieldToUpdate === "task_desc") {
      updateValue = encodeUpdateValue(updateValue);
    }

    if (updateValue === "") updateValue = "null";

    fetch(`/amendTask/${taskID}/${fieldToUpdate}/${updateValue}`, {
      method: "PUT",
    });
  }

  async deleteTask(taskID) {
    const response = window.confirm(
      "Are you sure that you want to delete this task?"
    );

    if (response) {
      const res = await fetch(`/deleteTask/${taskID}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        this.getAllTasks(false);
      } 
    }
  }

  handleNewTaskChange(e) {
    const newTaskTitle = e.target.value;

    this.setState({ newTaskTitle });
  }

  async postNewTask() {
    const newTaskTitle = encodeUpdateValue(this.state.newTaskTitle);

    if (newTaskTitle === "") return;

    const res = await fetch(`/addTask/${newTaskTitle}`, {
      method: "POST",
    });

    if (res.status === 200) {
      this.setState({ newTaskTitle: "" });
      this.getAllTasks(true);
    }
  }

  sortTasks(selectValue) {
    const { orderByField, direction } = selectValue;

    const allNulls = this.state.tasks.every((val) => {
      return val[orderByField] === null;
    });

    if (allNulls) return;

    const reorderedTasks = this.state.tasks
      .map((val) => {
        return val;
      })
      .sort((a, b) => {
        const firstVal = convertToNumber(a[orderByField]);
        const secondVal = convertToNumber(b[orderByField]);

        if (firstVal === null && secondVal === null) {
          return (
            convertToNumber(b.task_creation_dt) -
            convertToNumber(a.task_creation_dt)
          );
        }

        if (firstVal === null) {
          return 1;
        }

        if (secondVal === null) {
          return -1;
        }

        if (direction === "Ascending") {
          return firstVal - secondVal;
        }

        if (direction === "Descending") {
          return secondVal - firstVal;
        }

        return 0;
      });

    this.setState({
      tasks: reorderedTasks,
      taskOrder: {
        orderByField,
        direction,
      },
    });
  }

  componentDidMount() {
    this.getAllTasks(false);
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
          {tasks.length > 0 ? <SortBy sortTasks={this.sortTasks} /> : null}
          {tasks}
        </section>
      );
    }
  }
}

export default App;
