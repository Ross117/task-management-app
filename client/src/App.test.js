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
  const checkForSectionEle = () => {
    const sections = app().find('section');
    expect(sections.length).toBeGreaterThan(0);
  }

  beforeEach(() => {
    mountedApp = undefined;
  });

  describe("when error is not null", () => {
    beforeEach(() => {
      app().setState({ error: true });
    });

    test("the App renders a Section element", checkForSectionEle);

    describe("the rendered Section", () => {

      test("it contains everything else that gets rendered", () => {

      });

    });

    test("a <p> element is the only other element which is rendered", () => {

    });

    describe("the <p> element", () => {

      test("a <p> element containing a message informing the user of the error is rendered", () => {
        const pEle = app().find('p');
        expect(pEle.text()).toBe("Sorry, something went wrong. Please try again.");
      });
    
    })
  
  });
  
  describe("when isFetched is false and error is null", () => {
    beforeEach(() => {
      app().setState({ isFetched: false });
      app().setState({ error: null });
    });

  });

  describe("when isFetched is true and error is null", () => {
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
