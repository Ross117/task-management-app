import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("the App", () => {

  const app = mount(<App />);
  const mockTask = [
    { value: "", metadata: { colName: "task_id" } }, 
    { value: "", metadata: { colName: "task_creation_dt" } }, 
    { value: "", metadata: { colName: "task_title" } }, 
    { value: "", metadata: { colName: "task_desc" } }, 
    { value: "", metadata: { colName: "task_completed" } }, 
    { value: "", metadata: { colName: "task_scheduled_dt" } }, 
    { value: "", metadata: { colName: "priority_desc" } }
  ];
    
  test("state.Tasks is updated", () => {
    app.setState({ tasks: [mockTask]});
    expect(app.state().tasks).toHaveLength(1);
  });
      
  test("the App renders the Task components", () => {
    // expect number of rendered Task components to equal this.state.tasks array length  
    app.setState({ isFetched: true });
    app.update()
    const tasksContainer = app.find('.tasksContainer');

    expect(tasksContainer.find('.task')).toHaveLength(1);
  });
  
});
