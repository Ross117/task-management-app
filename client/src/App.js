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
      newTaskTitle: "",
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
      (data) => {
        this.setState({
          isFetched: true,
          tasks: data,
        });
      },
      (error) => {
        this.setState({
          error,
          isFetched: true,
        });
      }
    );
  };

  putTaskUpdate(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    // need to allow user to delete task desc - currently throws a console error

    this.state.tasks.forEach((val) => {
      if (val.task_id === taskID) updateValue = val[fieldToUpdate];
    });

    if (fieldToUpdate === "task_title" && updateValue === "") return;

    const encodeUpdateValue = (updateValue) => {
      const encodedStr = updateValue
        .replace(/[\n]/g, "%0A")
        .replace(/\//g, "%2f")
        .replace(/\?/g, "%3f");

      return encodedStr;
    };

    if (fieldToUpdate === "task_title" || fieldToUpdate === "task_desc") {
      updateValue = encodeUpdateValue(updateValue);
    }

    console.log(updateValue)

    fetch(`/amendTask/${taskID}/field/${fieldToUpdate}/value/${updateValue}`, {
      method: "PUT",
    });
  }

  postNewTask = async () => {
    const newTaskTitle = this.state.newTaskTitle;
    let biggestTaskID;

    if (newTaskTitle === "") return;

    if (this.state.tasks.length === 0) {
      biggestTaskID = 0;
    } else {
      biggestTaskID = this.state.tasks
        .map((task) => {
          return task.task_id;
        })
        .reduce((acc, val) => {
          if (val > acc) {
            return val;
          } else {
            return acc;
          }
        });
    }

    const newTaskID = biggestTaskID + 1;

    const newTask = {
      task_id: newTaskID,
      task_creation_dt: "",
      task_title: newTaskTitle,
      task_desc: "",
      task_completed: "",
      task_scheduled_dt: "",
      priority_desc: "Low",
    };

    const tasksCopy = JSON.parse(JSON.stringify(this.state.tasks));
    tasksCopy.unshift(newTask);

    this.setState({
      tasks: tasksCopy,
      newTaskTitle: "",
    });

    // what if the addTask API call returned the updated tasks data? Could then use it to setState, triggering re-render

    await fetch(`/addTask/${newTaskTitle}`, {
      method: "POST",
    });
  };

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
      const tasks = this.state.tasks.map((task) => {
        return (
          <Task
            key={task.task_id}
            task={task}
            handleTaskUpdate={this.handleTaskUpdate}
            putTaskUpdate={this.putTaskUpdate}
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
