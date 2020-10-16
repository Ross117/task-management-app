import React, { Component } from "react";
import "../css/SortBy.css";

// now: scheduled date (oldest - newest)

// later: created date (oldest - newest)

// Will need to handle null values - no change if all values are null, if some are null then place these at the bottom regardless of asc or desc

// shouldn't render when there are no tasks (later: what about if no due dates?)

// I think the component should have state - to store which option user has selected

// User option change will fire function which reorders app state

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
    this.props.reorderTasks(newValue);
  }

  render() {
    return (
      <div className="sortBy">
        <label className="sortBy__label">
          Sort By
          <select
            className="sortBy__dropdown"
            value={this.state.selected}
            onChange={this.onChange}
          >
            <option></option>
            <option>Scheduled Date (Ascending)</option>
            <option>Scheduled Date (Descending)</option>
          </select>
        </label>
      </div>
    );
  }
}

export default SortBy;
