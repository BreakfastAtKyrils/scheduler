import React from 'react'
import "/Users/kyril-remillard/lighthouse/scheduler/src/components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Confirm from './Confirm';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteInterview() {
    //transition(SAVING)
    //new code//
    transition(DELETING, true);
    //new code//
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch((error) => {
      console.log('receive this error: ', error)
      transition(ERROR_DELETE, true)
    })
  }
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log("interview object below")
    // console.log(interview)
    transition(SAVING)
    props
    .bookInterview(props.id, interview)
    .then(() =>{
      transition(SHOW)
    })
    .catch((error) => {
      console.log('receive this error: ', error)
      transition(ERROR_SAVE, true)
    })
    //.catch() will handle the error
  }

  return (
    <article className='Appointment' id={props.id} time={props.time}>
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && <Confirm message='deleting this appointment?' onConfirm={deleteInterview} />}
      {mode === SAVING && <Status/>}
      {mode === DELETING && <Status/>}
      {mode === EDIT && (
        <Form
          student={props.interview && props.interview.student}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onCancel={() => transition(EMPTY)}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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