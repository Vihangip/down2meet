import React from "react";
import {eventsList} from '../assets/eventsList';
import { useState } from "react";
// import writeJSONToFile from "../utility/writeJSONToFile";


// export let endDateRef = [0,0,0];
// export let startDateRef =  [0,0,0];
// export let detailsRef = [];

export const availabilityDates = {
  startingDate: new Date(),
  endingDate: new Date()
};

export function AddAvailability() {
  const itemIDRef = React.useRef(null);
  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemStartRef = React.useRef(null);
  const itemEndRef = React.useRef(null);
  const itemStartTimeRef = React.useRef(null);
  const itemEndTimeRef = React.useRef(null);

  
  // const itemiBYearRef = React.useRef(null);
  // const itemiBMonthRef = React.useRef(null);
  // const itemiBDayRef = React.useRef(null);
  // const itemiEYearRef = React.useRef(null);
  // const itemiEMonthRef = React.useRef(null);
  // const itemiEDayRef = React.useRef(null);

    // Your form submit logic here
    // writeJSONToFile(    
    //   {
    //   "title": itemNameRef,
    //   "start": "2023-06-24T10:00:00",
    //   "end": "2023-06-24T12:00:00"
    //   }, '../assets/eventsList.json');

    const handleFormSubmit = (event) => {
      event.preventDefault(); // Prevents the default form submission behavior
    
      // Format the date and time values to match the JSON format
      const startDate = new Date(
        itemStartRef.current.value + 'T' + itemStartTimeRef.current.value
      ).toISOString();
      availabilityDates.startingDate = (startDate);

      const endDate = new Date(
        itemEndRef.current.value + 'T' + itemEndTimeRef.current.value
      ).toISOString();
      availabilityDates.endingDate = (endDate);
      
      // removes the Z at the end of the date (may not need to do this)
      //
      const formattedStartDate = startDate.slice(0, -1); // Remove the last character (Z)
      const formattedEndDate = endDate.slice(0, -1); // Remove the last character (Z)

    
      // Your form submit logic here
      console.log("title", itemNameRef.current.value);
      console.log("description", itemDescRef.current.value);
      console.log("start date", formattedStartDate);
      console.log("end date", formattedEndDate);
      
      // removes the Z at the end of the date (may not need to do this)
      //by removing the Z, the date and time values will be treated as local time rather than UTC. 
      //If you require UTC values for further processing or storage, it is recommended to keep the Z in the string.
      // Rest of your code...
    };
    

  const handleUpdateButton = () => {
    // Your update button logic here
  };

  const handleDeleteButton = () => {
    // Your delete button logic here
  };


  // // Export the values you need
  // React.useEffect(() => {
  //   endDateRef.current = [
  //     +itemiEYearRef.current?.value,
  //     +itemiEMonthRef.current?.value - 1,
  //     +itemiEDayRef.current?.value
  //   ];
  //   startDateRef.current = [
  //     +itemiBYearRef.current?.value,
  //     +itemiBMonthRef.current?.value - 1,
  //     +itemiBDayRef.current?.value
  //   ];
  //   detailsRef.current = [
  //     itemIDRef.current?.value,
  //     itemNameRef.current?.value,
  //     itemDescRef.current?.value
  //   ];
  //   console.log(endDateRef.current);
  //   console.log(startDateRef.current);
  //   console.log(detailsRef.current);


  // }, [handleFormSubmit]);


  return (
    <div className="add-availability-form-div">
      <h3>Add your Availability</h3>
      <form className="availability-form" onSubmit={handleFormSubmit}>
        <label htmlFor="iName">Event ID (for updates):</label>
        <br />
        <input type="text" id="iID" name="iID" ref={itemIDRef} />
        <br />
        <br />
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

        {/* <label>Beginning Date:</label>
        <br />
        <label>Year:&nbsp;</label>
        <input type="number" id="iBYear" name="iBYear" ref={itemiBYearRef} />
        <label>&nbsp;&nbsp;Month:&nbsp;</label>
        <input type="number" id="iBMonth" name="iBMonth" ref={itemiBMonthRef} />
        <label>&nbsp;&nbsp;Day:&nbsp;</label>
        <input type="number" id="iBDay" name="iBDay" ref={itemiBDayRef} />
        <br />
        <br />

        <label>End Date:</label>
        <br />
        <label>Year:&nbsp;</label>
        <input type="number" id="iEYear" name="iEYear" ref={itemiEYearRef} />
        <label>&nbsp;&nbsp;Month:&nbsp;</label>
        <input type="number" id="iEMonth" name="iEMonth" ref={itemiEMonthRef} />
        <label>&nbsp;&nbsp;Day:&nbsp;</label>
        <input type="number" id="iEDay" name="iEDay" ref={itemiEDayRef} />
        <br />
        <br /> */}

        {/* add selector for which friends can see it. */}
        <div style={{ display: "flex", justifyContent: "left" }}>
          <input type="submit" id="submitButton" value="Add" />
          <input type="button" id="updateButton" value="Update" onClick={handleUpdateButton} />
          <input type="button" id="deleteButton" value="Delete" onClick={handleDeleteButton} />
          <input type="reset" id="resetButton" value="Reset" />
        </div>
      </form>
    </div>
  );
}
