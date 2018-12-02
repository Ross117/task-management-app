import React, { Component } from 'react';
import './css/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      fetched: false,
      tasks: [],
      
    };
  }

  getAllTasks = async () => {
    const res = await fetch("/allTasks");
    const body = await res.json();

    return body;
  }

  componentDidMount() {
    this.getAllTasks()
      .then(
        (res) => {
        this.setState({
          fetched: true, 
          tasks: res[0] 
        });
      }, 
      (error) => {
        this.setState({
          error,
          fetched: true
        });
      }
    )
  }

  render() {
    if (this.state.fetched) {
      const tasks = this.state.tasks;

      return (
        <div>
          {tasks[0].value}
          {tasks[1].value}
          {tasks[2].value}
          {tasks[3].value}
          {tasks[4].value}
          {tasks[5].value}
          {tasks[6].value}
        </div>
      );
    } else {
      return (
        <div>
          Your tasks are loading...
        </div>
      );
    }
  }
}

export default App;