import React from "react";
import App from "./App";
import NewTaskForm from "./components/NewTaskForm";
import Task from "./components/Task";
import { mount } from "enzyme";

// describe what I want to test, not how something will be tested

describe("the App component", () => {
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

  const checkForSectionEle = () => {
    const sections = app().find("section");
    expect(sections.length).toBeGreaterThan(0);
  };

  const checkAppHasOnlyOneChild = () => {
    expect(app().children().length).toEqual(1);
  };

  const checkFirstSectionOnlyHasAPEle = () => {
    const sections = app().find("section");
    const wrappingSection = sections.first();
    const pEles = app().find("p");
    expect(pEles.length).toEqual(wrappingSection.children().length);
  };

  describe("while the initial GET request hasn't yet completed", () => {
    beforeEach(() => {
      app().setState({ isFetched: false });
      app().setState({ error: null });
    });

    test("the App renders a Section element", checkForSectionEle);

    describe("the rendered Section", () => {
      test(
        "contains anything else that gets rendered",
        checkAppHasOnlyOneChild
      );

      test("only contains a <p> element", checkFirstSectionOnlyHasAPEle);
    });
  });

  describe("when the initial GET request returns an error", () => {
    beforeEach(() => {
      app().setState({ error: true });
    });

    test("the App renders a Section element", checkForSectionEle);

    describe("the rendered Section", () => {
      test(
        "contains anything else that gets rendered",
        checkAppHasOnlyOneChild
      );

      test("only contains a <p> element", checkFirstSectionOnlyHasAPEle);
    });
  });

  describe("when the initial GET request completes successfully", () => {
    beforeEach(() => {
      app().setState({ isFetched: true });
      app().setState({ error: null });
    });

    test("the App renders a Section element", checkForSectionEle);

    describe("the rendered Section", () => {
      test(
        "contains anything else that gets rendered",
        checkAppHasOnlyOneChild
      );

      test("always includes a New Task Form component", () => {
        const newTaskForm = app().find(NewTaskForm);
        expect(newTaskForm.length).toEqual(1);
      });

      describe("the New Task Form component", () => {
        test("is passed 3 props", () => {
          const newTaskForm = app().find(NewTaskForm);
          const props = Object.keys(newTaskForm.props());
          expect(props.length).toEqual(3);
        });

        // test that state.newTaskTitle is updated when Task Title is updated - concern of which component?
        // test that state.Tasks is updated when a new task is added - concern of which component?
      });

      describe("when a Task is returned by the initial GET request", () => {
        beforeEach(() => {
          const mockTask = {
            task_id: 5,
            task_creation_dt: "2020-03-30T14:24:21.437Z",
            task_title: "Finish French Homework",
            task_desc: "Involves some verb conjugation",
            task_completed: false,
            task_scheduled_dt: "2020-04-25T00:00:00.000Z",
            priority_desc: "High",
          };
          app().setState({ tasks: [mockTask] });
        });

        test("a Task component is rendered", () => {
          const tasks = app().find(Task);
          expect(tasks.length).toEqual(1);
        });

        test("the number of Task components rendered reflects the number of task objects returned by the API", () => {
          const tasks = app().find(Task);
          expect(tasks.length).toEqual(app().state("tasks").length);
        });

        describe("the Task component", () => {
          test("is passed 3 props", () => {
            const task = app().find(Task);
            const props = Object.keys(task.props());
            expect(props.length).toEqual(3);
          });

          // test values of props passed to Task (could use a mock props object)?

          // Test that state.Tasks is updated when a Task field is updated - concern of which component?
        });
      });
    });
  });

  // can test the API calls? - would this be integration testing?
});
