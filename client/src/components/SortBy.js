import React, { Component } from "react";
import "../css/SortBy.css";

// sort function should be declared in App module & passed as prop? or Declared in SortBy? - I think former because it'll amend (by reordering) App state
// If function is declared in SortBy, can it change state in App?

// ############## done

// when scheduled date is added or removed, and then user attempts to sort immediately after,
// the change doesn't seem to be picked up
// - if it's the same select value, onSelectChange won't fire
// ### added sort button to fix this, just needs styling

// - if it's not the same value, it's because the date is missing trailing zeros (due to state being updated locally & not from the db)
// ### should be fixed now

// how should nulls be ordered among themselves when there're both null & non-null values?
// ### they should now be in task creation date descending order as a default


// ############### to do

// when adding a new task or deleted a task, sort auto reverts to Created Date (Desc)
// do I need to call the this.props.sortTasks on a component lifecycle method?
// add 'Order' property to app state & use it to sort tasks when re-fetching tasks?

// finish styling button

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

    const field = selectValue.substring(0, selectValue.indexOf("(")).trim();

    const direction = selectValue.substring(
      selectValue.indexOf("(") + 1,
      selectValue.indexOf(")")
    );

    return {
      field: lookup[field],
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
        <button className="sortBy__button" onClick={this.onButtonClick}>
          Sort
        </button>
      </div>
    );
  }
}

export default SortBy;
