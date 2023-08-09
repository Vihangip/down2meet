import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getFriendsAsync, getUserGroupsAsync, addUserGroupsAsync, deleteUserGroupAsync} from '../redux/user/thunks';
import service from "../redux/user/service";
import { useNavigate } from "react-router-dom";


const { v4: uuid } = require('uuid');

export function AddGroup() {
  let newGroupName;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteGroupName, setDeleteGroupName] = useState('');

  const itemNameRef = React.useRef(null);

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friendNames, setFriendNames] = useState([]);
  const [loading, setLoading] = useState(true);
   
  const groupsList = useSelector((state) => state.users.groupList);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const usersFriends = useSelector((state) => state.users.friendsList)
  const uniqueFriends = Array.from(new Set(usersFriends));   
  const [friends] = useState([]);


  useEffect(() => {
    dispatch(getFriendsAsync(currentUser.user_id))
      .then(() => setLoading(false))
      .catch(error => {
        console.error(error);
        setLoading(false);
      });

    if (!currentUser){
      navigate('/');
      return;
    }
    dispatch(getFriendsAsync(currentUser.user_id))
      .then(() => setLoading(false))
      .catch(error => {
        console.error(error);
        setLoading(false);
    });
      
    dispatch(getUserGroupsAsync(currentUser.user_id));
    
  }, []);

const getUserNameByID = async (userid) => {
  try {
    const user = await service.getOneUser(userid);
    friends.push(user);
    return user.name;
  } catch (error) {
    return;
  }
};

  useEffect(() => {
    if (!loading) {
      Promise.all(uniqueFriends.map(friend => getUserNameByID(friend)))
        .then(names => setFriendNames(names))
        .catch(error => console.error(error));
    }
  }, [!loading]);


  const handleFormSubmit = (event) => {
    event.preventDefault();

    newGroupName = itemNameRef.current.value;
    const existingGroup = groupsList.find(group => group.name === newGroupName);

    if (existingGroup) {
      alert("A group with the same name already exists!");
      return;
    }

      dispatch(
        addUserGroupsAsync({
        "id": uuid(),
        "user_id": currentUser.user_id,
        "name": newGroupName,
        "members": selectedFriends
      }));

      dispatch(getUserGroupsAsync(currentUser.user_id));
    
    itemNameRef.current.value = "";

    setSelectedFriends([]);
    const checkboxes = document.querySelectorAll('.add-events-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
  };
    

  const handleDeleteButton = () => {
    const groupToDelete = groupsList.find(group => group.name === deleteGroupName);
    if (!groupToDelete) {
      alert("Group with the specified name does not exist!");
      return;
    }
    dispatch(deleteUserGroupAsync(groupToDelete));
    setDeleteGroupName('');
  };

const handleFormReset = () => {
  itemNameRef.current.value = "";
  setSelectedFriends([]);

  const checkboxes = document.querySelectorAll('.add-events-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
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
        <div>
        <label>Select Group Members:</label>
        <br />
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
            {friendNames[index] || 'Loading...'}
            <br />
          </label>
        ))}
      </div> <br/>
      <div style={{ justifyContent: "left" }}>
          <input className="AvailabilityButton3" type="submit" id="submitButton" value="Add" />
        </div>
        <br /> 
      <hr/> 
      <br /> 
       <label htmlFor="deleteGroupName">Group Name to Delete:</label>
        <br />
        <input
          type="text"
          id="deleteGroupName"
          name="deleteGroupName"
          value={deleteGroupName}
          onChange={(e) => {setDeleteGroupName(e.target.value);}}
        />
        <br /><br /> 

        <div style={{ justifyContent: "left" }}>
          <input className="AvailabilityButton5" type="button" id="deleteButton" value="Delete Group" onClick={handleDeleteButton} />
        </div>
        
        <br />
        <hr /> <br />
      </form>
    </div>
  );
}
