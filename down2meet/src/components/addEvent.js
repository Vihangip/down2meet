import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateEvent } from './Calendar'
import { getSessionUserAsync, getUserGroupsAsync } from "../redux/user/thunks";
import { addEventAsync, getEventAsync, deleteEventAsync, updateEventAsync } from '../redux/event/thunks';
import moment from "moment";
import { momentLocalizer } from 'react-big-calendar';

import { getSessionUserAsync } from "../redux/user/thunks";
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

  //const user = useSelector(state => state.reducer.user);
  useEffect (() => {
    dispatch(getSessionUserAsync());
    dispatch(getEventAsync(user.user_id));    
    dispatch(getUserGroupsAsync(currentUser.user_id));
    //////////////////////// 
  },[dispatch]);                      //////////////////////

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

  const itemIDRef = React.useRef(null);
  const itemNameRef = React.useRef(null);
  const itemDescRef = React.useRef(null);
  const itemStartRef = React.useRef(null);
  const itemEndRef = React.useRef(null);
  const itemStartTimeRef = React.useRef(null);
  const itemEndTimeRef = React.useRef(null);
  
  useEffect (() => {
    dispatch(getEventAsync(user.user_id));          //////////////////////// 
  },[dispatch]);                      //////////////////////

  // useEffect(() => {
  //   // Fetch and resolve all user names asynchronously for each group's members
  //   Promise.all(groupsList.map(group => getGroupData(group)))
  //     .then(data => setGroupData(data))
  //     .catch(error => console.error(error));
  // }, [groupsList]);


  // const [groupData, setGroupData] = useState([]);

 // Function to fetch data for each group (including member names) based on group object
//  const getGroupData = async (group) => {
//   try {
//     // Fetch the member names based on their user IDs
//     const memberNames = await Promise.all(group.members.map(userid => service.getOneUser(userid).then(user => user.name)));
//     return { ...group, members: memberNames };
//   } catch (error) {
//     return group;
//   }
// };

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isWeekly, setIsWeekly] = useState(false); // New state to track weekly checkbox


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
  
      if (isWeekly) {
        // If the 'weekly' checkbox is checked, set the repetitionRule to repeat every 7 days
        repetitionRule = {
          frequency: 'WEEKLY',
          interval: 1,
          endDate: moment(endDate).add(6, 'weeks').toDate(), // Set the end date of the repetition (after 6 weeks)
        };
      }
    
      console.log('rep rule' + repetitionRule);
      console.log(repetitionRule);
      // const repetitionRule = isWeekly ? { frequency: 'WEEKLY', interval: 1 } : null;

      // the id value here gets replaces in when the post request is made. 
      // but it is used as a key? todo; check if it can just be a constant

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


  const handleDeleteButton = () => {
    dispatch(deleteEventAsync(itemIDRef.current.value));
  };

  return (
    <div className="add-event-form-div">
      <h1>Set your Availability</h1>
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

        {/* Add the "weekly" checkbox */}
        {/* <div>
          <label htmlFor="iWeekly">Weekly:</label>
          <input
            type="checkbox"
            id="iWeekly"
            name="iWeekly"
            checked={isWeekly}
            onChange={(e) => setIsWeekly(e.target.checked)}
          />
        </div> <br /> */}

         {/* Render the checkboxes with group names */}
         <div>
          <label>Select Group:</label>
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
          <input className='AvailabilityButton3' type="button" id="deleteButton" value="Delete" onClick={handleDeleteButton} />
          <input className='AvailabilityButton3' type="reset" id="resetButton" value="Clear Form" />
        </div>
        <br /> <br /> <br />
        <hr /> <br />

      </form>
    </div>
  );
}
