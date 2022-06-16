import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Appointment />);
});

it("calls the function", () => {
  const fn = jest.fn();
  fn(10);
  expect(fn).toHaveBeenCalledWith(10);
 });