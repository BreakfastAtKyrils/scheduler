import React from "react";
//import classNames from "classnames";

import "components/DayListItem";
import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const listDays = props.days.map((day) => {
    // console.log('day -->  ' + day);
    // console.log('props -->  ' + props);
    return (
      <DayListItem 
        spots={day.spots}
        name={day.name}
        selected={props.day === day.name}
        setDay={props.setDay}
      >
      </DayListItem>
    );
  });

  return (
    <ul>{listDays}</ul>
  );
}
