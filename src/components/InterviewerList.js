import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 

import "components/InterviewerList.scss";
function InterviewerList(props) {

  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.interviewer}
          setInterviewer={() => props.setInterviewer(interviewer.id)}
        >
        </InterviewerListItem>
    );
  });
  
  return (
    <section className="interviewers">       
    <h4 className="interviewers__header text--light">Interviewer</h4>      
    <ul className="interviewers__list">{listInterviewers}</ul>     
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;