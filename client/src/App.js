import React, { Component } from "react";
import Task from "./components/Task";
import "./css/App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetched: false,
      tasks: []
    };
    this.getAllTasks = this.getAllTasks.bind(this);
    this.postTaskUpdate = this.postTaskUpdate.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  getAllTasks = async () => {
    const res = await fetch("/allTasks");
    const data = await res.json();
    return data;
  }

  postTaskUpdate = async () => {
    // const res = await fetch("/amendTask/{taskID}/field/{fieldToUpdate}/value/{newValue}");
    return;
  }

  updateTask(e) {
    e.preventDefault();

    const taskID = Number(e.target.parentNode.id);
    const fieldToUpdate = e.target.name;
    let updateValue;

    if (fieldToUpdate === "task_completed") {
      updateValue = (e.target.checked ? true : false);
    } else {
      updateValue = e.target.value;
    }
    
    const updatedState = this.state.tasks.map( (task) => {
      if (task[0].value === taskID) {
        const updatedTask = task.map( (field) => {
          // made a deep copy of the field obj
          if (field.metadata.colName === fieldToUpdate) {
            const fieldCopy = JSON.parse(JSON.stringify(field));
            fieldCopy.value = updateValue;
            return fieldCopy;
          } else {
            return field;
          }
        });
        return updatedTask;
      } else {
        return task;
      }
    });

    this.setState({tasks: updatedState});
     
    this.postTaskUpdate();
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
      return (
        <section>
          <p>Sorry, something went wrong. Please try again.</p>
          <p>{error.message}</p>
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
        return <Task key={task[0].value} task={task} updateTask={this.updateTask}/>
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

