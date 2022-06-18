import React from 'react'
import "/Users/kyril-remillard/lighthouse/scheduler/src/components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
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

    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch((error) => {
      //console.log('receive this error: ', error)
      transition(ERROR_DELETE, true)
    })
  }
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
    .bookInterview(props.id, interview)
    .then(() =>{
      transition(SHOW)
    })
    .catch((error) => {
      //console.log('receive this error: ', error)
      transition(ERROR_SAVE, true)
    })
  }

  return (
    <article className='Appointment' id={props.id} time={props.time} data-testid="appointment">
      <Header time={props.time}></Header>
      {mode === ERROR_SAVE && <Error onClose={back} message="Error" />}
      {mode === ERROR_DELETE && <Error onClose={back} message="Error" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && <Confirm message='deleting this appointment?' onConfirm={deleteInterview} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
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