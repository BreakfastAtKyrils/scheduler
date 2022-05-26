import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";
export default function InterviewerList(props) {

  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.interviewer}
          setInterviewer={props.setInterviewer}
        >
        </InterviewerListItem>
    );
  });
  
  return (
    <ul>{listInterviewers}</ul>
  );
}