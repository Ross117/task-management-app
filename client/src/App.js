import React, { Component } from "react";
import Task from "./components/Task";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetched: false,
      tasks: [],
      addTask: false
    };
    
    this.getAllTasks = this.getAllTasks.bind(this);
    this.putTaskUpdate = this.putTaskUpdate.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  getAllTasks = async () => {
    const res = await fetch("/allTasks");
    const data = await res.json();
    return data;
  }

  putTaskUpdate(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    if(fieldToUpdate === "task_title" && updateValue === "") return;

    // possible to check if update represents an actual change?

    updateValue = (fieldToUpdate === "task_completed" ? (e.target.checked ? 1 : 0) : e.target.value);

    fetch(`/amendTask/${taskID}/field/${fieldToUpdate}/value/${updateValue}`, {
      method: 'PUT'
    });
  }

  updateTask(e) {
    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;
     
    updateValue = (fieldToUpdate === "task_completed" ? (e.target.checked ? 1 : 0) : e.target.value);

    const updateTaskfield = (field) => {
      if (field.metadata.colName === fieldToUpdate) {
        // made a deep copy of the field obj
        const fieldCopy = JSON.parse(JSON.stringify(field));
        fieldCopy.value = updateValue;
        return fieldCopy;
      } else {
        return field;
      }
    };
    
    const updatedTaskState = this.state.tasks.map( (task) => {
      if (task[0].value === taskID) {
        return task.map(updateTaskfield);
      } else {
        return task;
      }
    });

    this.setState({tasks: updatedTaskState});
  }

  componentDidMount() {
    this.getAllTasks()
      .then(
        (data) => {
        this.setState({
          isFetched: true, 
          tasks: data
        });
      }, 
      (error) => {
        this.setState({
          error,
          isFetched: true
        });
      }
    )
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
      const tasks = this.state.tasks.map( (task) => {
        return <Task key={task[0].value} task={task} updateTask={this.updateTask} putTaskUpdate={this.putTaskUpdate}/>
      });
      return (
        <section className="tasksContainer">
          {tasks}
        </section>
      );
    }
  }
}

export default App;

