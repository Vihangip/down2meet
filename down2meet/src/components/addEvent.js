import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEventAsync, getEventAsync, deleteEventAsync, updateEventAsync } from '../redux/event/thunks';
import { handleCreateEvent } from './Calendar'
import { getSessionUserAsync } from "../redux/user/thunks";

const { v4: uuid } = require('uuid');

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
  //const user = useSelector(state => state.reducer.user);
  useEffect(() => {
    dispatch(getSessionUserAsync());
  }, [dispatch]);

  const user = useSelector(state => state.users.user);
  const events = useSelector(state => state.event.eventList);
    // Extract unique groups from the 'events' array
    const uniqueGroups = Array.from(new Set(events.flatMap(event => event.groups)));

  // const allGroups = events.map((event) => event.groups);

  //convert to a set to remove duplicates, then convert back to array to use .map()
  // const SetOfGroups = new Set(allGroups);
  // const uniqueGroups = Array.from(SetOfGroups);

  const itemIDRef = React.useRef(null);
  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemStartRef = React.useRef(null);
  const itemEndRef = React.useRef(null);
  const itemStartTimeRef = React.useRef(null);
  const itemEndTimeRef = React.useRef(null);
  
  useEffect (() => {
    dispatch(getEventAsync(user.email));
  },[dispatch, user.email]);

  // Add selectedGroups state and setSelectedGroups function
  const [selectedGroups, setSelectedGroups] = useState([]);

  let formattedStartDate;
  let formattedEndDate;

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const startDate = new Date(
      itemStartRef.current.value + 'T' + itemStartTimeRef.current.value
    ).toISOString();
    const endDate = new Date(
      itemEndRef.current.value + 'T' + itemEndTimeRef.current.value
    ).toISOString();

      // Your form submit logic here
      console.log("title", itemNameRef.current.value);
      console.log("description", itemDescRef.current.value);
      console.log("start date", startDate);
      console.log("end date", endDate);
      formattedStartDate = startDate.slice(0, -1);
      formattedEndDate = endDate.slice(0, -1);

      // the id value here gets replaces in when the post request is made. 
      // but it is used as a key? todo; check if it can just be a constant
      dispatch(addEventAsync({
          "id": uuid(), 
          "email": user.email,
          "userID": user.user_id,
          "title": itemNameRef.current.value,
          "description": itemDescRef.current.value,  
          "start": formattedStartDate, 
          "end": formattedEndDate,
          "groups": selectedGroups,}));
    


      if (calendarSignedIn === true) {
        handleCreateEvent(); //only add event to Google Calendar if user is signed in
      }
      //console.log("addEvent new event");
      //console.log(googleEvent.startingDate);

    };
    


  const handleDeleteButton = () => {
    dispatch(deleteEventAsync(itemIDRef.current.value));
  };

  return (
    <div className="add-event-form-div">
      <h1>Add your Event</h1>
      <form className="event-form" onSubmit={handleFormSubmit}>
        <hr /> <br />
        <label htmlFor="iTitle">Title:</label>
        <br />
        <input type="text" id="iTitle" name="iTitle" ref={itemNameRef} />
        <br />
        <br />
        <label htmlFor="iDes">Description (optional):</label>
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

         {/* add checkboxes for selecting groups */}
         <div>
          <label>Select Group:</label>
          <br />
          {/* ChatGPT helped with the checkboxes */}
          {uniqueGroups.map((group) => (
            <label key={group}>
              <input
                className="add-events-checkbox"
                type="checkbox"
                value={group}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setSelectedGroups(prevSelectedGroups => (
                    checked ? [...prevSelectedGroups, value] : prevSelectedGroups.filter(group => group !== value)
                  ));
                }}
              />
              {group}
              {/* <br /> */}
            </label>
          ))}
        </div>
        <br /><br />

        <div style={{ justifyContent: "left" }}>
          <input type="submit" id="submitButton" value="Add" />
          <input type="button" id="deleteButton" value="Delete" onClick={handleDeleteButton} />
          <input type="reset" id="resetButton" value="Clear Form" />
        </div>
        <br /> <br /> <br />
        <hr /> <br />

      </form>
    </div>
  );
}

