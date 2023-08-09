import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateEvent } from './Calendar'
import { getSessionUserAsync, getUserGroupsAsync } from "../redux/user/thunks";
import { addEventAsync, getEventAsync, deleteEventAsync } from '../redux/event/thunks';
import { setUser } from "../redux/user/reducer";

const { v4: uuid } = require('uuid');

export const googleEvent = {
  title: '',
  description: '',
  startingDate: new Date(),
  endingDate: new Date(),
};

export function AddEvent() {

  const calendarSignedIn= useSelector(state => state.reducer.googleCalendar);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  useEffect (() => {
    dispatch(getSessionUserAsync());
    dispatch(getEventAsync(user.user_id));    
    dispatch(getUserGroupsAsync(currentUser.user_id));
  },[dispatch]);                      

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        let storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser));
        } else {
        await dispatch(getSessionUserAsync());
        storedUser = JSON.parse(localStorage.getItem('user'));
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPostsAndUsers();
  }, []); 

  const user = JSON.parse(localStorage.getItem('user'));

  const groupsList = useSelector((state) => state.users.groupList);

  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemStartRef = React.useRef(null);
  const itemEndRef = React.useRef(null);
  const itemStartTimeRef = React.useRef(null);
  const itemEndTimeRef = React.useRef(null);
  
  useEffect (() => {
    dispatch(getEventAsync(user.user_id));         
  },[dispatch]);                      

  const [selectedGroups, setSelectedGroups] = useState([]);

  let formattedStartDate;
  let formattedEndDate;

  const handleFormSubmit = (event) => {
    event.preventDefault();

  
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Vancouver',
    };

    const unformattedStartDate = new Date(
      itemStartRef.current.value + 'T' + itemStartTimeRef.current.value
    );

    const unformattedEndDate = new Date(
      itemEndRef.current.value + 'T' + itemEndTimeRef.current.value
    );

    const vancouverStartDate = new Intl.DateTimeFormat('en-US', options).format(unformattedStartDate);
    const vancouverEndDate = new Intl.DateTimeFormat('en-US', options).format(unformattedEndDate);

    const startDate = new Date(vancouverStartDate);
    const endDate = new Date(vancouverEndDate);


      formattedStartDate = startDate;
      formattedEndDate = endDate;
      let repetitionRule = null;
    
      console.log('rep rule' + repetitionRule);
      console.log(repetitionRule);

      dispatch(addEventAsync({
          "id": uuid(), 
          "email": user.email,
          "userID": user.user_id,
          "user_id": user.user_id,
          "title": itemNameRef.current.value,
          "description": itemDescRef.current.value,  
          "start": formattedStartDate, 
          "end": formattedEndDate,
          "groups": selectedGroups,
          "repetitionRule": repetitionRule 
        }));


      if (calendarSignedIn === true) {
        googleEvent.title = (itemNameRef.current.value);
        googleEvent.description = (itemDescRef.current.value);
        googleEvent.startingDate = (startDate);
        googleEvent.endingDate = (endDate);
        handleCreateEvent({origin: "addEvent"});
      }
    };

  return (
    <div className="add-event-form-div">
      <h2> Add to your schedule </h2>
      <form className="event-form" onSubmit={handleFormSubmit}>

      <div className="in-line addeventtitle">
        <label htmlFor="iTitle">Title</label>
        <br />
        <input type="text" id="iTitle" name="iTitle" ref={itemNameRef} />
        </div>
        <br />
        <div className="addeventdesc">
          <label htmlFor="iDes">Description</label>
          <br />
          <textarea id="iDes" name="iDes" ref={itemDescRef} />
        </div>
        <br />

        <div className="in-line addeventform">
          <label htmlFor="iName">Start </label><br />
          <input type="date" id="iName" name="iName" ref={itemStartRef} /><br />
          <input className="addeventsecond" type="time" id="iStartTime" name="iStartTime" ref={itemStartTimeRef} /><br /><br />
        </div>

        <div className="in-line addeventform">
          <label htmlFor="iDes">End </label><br />
          <input className="endtime" type="date" id="iDes" name="iDes" ref={itemEndRef} /><br />
          <input className="addeventsecond" type="time" id="iEndTime" name="iEndTime" ref={itemEndTimeRef} /><br /><br />
        </div>


         {/* Render the checkboxes with group names */}
         <div className="in-line groupselect" >
          <label>Group</label>
          <br />

          {groupsList.map((group) => (
            <label key={group.id}>
              <input
                className="add-events-checkbox"
                type="checkbox"
                value={group.name}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setSelectedGroups((prevSelectedGroups) =>
                    checked
                      ? [...prevSelectedGroups, value]
                      : prevSelectedGroups.filter((groupId) => groupId !== value)
                  );
                }}
              />
              {group.name}
              <br />
            </label>
          ))}

        </div>
        <br /><br />

        <div style={{ justifyContent: "left", display: "flex", gap: "5px" }}>
          <input className='AvailabilityButton3' type="submit" id="submitButton" value="Add" />
          <input className='AvailabilityButton3' type="reset" id="resetButton" value="Clear" />
        </div>

      </form>
    </div>
  );
}
