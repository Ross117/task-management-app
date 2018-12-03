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
  }

  getAllTasks = async () => {
    const res = await fetch("/allTasks");
    const data = await res.json();

    return data;
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
        return <Task key={task[0].value} task={task}/>
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

