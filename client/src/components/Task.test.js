import React from "react";
import Task from "./Task";
import { mount } from "enzyme";

// describe what I want to test, not how something will be tested

// type check props?

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
      handleTaskUpdate: undefined,
      putTaskUpdate: undefined,
    };
  });

  describe("when it's rendered", () => {
    //   test.todo("what HTML elements Task renders");

    describe("the Task Scheduled Date input element", () => {
      test("has a value which equals a substring of the task.task_scheduled_dt prop", () => {
        const taskSchdDtInput = task().find(".task__scheduledDt");
        const taskSchdDtProp = task().props().task.task_scheduled_dt
          .substring(0, 10);
        expect(taskSchdDtInput.props().value).toEqual(taskSchdDtProp);
      });
    });

    describe("the Task Title input element", () => {
      test("has a value which equals the task.task_title prop", () => {
        const taskTitleInput = task().find(".task__title");
        const taskTitleProp = task().props().task.task_title;
        expect(taskTitleInput.props().value).toEqual(taskTitleProp);
      });
    });

    describe("the Task Desc input element", () => {
      test("has a value which equals the task.task_desc prop", () => {
        const taskDescInput = task().find(".task__desc");
        const taskDescProp = task().props().task.task_desc;
        expect(taskDescInput.props().value).toEqual(taskDescProp);
      });
    });

    describe("the Task Completed input element", () => {
      test("has a value which equals the task.task_completed prop", () => {
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

      test("has a value which equals the task.priority_desc prop", () => {
        const priorityDescSelect = task().find("select[name='priority_desc']");
        const priorityDescProp = task().props().task.priority_desc;
        expect(priorityDescSelect.props().value).toEqual(priorityDescProp);
      });
    });

    //   test.todo("the values of Task are updated when the user makes an update (i.e. fires the onChange event") - concern of App?;

    //   test.todo("the putTaskUpdate function is executed when the user fires the onBlur event");
  });
});
