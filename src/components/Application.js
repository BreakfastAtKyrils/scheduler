import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment/index";
import axios from "axios";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import {useVisualMode} from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state, 
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  const listAppointment = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={interview}
        bookInterview={bookInterview}
        interviewers={dailyInterviewers}
        cancelInterview={cancelInterview}
      />
    );
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      <DayList 
        days={state.days} 
        day={state.day} 
        setDay={setDay} />
      </section>
      <section className="schedule">
        <ul>{listAppointment}</ul>
      </section>
    </main>
  );
}
