export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  if(state.days.length===0 || filteredDays.length===0){
    return [];
  }
  const appointmentsFromDays = filteredDays[0].appointments;
  let dayAppointments = [];
  for(let appointment of appointmentsFromDays) {
    dayAppointments.push(state.appointments[appointment]);
  }
  return dayAppointments;
}

export  function getInterview(state, interview) {
  if(!interview) return null;

  return {
    student : interview.student,
    interviewer : state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  if(state.days.length===0 || filteredDays.length===0){
    return [];
  }

  const interviewersFromDays = filteredDays[0].interviewers;
  let dayInterviewers = [];
  for(let interviewer of interviewersFromDays) {
    dayInterviewers.push(state.interviewers[interviewer]);
  }
  return dayInterviewers;
}
