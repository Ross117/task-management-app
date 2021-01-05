import React, { Component } from "react";
import "../css/SortBy.css";

class SortBy extends Component {
  constructor(props) {
    super();

    this.state = {
      selected: "Created Date (Descending)",
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.refactorSelectValue = this.refactorSelectValue.bind(this);
  }

  refactorSelectValue(selectValue) {
    const lookup = {
      "Created Date": "task_creation_dt",
      "Scheduled Date": "task_scheduled_dt",
    };

    const orderByField = selectValue.split("(")[0].trim();
    const direction = selectValue.split("(")[1].replace(/[)]/, "");

    return {
      orderByField: lookup[orderByField],
      direction,
    };
  }

  onSelectChange(e) {
    const newValue = e.target.value;

    this.setState({ selected: newValue });
  }

  onButtonClick() {
    const sortOrder = this.state.selected;

    this.props.sortTasks(this.refactorSelectValue(sortOrder));
  }

  render() {
    return (
      <div className="sortBy">
        <label className="sortBy__label">
          Sort By:
          <select
            className="sortBy__dropdown"
            value={this.state.selected}
            onChange={this.onSelectChange}
          >
            <option>Created Date (Descending)</option>
            <option>Created Date (Ascending)</option>
            <option>Scheduled Date (Descending)</option>
            <option>Scheduled Date (Ascending)</option>
          </select>
        </label>
        <button
          className="sortBy__button"
          type="button"
          onClick={this.onButtonClick}
        >
          Sort
        </button>
      </div>
    );
  }
}

export default SortBy;
