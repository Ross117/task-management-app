import React from "react";
import Task from "./Task";
import { mount } from "enzyme";

// describe what I want to test, not how something will be tested

// type check props?

// add onChange & onBlur tests to all input eles?

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
      expect(div.length).toEqual(1);
    });

    describe("the div", () => {
      test("includes all the other elements which make up the component", () => {
        expect(task().children().length).toEqual(1);
      });
      test("contains a form", () => {
        const form = task().find("form");
        expect(form.length).toEqual(1);
      });

      describe("the form", () => {
        test("contains 4 input elements", () => {
          const form = task().find("form");
          expect(form.children("input").length).toEqual(4);
        });
        test("contains 1 select element", () => {
          const form = task().find("form");
          expect(form.children("select").length).toEqual(1);
        });
      });
    });

    describe("the Task Scheduled Date input element", () => {
      test("has a value which matches a substring of the task.task_scheduled_dt prop", () => {
        const taskSchdDtInput = task().find(".task__scheduledDt");
        const taskSchdDtProp = task().props().task.task_scheduled_dt
          .substring(0, 10);
        expect(taskSchdDtInput.props().value).toEqual(taskSchdDtProp);
      });
    });

    describe("the Task Title input element", () => {
      test("has a value which matches the task.task_title prop", () => {
        const taskTitleInput = task().find(".task__title");
        const taskTitleProp = task().props().task.task_title;
        expect(taskTitleInput.props().value).toEqual(taskTitleProp);
      });

      describe("when the onChange event is fired", () => {
        test("the handleTaskUpdate function is called", () => {
          const taskTitleInput = task().find(".task__title");
          taskTitleInput.simulate("change");
          expect(props.handleTaskUpdate).toHaveBeenCalled();
        });
      });

      describe("when the onBlur event is fired", () => {
        test("the putTaskUpdate function is called", () => {
          const taskTitleInput = task().find(".task__title");
          taskTitleInput.simulate("blur");
          expect(props.putTaskUpdate).toHaveBeenCalled();
        });
      });
    });

    describe("the Task Desc input element", () => {
      test("has a value which matches the task.task_desc prop", () => {
        const taskDescInput = task().find(".task__desc");
        const taskDescProp = task().props().task.task_desc;
        expect(taskDescInput.props().value).toEqual(taskDescProp);
      });
    });

    describe("the Task Completed input element", () => {
      test("has a value which matches the task.task_completed prop", () => {
        const taskCompInput = task().find(".task__completed");
        const taskCompProp = task().props().task.task_completed;
        expect(taskCompInput.props().checked).toEqual(taskCompProp);
      });
    });

    describe("the Priority Desc select element", () => {
      test("has a class name of 'task__priority--high' if the value of the priority_desc prop is 'high'", () => {
        const priorityDescSelect = task().find("select[name='priority_desc']");
        expect(priorityDescSelect.props().className).toEqual("task__priority--high");
      });

      test("has a class name of 'task__priority' if the value of the priority_desc prop is not 'high'", () => {
        props.task.priority_desc = "Low";
        const priorityDescSelect = task().find("select[name='priority_desc']");
        expect(priorityDescSelect.props().className).toEqual("task__priority");
      });

      test("has a value which matches the task.priority_desc prop", () => {
        const priorityDescSelect = task().find("select[name='priority_desc']");
        const priorityDescProp = task().props().task.priority_desc;
        expect(priorityDescSelect.props().value).toEqual(priorityDescProp);
      });
    });
  });
});
