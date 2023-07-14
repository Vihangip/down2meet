import React from "react";
import EventsList from '../assets/eventsList.json';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { addAvailabilityAsync, getAvailabilityAsync, deleteAvailabilityAsync, updateAvailabilityAsync} from '../redux/availability/thunks';
const { v4: uuid } = require('uuid');


// export let endDateRef = [0,0,0];
// export let startDateRef =  [0,0,0];
// export let detailsRef = [];


export function AddAvailability() {
  const dispatch = useDispatch();


  const itemIDRef = React.useRef(null);
  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemStartRef = React.useRef(null);
  const itemEndRef = React.useRef(null);
  const itemStartTimeRef = React.useRef(null);
  const itemEndTimeRef = React.useRef(null);
  
  useEffect (() => {
    dispatch(getAvailabilityAsync());
    console.log("called get");
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
      dispatch(addAvailabilityAsync({"id": uuid(), "title": itemNameRef.current.value,
      "description": itemDescRef.current.value,  "start": formattedStartDate, "end": formattedEndDate}));
    
      // Your form submit logic here
      console.log("title", itemNameRef.current.value);
      console.log("description", itemDescRef.current.value);
      console.log("start date", formattedStartDate);
      console.log("end date", formattedEndDate);
    };
    

  const handleUpdateButton = () => {
    // Your update button logic here

    // find a way to just update one of the items in the form not have to replace all the event's details
    const updatedAvailability =  { 
      "id": uuid(), "title": itemNameRef.current.value,
      "description": itemDescRef.current.value,  "start": formattedStartDate, "end": formattedEndDate
    };

    console.log(updatedAvailability);

    dispatch(updateAvailabilityAsync(updatedAvailability));
  };

  const handleDeleteButton = () => {
    
    //idea:
    // by the title of the event, add the id. have the person input the id of the event to delete it.
    // todo:
    dispatch(deleteAvailabilityAsync(itemIDRef.current.value));

  };


  return (
    <div className="add-availability-form-div">
      <h1>Add your Event</h1>
      <form className="availability-form" onSubmit={handleFormSubmit}>
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
