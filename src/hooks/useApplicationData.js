import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
    }));
    });
  }, []);

  function getDay(day) {
    const arrayIndexes = {
      Monday: 0, 
      Tuesday: 1, 
      Wednesday: 2, 
      Thursday: 3, 
      Friday: 4
    }
    return arrayIndexes[day]
  }

  function setDay(day) {
    return setState(prev => ({ ...prev, day }))
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayBooked = getDay(state.day)
    
    let day = {
      ...state.days[dayBooked],
      spots: state.days[dayBooked].spots - 1
    }

    let days = state.days
    days[dayBooked] = day;

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(
        {...state, 
          appointments,
          days
        })
    })
  }
  
  function cancelInterview(id) {
  
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const dayBooked = getDay(state.day)
    
    let day = {
      ...state.days[dayBooked],
      spots: state.days[dayBooked].spots + 1
    }

    let days = state.days
    days[dayBooked] = day;
    
    return axios.delete(`/api/appointments/${id}`).then(() => {
      console.log('Deletion Successful')
      
      //set interview to null
      setState({...state, appointments, days})
    })
  }

  return {state, cancelInterview, bookInterview, setDay};
}