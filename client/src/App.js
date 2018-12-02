import React, { Component } from 'react';
import './css/App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      error: null
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
        this.setState({ tasks: res });
      }, 
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default App;