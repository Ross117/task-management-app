import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("the App", () => {

  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(<App />);
    }
    return mountedApp;
  };

  beforeEach(() => {
    mountedApp = undefined;
  });
  
  // test what happens when isFetched is false

  // test what happens when Error is true

  // test that the Tasks Container section is rendered
  test("the App renders a section element", () => {
    app().setState({ isFetched: true });
    const sections = app().find('section');
    expect(sections.length).toBeGreaterThan(0);
  }); 

  describe("the New Task Form component", () => {
    test("the App renders a New Task Form component", () => {
      app().setState({ isFetched: true });
      const newTaskForm = app().find('.newTaskForm');
      expect(newTaskForm).toHaveLength(1);
    });

    // test props passed to new task component
  });
  
  describe("the Task component", () => {
    test("the App renders a Task component", () => {
      const mockTask = [
        { value: "", metadata: { colName: "task_id" } }, 
        { value: "", metadata: { colName: "task_creation_dt" } }, 
        { value: "", metadata: { colName: "task_title" } }, 
        { value: "", metadata: { colName: "task_desc" } }, 
        { value: "", metadata: { colName: "task_completed" } }, 
        { value: "", metadata: { colName: "task_scheduled_dt" } }, 
        { value: "", metadata: { colName: "priority_desc" } }
      ];
      app().setState({ isFetched: true });
      app().setState({ tasks: [mockTask] });
      const tasks = app().find('.task');
      expect(tasks).toHaveLength(1);
    });

    // test number of Tasks matches state.Tasks?
    
    // test props passed to task component
  });

});
