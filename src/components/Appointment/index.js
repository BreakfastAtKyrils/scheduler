import React from 'react'
import "/Users/kyril-remillard/lighthouse/scheduler/src/components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("interview object below")
    console.log(interview)
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() =>{
      transition(SHOW)
    })
    //.catch() will handle the error
  }
  
  return (
    <article className='Appointment' id={props.id} time={props.time}>
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === CREATE && (
        <Form
          // student={student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onCancel={() => back()}
          onSave={save}
          // onSave={() => save(props.student, props.interviewer)}
          // // onSave={() => console.log(student)}
        />
      )}
    </article>
  )
}