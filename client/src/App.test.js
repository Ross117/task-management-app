import React from "react";
import { shallow } from "enzyme";
import App from "./App";

test("App renders", () => {
  const app = shallow(<App/>);
});