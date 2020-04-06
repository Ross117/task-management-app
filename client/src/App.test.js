import React from "react";
import App from "./App";
import { mount } from "enzyme";

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

  const sections = app().find('section');

  const checkForSectionEle = () => {
    expect(sections.length).toBeGreaterThan(0);
  }

  describe("when there is an error", () => {
    
    beforeEach(() => {
      app().setState({ error: true });
    });

    test("the App renders a Section element", checkForSectionEle);

    describe("the rendered Section", () => {

      test("contains anything else that gets rendered", () => {
        const expected = 1;
        const acutal = app().children().length;
        expect(acutal).toEqual(expected);
      });

      test("only contains a <p> element", () => {
        const wrappingSection = sections.first();
        const pEle = app().find('p');
        expect(pEle.length).toEqual(wrappingSection.children().length);
      });
    });
  });
  
  describe("when no data has been returned yet but there is no error", () => {
    beforeEach(() => {
      app().setState({ isFetched: false });
      app().setState({ error: null });
    });

  });

  describe("when data has been returned", () => {
    beforeEach(() => {
      app().setState({ isFetched: true });
      app().setState({ error: null });
    });

    // test that the Tasks Container section is rendered
    test("the App renders a Section element", checkForSectionEle);

    // test.todo("everything else is contained within the Section element");

    test("the App renders a New Task Form component", () => {
      const newTaskForm = app().find('.newTaskForm');
      expect(newTaskForm).toHaveLength(1);
    });

    describe("the New Task Form component", () => {

    // test props passed to new task component

    // test that state.newTaskTitle is updated when Task Title is updated

    // test that state.Tasks is updated when a new task is added
    });
  
    describe("when tasks is not empty", () => {
      beforeEach(() => {
        const mockTask = [
          { value: "", metadata: { colName: "task_id" } }, 
          { value: "", metadata: { colName: "task_creation_dt" } }, 
          { value: "", metadata: { colName: "task_title" } }, 
          { value: "", metadata: { colName: "task_desc" } }, 
          { value: "", metadata: { colName: "task_completed" } }, 
          { value: "", metadata: { colName: "task_scheduled_dt" } }, 
          { value: "", metadata: { colName: "priority_desc" } }
        ];
        app().setState({ tasks: [mockTask] });
      });

      test("the App renders a Task component", () => {   
        const tasks = app().find('.task');
        expect(tasks).toHaveLength(1);
      });

      // test number of Tasks matches state.Tasks?

      describe("the Task component", () => {
      
        // test props passed to task component

        // Test that state.Tasks is updated when a Task field is updated
      });
      
    });

  });

  // can test the API calls?
  

});
