import React from 'react'
import "/Users/kyril-remillard/lighthouse/scheduler/src/components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  return (
    <article className='Appointment' id={props.id} time={props.time}>
      <Header time={props.time}></Header>
      {props.id ?
        props.interview ?
          <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.interview.onEdit}
          onDelete={props.interview.onDelete}
          ></Show>
        :
          <Empty></Empty>
        : undefined
      }
      


    </article>
  )
}