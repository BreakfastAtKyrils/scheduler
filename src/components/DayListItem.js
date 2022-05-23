import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";
export default function DayListItem(props) {
  
  let buttonClass = classNames(
    'day-list__item', 
    {'day-list__item--selected': props.selected},
    {'day-list__item--full': (props.spots === 0)}
    );

  const formatSpots = function(spots) {
    return (spots > 1 ? props.spots +  " spots remaining" : (spots === 1) ?"1 spot remaining" : "no spots remaining");
  }

  return (
    <li className={buttonClass} onClick={() =>  props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
