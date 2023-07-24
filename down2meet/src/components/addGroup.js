  import React from "react";
  import { useEffect, useState } from 'react';
  import { useDispatch, useSelector} from 'react-redux';
  import { addGroupsAsync, getGroupsAsync, deleteGroupsAsync} from '../redux/groups/thunks';

  import { handleCreateEvent } from "./Calendar";

  const { v4: uuid } = require('uuid');



  // //for adding to Google Calendar, does not need to be stored anywhere
  // export const googleGroup = {
  //   id: '',
  //   name: '',
  //   members: ['']
  // };


  export function AddGroup() {
    const dispatch = useDispatch();

    const accountUser = useSelector(state => state.users.userList);
    console.log(accountUser);
    // Extract unique friends from the 'friendsOfUser' array
    const uniqueFriends = Array.from(new Set(accountUser));
    // console.log(uniqueFriends);
    
    const [selectedFriends, setSelectedFriends] = useState([]);

    const itemNameRef = React.useRef(null);
    const itemMemRef = React.useRef(null);
    
    useEffect (() => {
      dispatch(getGroupsAsync());
    },[dispatch]);

    const handleFormSubmit = (event) => {
      event.preventDefault(); // Prgroups the default form submission behavior

      // the id value here gets replaces in when the post request is made. 
      // but it is used as a key? todo; check if it can just be a constant
      dispatch(addGroupsAsync({"id": uuid(), "name": itemNameRef.current.value,
      "members": selectedFriends}));
    
      // Your form submit logic here
      console.log("name", itemNameRef.current.value);
      console.log("members", itemMemRef.current.value);

      // googleGroup.name = (itemNameRef.current.value);
      // googleGroup.members= (itemMemRef.current.value);
      // handleCreateEvent();

    };
      

    // const handleUpdateButton = () => {
    //   // Your update button logic here

    //   // find a way to just update one of the items in the form not have to replace all the group's details
    //   const updatedGroup =  { 
    //     "id": uuid(), "title": itemNameRef.current.value, 
    //     "members": itemMemRef.current.value};

    //   console.log(updatedGroup);

    //   // dispatch(updateGroupsAsync(updatedGroup));
    // };

    const handleDeleteButton = () => {
      
      //idea:
      // by the title of the group, add the id. have the person input the id of the group to delete it.
      // todo:
      // dispatch(deleteGroupsAsync(itemIDRef.current.value));

    };


    return (
      <div className="add-group-form-div">
        <h1>Add your Group</h1>
        <form className="group-form" onSubmit={handleFormSubmit}>
          <hr /> <br />
          <label htmlFor="iTitle">Group Name:</label>
          <br />
          <input type="text" id="iTitle" name="iTitle" ref={itemNameRef} />
          <br />  <br />
         

           {/* add checkboxes for selecting friends */}
         <div>
          <label>Select Group Members:</label>
          <br />
          {/* ChatGPT helped with the checkboxes */}
          {uniqueFriends.map((friend) => (
            <label key={friend}>
              <input
                className="add-events-checkbox"
                type="checkbox"
                value={friend}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setSelectedFriends(prevSelectedFriends => (
                    checked ? [...prevSelectedFriends, value] : prevSelectedFriends.filter(friend => friend !== value)
                  ));
                }}
              />
              {friend}
              {/* <br /> */}
            </label>
          ))}
        </div> <br/>

          <div style={{ justifyContent: "left" }}>
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
