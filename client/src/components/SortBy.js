import React, { Component } from "react";
import "../css/SortBy.css";

// need a way of returning to default order

// later: created date (oldest - newest) 

// shouldn't render when there are no tasks? (later: what about if no due dates?)

// sort function should be declared in App module & passed as prop? or Declared in SortBy? - I think former because it'll amend (by reordering) App state

// If function is declared in SortBy, can it change state in App?

class SortBy extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const newValue = e.target.value;
    this.setState({ selected: newValue });
    this.props.sortTasks(newValue);
  }

  render() {
    return (
      <div className="sortBy">
        <label className="sortBy__label">
          Sort By:
          <select
            className="sortBy__dropdown"
            value={this.state.selected}
            onChange={this.onChange}
          >
            <option>Select</option>
            <option>Scheduled Date (Ascending)</option>
            <option>Scheduled Date (Descending)</option>
          </select>
        </label>
      </div>
    );
  }
}

export default SortBy;
