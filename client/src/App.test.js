import React from "react";
import App from "./App";
import NewTaskForm from "./components/NewTaskForm";
import Task from "./components/Task";
import { mount } from "enzyme";

// describe what I want to test, not how something will be tested

// can test the API calls? - would this be integration testing?

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
      test("contains anything else that gets rendered", checkAppHasOnlyOneChild);
      test("only contains a <p> element", checkFirstSectionOnlyHasAPEle);
    });
  });

  describe("when the initial GET request returns an error", () => {
    beforeEach(() => {
      app().setState({ error: true });
    });

    test("the App renders a Section element", checkForSectionEle);

    describe("the rendered Section", () => {
      test("contains anything else that gets rendered", checkAppHasOnlyOneChild);
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
      test("contains anything else that gets rendered", checkAppHasOnlyOneChild);
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

        describe("the value of the newTaskTitle prop", () => {
          test("matches the value held in state", () => {
            const newTaskForm = app().find(NewTaskForm);
            expect(newTaskForm.props().newTaskTitle).toEqual(app().state().newTaskTitle);
          });
        });

        describe("when the user updates the value of the input field", () => {
          test("App state is updated accordingly", () => {
            const newTaskForm = app().find(NewTaskForm);
            const update = "A new Task Title";
            newTaskForm.find(".newTaskForm__titleInput").simulate("change", { target: { value: update } });
            expect(app().state().newTaskTitle).toEqual(update);
          });
        });
        
        // test that a new task is added and an updated New Task Form with a blank input field is rendered when the Add Task button is pressed - concern of which component?
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

        test("the number of Task components rendered matches the number of task objects returned by the API", () => {
          const tasks = app().find(Task);
          expect(tasks.length).toEqual(app().state("tasks").length);
        });

        describe("the Task component", () => {
          test("is passed 3 props", () => {
            const task = app().find(Task);
            const props = Object.keys(task.props());
            expect(props.length).toEqual(3);
          });

          describe("the values of the task prop", () => {
            test("match the values held in state", () => {
              const task = app().find(Task);
              expect(task.props().task).toEqual(app().state().tasks[0]);
            });
          });

          describe("when the user updates the values of the component", () => {
            test("App state is updated accordingly", () => {
              // create a function which will allow testing of all input elements (the checkbox input is treated differently by the update function)
               const update = "A new Task Title";
               const task = app().find(Task);
               task.find(".task__title").simulate("change", { target: { name: "task_title", value: update, parentNode: { id: 5 } } });
               const state = app().state().tasks[0];
               expect(state.task_title).toEqual(update);
            });
          });
        });
      });
    });
  });
});
