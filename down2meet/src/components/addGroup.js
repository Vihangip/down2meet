  import React from "react";
  import { useEffect, useState } from 'react';
  import { useDispatch, useSelector} from 'react-redux';
  import { addGroupsAsync, getGroupsAsync, deleteGroupsAsync} from '../redux/groups/thunks';
  import { handleCreateEvent } from "./Calendar";
  import { getFriendsAsync, getSessionUserAsync, getUserGroupsAsync, addUserGroupsAsync } from '../redux/user/thunks';
  import service from "../redux/user/service";
import { useNavigate } from "react-router-dom";

  const { v4: uuid } = require('uuid');

  export function AddGroup() {
    let newGroupName;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemNameRef = React.useRef(null);

    const [selectedFriends, setSelectedFriends] = useState([]);
    const [friendNames, setFriendNames] = useState([]);
    const [loading, setLoading] = useState(true); // Track the loading state


    const groupsList = useSelector((state) => state.users.groupList);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const usersFriends = useSelector((state) => state.users.friendsList)
    const uniqueFriends = Array.from(new Set(usersFriends));  
    const [friends, setFriends] = useState([]);



    // useEffect(() => {
    //   dispatch(getUserGroupsAsync(currentUser.user_id));
    //   dispatch(getFriendsAsync(currentUser.user_id));
    //   Promise.all(uniqueFriends.map(friend => getUserNameByID(friend)))
    //     .then(names => setFriendNames(names))
    //     .catch(error => console.error(error));
        
    // }, []);

    // const [selectedFriends, setSelectedFriends] = useState([]);
    // const [friendNames, setFriendNames] = useState([]);
  
  useEffect(() => {
    if (!currentUser){
      navigate('/');
      return;
    }
    // Fetch friends asynchronously
    dispatch(getFriendsAsync(currentUser.user_id))
      .then(() => setLoading(false)) // Set loading to false when friends are fetched
      .catch(error => {
        console.error(error);
        setLoading(false); // Handle error, set loading to false
      });
      
    dispatch(getUserGroupsAsync(currentUser.user_id));

  }, []);

  useEffect(() => {
    // Resolve friend names once friends are fetched
    if (!loading) {
      Promise.all(uniqueFriends.map(friend => getUserNameByID(friend)))
        .then(names => setFriendNames(names))
        .catch(error => console.error(error));
    }
  }, [!loading]);


    const getUserNameByID = async (userid) => {
      try {
        const user = await service.getOneUser(userid);
        friends.push(user);
        return user.name;
      } catch (error) {
        // Use rejectWithValue to include the error message in the action payload
        return;
      }
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      newGroupName = itemNameRef.current.value;
  
      // Check if the group name already exists in groupsList
      const existingGroup = groupsList.find(group => group.name === newGroupName);
  
      if (existingGroup) {
        alert("A group with the same name already exists!");
        return; // Do not add the group if it already exists
      }
  
      // dispatch(addGroupsAsync({
        //   "id": uuid(),
        //   "user_id": currentUser.user_id,
        //   "name": newGroupName,
        //   "members": selectedFriends
        // });

        dispatch(
          addUserGroupsAsync({
          "id": uuid(),
          "user_id": currentUser.user_id,
          "name": newGroupName,
          "members": selectedFriends
        }));
        dispatch(getUserGroupsAsync(currentUser.user_id));


      
      // // Clear the input field after successfully adding the group
      itemNameRef.current.value = "";
  
      // Reset selectedFriends state
      setSelectedFriends([]);
      
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


    //   // dispatch(updateGroupsAsync(updatedGroup));
    // };

    const handleDeleteButton = () => {
      
      //idea:
      // todo:
      // dispatch(deleteGroupsAsync(itemIDRef.current.value));

    };


    return (
      <div className="add-group-form-div">
        <h1>Add your Group</h1>
        <form className="group-form" onSubmit={handleFormSubmit}>
          <hr /> <br />
          <label htmlFor="iTitle">Group Name  (the name must be unique):</label>
          <br />
          <input type="text" id="iTitle" name="iTitle" ref={itemNameRef} />
          <br />  <br />

          {/* add checkboxes for selecting friends */}
          <div>
          <label>Select Group Members:</label>
          <br />
          {/* ChatGPT helped with the checkboxes */}
          {uniqueFriends.map((friend, index) => (
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
                }
              }
              />
              {/* {getUserNameByID(friend)} */}
              {/* Render the friend name directly if available, else show loading */}
              {friendNames[index] || 'Loading...'}
              <br />
            </label>
          ))}
        </div> <br/>

          <div style={{ justifyContent: "left" }}>
            <input className='AvailabilityButton3' type="submit" id="submitButton" value="Add" />
            {/* <input type="button" id="updateButton" value="Update" onClick={handleUpdateButton} /> */}
            <input className='AvailabilityButton3' type="button" id="deleteButton" value="Delete" onClick={handleDeleteButton} />
            <input className='AvailabilityButton3' type="reset" id="resetButton" value="Clear Form" />
          </div>
          
          <br /> <br /> <br />
          <hr /> <br />
        </form>
      </div>
    );
  }
