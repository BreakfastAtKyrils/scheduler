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