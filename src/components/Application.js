import DayList from "./DayList";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";

import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  // const dailyAppointments = [];

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = day => setState(prev => ({ ...prev, day }));
  //const setDays = days => setState({...state, days});

  //solid principles
  //s = single-responsability function

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
    });






    // Promise.all([
    //   axios.get('http://localhost:8001/api/days'),
    //   axios.get('http://localhost:8001/api/appointments'),
    // ]).then(all => {
    //   console.log(all[0].data)
    //   //setDays(all[0].response.data)
    //   setState({ ...state, 
    //     days: all[0],
    //     appointments: all[1]
    //   })
    // }) 
  }, []);


  const listAppointment = dailyAppointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={appointment.interview} 
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
