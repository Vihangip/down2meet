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
import EventsList from '../assets/eventsList.json';
import {AddAvailability} from "./addAvailability";
// import {endDateRef, startDateRef, detailsRef} from "./addAvailability";


const localizer = momentLocalizer(moment);

// Convert start and end values to Date objects
const processedEvents = EventsList.map(event => ({
  ...event,
  start: moment(event.start).toDate(),
  end: moment(event.end).toDate()
}));

export default function Availability(props) {
  return (
    <div className="availability-page">
      <AddAvailability/> <br/><br/>
      <hr/> <br/><br/>
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
