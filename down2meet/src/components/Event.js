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
import { deleteEventAsync } from "../redux/event/thunks";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';




const localizer = momentLocalizer(moment);



export default function Event(props) {
  let eventsList = useSelector(state =>state.event.eventList);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    // TODO: make it so that the events on the profile page don't pop up
  } else {
    // Convert start and end values to Date objects
    processedEvents = eventsList.map(event => ({
      ...event,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate()
      
    }));
  }
  // ChatGPT helped me learn to useState to hide and show content!
  const [showPopUp, setShowPopUp] = useState(false);

  const dispatch = useDispatch();


  const togglePopUpCard = () => {
    setShowPopUp(!showPopUp);
  };

  const handleDelete = () => {
    dispatch(deleteEventAsync(selectedEvent.id));
    removePopUp();
  };

  const removePopUp = () => {
    // setShowPopUp(false);
    setSelectedEvent(null);

  };

  // Function to style events with a green background
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.title !== null ? 'green' : '', // Add the green background only for events with title 'Busy'
      color: 'white',
      border: '1px solid green',
    };
    return { style };
  };


  return (
    <div className="calendar-page">
      <Calendar
        localizer={localizer}
        events={processedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500}}
        onSelectEvent={(event) => setSelectedEvent(event)}
        eventPropGetter={eventStyleGetter} // Apply the event style here

      />
      {selectedEvent && (
        <div>
          {/* <button onClick={() => setSelectedEvent(null)}>Close</button> */}
          <div className="event-popup">
            <div className="popup-content">
              <div className="card item-card text-center">
                <div className="card-body">
                  <h3>{selectedEvent.title}</h3>
                  <p>{selectedEvent.description}</p>
                  <button className="event-delete-button" onClick={handleDelete}>Delete</button>
                  <button className="minimize-button" onClick={removePopUp}>X</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}




// /** Citations:
//  * - This page is inpired by: https://github.com/jquense/react-big-calendar/tree/master
//  */

// // To add events to the calendar, we would use a post request to appen the local variable
// // figure out how to stlye the events.
// // need to give events a title so that we can call delete and put requests

// import React from "react";
// import moment from "moment";
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useSelector } from 'react-redux';


// const localizer = momentLocalizer(moment);



// export default function Event(props) {
//   let eventsList = useSelector(state =>state.event.eventList);
//   let processedEvents;

//   if (props.formLocation === "profile") {
//     // iterate through each event and replace the title with "Busy"
//     const profileEvents = eventsList.map(event => ({
//       ...event,
//       title: "Busy",
//       description: "",
//       start: moment(event.start).toDate(),
//       end: moment(event.end).toDate()
//     }));

//     processedEvents = profileEvents;
//   } else {
//     // Convert start and end values to Date objects
//     processedEvents = eventsList.map(event => ({
//       ...event,
//       start: moment(event.start).toDate(),
//       end: moment(event.end).toDate()
//     }));
//   }

 
//   return (
//     <div className="calendar-page">
//       <Calendar
//         localizer={localizer}
//         events={processedEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// }
