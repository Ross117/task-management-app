import React from "react";
import { mount } from "enzyme";
import Task from "./Task";
import DeleteTaskButton from "./DeleteTaskButton";

describe("the Task component", () => {
  let mountedTask;
  let props;

  const task = () => {
    if (!mountedTask) {
      mountedTask = mount(<Task {...props} />);
    }
    return mountedTask;
  };

  beforeEach(() => {
    mountedTask = undefined;
    props = {
      task: {
        task_id: 5,
        task_creation_dt: "2020-03-30T14:24:21.437Z",
        task_title: "Finish French Homework",
        task_desc: "Involves some verb conjugation",
        task_completed: false,
        task_scheduled_dt: "2020-04-25T00:00:00.000Z",
        priority_desc: "High",
      },
      handleTaskUpdate: jest.fn(),
      putTaskUpdate: jest.fn(),
    };
  });

  describe("when the component is rendered", () => {
    test("it returns a div", () => {
      const div = task().find("div");
      expect(div.length).toBe(1);
    });

    describe("the div", () => {
      test("includes all the other elements which make up the component", () => {
        expect(task().children().length).toBe(1);
      });
      test("contains a form", () => {
        const form = task().find("form");
        expect(form.length).toBe(1);
      });

      describe("the form", () => {
        test("contains 3 input elements", () => {
          const form = task().find("form");
          expect(form.children("input").length).toBe(3);
        });
        test("contains 1 textarea element", () => {
          const form = task().find("form");
          expect(form.children("textarea").length).toBe(1);
        });
        test("contains 1 select element", () => {
          const form = task().find("form");
          expect(form.children("select").length).toBe(1);
        });
        test("contains a Delete Task Button component", () => {
          const form = task().find("form");
          expect(form.find(DeleteTaskButton).length).toBe(1);
        });
      });
    });

    const checkEventTriggersFnCall = (selector, event, fn) => {
      const ele = task().find(selector);
      ele.simulate(event);
      expect(props[fn]).toHaveBeenCalled();
    };

    describe("the Task Scheduled Date input element", () => {
      test("has a value which matches a substring of the task.task_scheduled_dt prop", () => {
        const taskSchdDtInput = task().find(".task__scheduledDt");
        const taskSchdDtProp = task().props().task.task_scheduled_dt
          .substring(0, 10);
        expect(taskSchdDtInput.props().value).toBe(taskSchdDtProp);
      });

      describe("when the onChange event is fired", () => {
        test("the handleTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__scheduledDt", "change", "handleTaskUpdate");
        });
      });

      describe("when the onBlur event is fired", () => {
        test("the putTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__scheduledDt", "blur", "putTaskUpdate");
        });
      });
    });

    describe("the Task Title input element", () => {
      test("has a value which matches the task.task_title prop", () => {
        const taskTitleInput = task().find(".task__title");
        const taskTitleProp = task().props().task.task_title;
        expect(taskTitleInput.props().value).toBe(taskTitleProp);
      });

      describe("when the onChange event is fired", () => {
        test("the handleTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__title", "change", "handleTaskUpdate");
        });
      });

      describe("when the onBlur event is fired", () => {
        test("the putTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__title", "blur", "putTaskUpdate");
        });
      });
    });

    describe("the Task Desc textarea element", () => {
      test("has a value which matches the task.task_desc prop", () => {
        const taskDescInput = task().find(".task__desc");
        const taskDescProp = task().props().task.task_desc;
        expect(taskDescInput.props().value).toBe(taskDescProp);
      });

      describe("when the onChange event is fired", () => {
        test("the handleTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__desc", "change", "handleTaskUpdate");
        });
      });

      describe("when the onBlur event is fired", () => {
        test("the putTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__desc", "blur", "putTaskUpdate");
        });
      });
    });

    describe("the Task Completed input element", () => {
      test("has a value which matches the task.task_completed prop", () => {
        const taskCompInput = task().find(".task__completed");
        const taskCompProp = task().props().task.task_completed;
        expect(taskCompInput.props().checked).toBe(taskCompProp);
      });

      describe("when the onChange event is fired", () => {
        test("the handleTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__completed", "change", "handleTaskUpdate");
        });
      });

      describe("when the onBlur event is fired", () => {
        test("the putTaskUpdate function is called", () => {
          checkEventTriggersFnCall(".task__completed", "blur", "putTaskUpdate");
        });
      });
    });

    describe("the Priority Desc select element", () => {
      test("has a class name of 'task__priority--high' if the value of the priority_desc prop is 'high'", () => {
        const priorityDescSelect = task().find("select[name='priority_desc']");
        expect(priorityDescSelect.props().className).toBe("task__priority--high");
      });

      test("has a class name of 'task__priority' if the value of the priority_desc prop is not 'high'", () => {
        props.task.priority_desc = "Low";
        const priorityDescSelect = task().find("select[name='priority_desc']");
        expect(priorityDescSelect.props().className).toBe("task__priority");
      });

      test("has a value which matches the task.priority_desc prop", () => {
        const priorityDescSelect = task().find("select[name='priority_desc']");
        const priorityDescProp = task().props().task.priority_desc;
        expect(priorityDescSelect.props().value).toBe(priorityDescProp);
      });

      describe("when the onChange event is fired", () => {
        test("the handleTaskUpdate function is called", () => {
          checkEventTriggersFnCall("select[name='priority_desc']", "change", "handleTaskUpdate");
        });
      });

      describe("when the onBlur event is fired", () => {
        test("the putTaskUpdate function is called", () => {
          checkEventTriggersFnCall("select[name='priority_desc']", "blur", "putTaskUpdate");
        });
      });
    });
    
    describe("the Delete Task Button component", () => {
      test("is passed 2 props", () => {
        const deleteTaskButton = task().find(DeleteTaskButton);
        const props = Object.keys(deleteTaskButton.props());
        expect(props.length).toBe(2);
      });

      describe("the value of the taskID prop", () => {
        test("matches that of the task_id prop received by the Task component", () => {
          const deleteTaskButton = task().find(DeleteTaskButton);
          expect(deleteTaskButton.props().taskID).toBe(task().props().task.task_id);
        });
      });
    });
  });
});
