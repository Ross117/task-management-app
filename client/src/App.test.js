import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Task from "./components/Task";
import NewTaskForm from "./components/NewTaskForm";
import NewTaskButton from "./components/NewTaskButton";

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
    expect(app().children().length).toBe(1);
  };

  const checkFirstSectionOnlyHasAPEle = () => {
    const sections = app().find("section");
    const wrappingSection = sections.first();
    const pEles = app().find("p");
    expect(pEles.length).toBe(wrappingSection.children().length);
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
        expect(newTaskForm.length).toBe(1);
      });

      describe("the New Task Form component", () => {
        test("is passed 3 props", () => {
          const newTaskForm = app().find(NewTaskForm);
          const props = Object.keys(newTaskForm.props());
          expect(props.length).toBe(3);
        });

        describe("the value of the newTaskTitle prop", () => {
          test("matches the value held in state", () => {
            const newTaskForm = app().find(NewTaskForm);
            expect(newTaskForm.props().newTaskTitle).toBe(app().state().newTaskTitle);
          });
        });

        describe("when the user updates the value of the input field", () => {
          test("App state is updated accordingly", () => {
            const newTaskForm = app().find(NewTaskForm);
            const update = "A new Task Title";
            newTaskForm.find(".newTaskForm__titleInput").simulate("change", { target: { value: update } });
            expect(app().state().newTaskTitle).toBe(update);
          });
        });

        describe("when the user clicks the Add Task button", () => {
          test("state is not updated if the Task Title is empty", () => {
            const newTaskButton = app().find(NewTaskButton);
            newTaskButton.simulate("click");
            expect(app().state("tasks").length).toBe(0);
          });

          describe("if the Task Title is not empty", () => {
            beforeEach(() => {
              const newTaskForm = app().find(NewTaskForm);
              const update = "A new Task Title";
              newTaskForm.find(".newTaskForm__titleInput").simulate("change", { target: { value: update } });
              const newTaskButton = app().find(NewTaskButton);
              newTaskButton.find(".newTaskButton").simulate("click");
            });
            test("state is updated with the new task", () => {
              expect(app().state("tasks").length).toBe(1);
            });
            test("the newTaskTitle property held in state is reset to an empty string", () => {
              expect(app().state("newTaskTitle")).toBe("");
            });
          });
        });
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
          expect(tasks.length).toBe(1);
        });

        test("the number of Task components rendered matches the number of task objects returned by the API", () => {
          const tasks = app().find(Task);
          expect(tasks.length).toBe(app().state("tasks").length);
        });

        describe("the Task component", () => {
          test("is passed 3 props", () => {
            const task = app().find(Task);
            const props = Object.keys(task.props());
            expect(props.length).toBe(3);
          });

          describe("the values of the task prop", () => {
            test("reflect the values held in state", () => {
              const task = app().find(Task);
              expect(task.props().task).toBe(app().state().tasks[0]);
            });
          });

          const checkAppStateIsUpdated = (update, selector, name) => {
            const task = app().find(Task);
            const taskID = app().state().tasks[0].task_id;
            name === "task_completed"
              ?  task.find(selector).simulate("change", { target: { name: name, checked: update, parentNode: { id: taskID } } })
              :  task.find(selector).simulate("change", { target: { name: name, value: update, parentNode: { id: taskID } } })
            const state = app().state().tasks[0];
            expect(state[name]).toBe(update);
          };

          describe("when the user updates the value of the Task Scheduled Date input element", () => {
            test("App state is updated accordingly", () => {
              checkAppStateIsUpdated("2020-05-05T01:00:00.000Z", ".task__scheduledDt", "task_scheduled_dt");
            });
          });

          describe("when the user updates the value of the Task Title input element", () => {
            test("App state is updated accordingly", () => {
              checkAppStateIsUpdated("A new Task Title", ".task__title", "task_title");
            });
          });

          describe("when the user updates the value of the Task Desc input element", () => {
            test("App state is updated accordingly", () => {
              checkAppStateIsUpdated("A new Task Description", ".task__desc", "task_desc");
            });
          });

          describe("when the user updates the value of the Task Completed input element", () => {
            test("App state is updated accordingly", () => {
              checkAppStateIsUpdated(true, ".task__completed", "task_completed");
            });
          });

          describe("when the user updates the value of the Priority Desc select element", () => {
            test("App state is updated accordingly", () => {
              checkAppStateIsUpdated("Low", "select[name='priority_desc']", "priority_desc");
            });
          });
        });
      });
    });
  });
});
