import React from "react";
import App from "../App";
import Task from "./Task";
import { mount } from "enzyme";

// describe what I want to test, not how something will be tested

// type check props?

describe("the Task component", () => {
  let mountedApp;

  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(<App />);
    }
    return mountedApp;
  };

  beforeEach(() => {
    mountedApp = undefined;

    const mockTask = {
      task_id: 5,
      task_creation_dt: "2020-03-30T14:24:21.437Z",
      task_title: "Finish French Homework",
      task_desc: "Involves some verb conjugation",
      task_completed: false,
      task_scheduled_dt: "2020-04-25T00:00:00.000Z",
      priority_desc: "High",
    };

    app().setState({ isFetched: true });
    app().setState({ tasks: [mockTask] });
  });

  describe("when it's rendered", () => {
    //   test.todo("what HTML elements Task renders");

    //  should I be testing the value of the elements against the props which were passed, and not state stored in App?
    //  ...this seems more the concern of Task

    describe("the Task Scheduled Date input element", () => {
      test("has a value which equals the value stored in state", () => {
        const taskSchdDtInput = app().find(".task__scheduledDt");
        const taskSchdDtState = app()
          .state()
          .tasks[0].task_scheduled_dt.substring(0, 10);
        expect(taskSchdDtInput.props().value).toEqual(taskSchdDtState);
      });
    });

    describe("the Task Title input element", () => {
      test("has a value which equals the value stored in state", () => {
        const taskTitleInput = app().find(".task__title");
        const taskTitleState = app().state().tasks[0].task_title;
        expect(taskTitleInput.props().value).toEqual(taskTitleState);
      });
    });
    
   describe("the Task Desc input element", () => {
     test("has a value which equals the value stored in state", () => {
       const taskDescInput = app().find(".task__desc");
       const taskDescState = app().state().tasks[0].task_desc;
       expect(taskDescInput.props().value).toEqual(taskDescState);
      });
   });
    
    describe("the Task Completed input element", () => {
      test("has a value which equals the value stored in state", () => {
        const taskCompInput = app().find(".task__completed");
        const taskCompState = app().state().tasks[0].task_completed;
        expect(taskCompInput.props().checked).toEqual(taskCompState);
      });
    });
    
    describe("the Priority Desc select element", () => {
      test("has a class name of 'task__priority--high' if the value of the priority_desc prop is 'high'", () => {
        const priorityDescSelect = app().find("select[name='priority_desc']");
        expect(priorityDescSelect.props().className).toEqual("task__priority--high");
      });

      test("has a class name of 'task__priority' if the value of the priority_desc prop is not 'high'", () => {
        const priorityDescSelect = app().find("select[name='priority_desc']");
        expect(priorityDescSelect.props().className).toEqual("task__priority");
      });

      test("has a value which equals the value stored in state", () => {
        const priorityDescSelect = app().find("select[name='priority_desc']");
        const priorityDescState = app().state().tasks[0].priority_desc;
        expect(priorityDescSelect.props().value).toEqual(priorityDescState);
      });
    });

    //   test.todo("the values of Task are updated when the user makes an update (i.e. fires the onChange event");

    //   test.todo("the putTaskUpdate function is executed when the user fires the onBlur event");
  });
});
