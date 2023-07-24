import React from "react";
//import EventsList from '../assets/eventsList';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addEventAsync, getEventAsync, deleteEventAsync, updateEventAsync} from '../redux/event/thunks';

import { handleCreateEvent } from './Calendar'

const { v4: uuid } = require('uuid');


// export let endDateRef = [0,0,0];
// export let startDateRef =  [0,0,0];
// export let detailsRef = [];


//for adding to Google Calendar, does not need to be stored anywhere
export const googleEvent = {
  title: '',
  description: '',
  startingDate: new Date(),
  endingDate: new Date(),

};


export function AddEvent() {

  const calendarSignedIn= useSelector(state => state.reducer.googleCalendar);
  const dispatch = useDispatch();

  const itemIDRef = React.useRef(null);
  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemStartRef = React.useRef(null);
  const itemEndRef = React.useRef(null);
  const itemStartTimeRef = React.useRef(null);
  const itemEndTimeRef = React.useRef(null);
  
  useEffect (() => {
    dispatch(getEventAsync());
  },[dispatch]);

    let formattedStartDate;
    let formattedEndDate;

    const handleFormSubmit = (event) => {
      event.preventDefault(); // Prevents the default form submission behavior
    
      // Format the date and time values to match the JSON format
      const startDate = new Date(
        itemStartRef.current.value + 'T' + itemStartTimeRef.current.value
      ).toISOString();
      const endDate = new Date(
        itemEndRef.current.value + 'T' + itemEndTimeRef.current.value
      ).toISOString();

      // removes the Z at the end of the date (may not need to do this)
      //
      formattedStartDate = startDate.slice(0, -1); // Remove the last character (Z)
      formattedEndDate = endDate.slice(0, -1); // Remove the last character (Z)

      // the id value here gets replaces in when the post request is made. 
      // but it is used as a key? todo; check if it can just be a constant
      dispatch(addEventAsync({"id": uuid(), "title": itemNameRef.current.value,
      "description": itemDescRef.current.value,  "start": formattedStartDate, "end": formattedEndDate}));
    
      // Your form submit logic here
      console.log("title", itemNameRef.current.value);
      console.log("description", itemDescRef.current.value);
      console.log("start date", startDate);
      console.log("end date", endDate);


      googleEvent.title = (itemNameRef.current.value);
      googleEvent.description = (itemDescRef.current.value);
      googleEvent.startingDate = (startDate);//startDate);
      googleEvent.endingDate = (endDate);//endDate);


      if (calendarSignedIn === true) {
        handleCreateEvent(); //only add event to Google Calendar if user is signed in
      }
      //console.log("addEvent new event");
      //console.log(googleEvent.startingDate);

    };
    

  const handleUpdateButton = () => {
    // Your update button logic here

    // find a way to just update one of the items in the form not have to replace all the event's details
    const updatedEvent =  { 
      "id": uuid(), "title": itemNameRef.current.value,
      "description": itemDescRef.current.value,  "start": formattedStartDate, "end": formattedEndDate
    };

    console.log(updatedEvent);

    dispatch(updateEventAsync(updatedEvent));
  };

  const handleDeleteButton = () => {
    
    //idea:
    // by the title of the event, add the id. have the person input the id of the event to delete it.
    // todo:
    dispatch(deleteEventAsync(itemIDRef.current.value));

  };


  return (
    <div className="add-event-form-div">
      <h1>Add your Event</h1>
      <form className="event-form" onSubmit={handleFormSubmit}>
        {/* <label htmlFor="iName">Event ID (for updates):</label>
        <br />
        <input type="text" id="iID" name="iID" ref={itemIDRef} />
        <br /> <br /> */}
        <hr /> <br />
        <label htmlFor="iTitle">Title:</label>
        <br />
        <input type="text" id="iTitle" name="iTitle" ref={itemNameRef} />
        <br />
        <br />
        <label htmlFor="iDes">Description (optional?):</label>
        <br />
        <input type="text" id="iDes" name="iDes" ref={itemDescRef} />
        <br />
        <br />
        
        <label htmlFor="iName">Event start:</label><br />     
        <input type="date" id="iName" name="iName" ref={itemStartRef} /><br />
        <input type="time" id="iStartTime" name="iStartTime" ref={itemStartTimeRef} /><br /><br />

        <label htmlFor="iDes">Event end:</label><br />
        <input type="date" id="iDes" name="iDes" ref={itemEndRef} /><br />
        <input type="time" id="iEndTime" name="iEndTime" ref={itemEndTimeRef} /><br /><br />

        {/* add selector for which friends can see it. */}
        <div style={{justifyContent: "left"}}>
          <input type="submit" id="submitButton" value="Add" />
          {/* <input type="button" id="updateButton" value="Update" onClick={handleUpdateButton} /> */}
          <input type="button" id="deleteButton" value="Delete" onClick={handleDeleteButton} />
          <input type="reset" id="resetButton" value="Clear Form" />
        </div>
        <br /> <br /> <br />
        <hr /> <br />

      </form>
    </div>
  );
}
