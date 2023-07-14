/** Citations:
 * - This page is inpired by: https://github.com/jquense/react-big-calendar/tree/master
 */

// To add events to the calendar, we would use a post request to appen the local variable
// figure out how to stlye the events.
// need to give events a title so that we can call delete and put requests

import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';


const localizer = momentLocalizer(moment);



export default function Availability(props) {
  let eventsList = useSelector(state =>state.availability.availabilityList);
  let processedEvents;

  if (props.formLocation === "profile") {
    // iterate through each event and replace the title with "Busy"
    const profileEvents = eventsList.map(event => ({
      ...event,
      title: "Busy",
      description: "",
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate()
    }));

    processedEvents = profileEvents;
  } else {
    // Convert start and end values to Date objects
    processedEvents = eventsList.map(event => ({
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate()
    }));
  }

 
  return (
    <div className="calendar-page">
      <Calendar
        localizer={localizer}
        events={processedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
