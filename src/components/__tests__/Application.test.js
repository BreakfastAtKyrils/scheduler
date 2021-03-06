import React from "react";
import axios from "axios";
import "@testing-library/react/cleanup-after-each";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  queryByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByAltText,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() =>{
      const v = getByText(container, "Archie Cohen")
      return v;
    } );

    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByAltText(appointment, "Add"))
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"))

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment,"Saving")).toBeInTheDocument();

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() =>{
      const v = getByText(container, "Lydia Miller-Jones")
      return v;
    } );

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const DayListItem = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(DayListItem,"no spots remaining")).toBeInTheDocument();
      
    // check that the unedited appoinntment is there
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() =>{
    const v = getByText(container, "Archie Cohen")
    return v;
  } );

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))
  // console.log(prettyDOM(appointment))
  fireEvent.click(getByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment,"deleting this appointment?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment,"Deleting")).toBeInTheDocument();
  
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const DayListItem = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  expect(getByText(DayListItem, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //1. render the app
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    // 4. Change the name to something else
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //5. select the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
  
    //5. Click the save button + check for transition
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //6. Check that the name has changed
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    console.log(prettyDOM(appointment))

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    //1. render the app
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0]
    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"))

    //expect the error message to appear
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  
  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() =>{
      const v = getByText(container, "Archie Cohen")
      return v;
    });

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))
    // console.log(prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment,"deleting this appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    //expect the error message to appear
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  }); 
});
