import { deleteEventAsync } from "../redux/event/thunks";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// create cards for each group


export default function Groups(props) {
    let groupsList = useSelector(state => state.users.groupList);
  
    // Create a new array containing only unique groups based on group.name
    // const uniqueGroupList = groupList.reduce((acc, group) => {
    //   // Check if the current group's name already exists in the accumulator array
    //   if (!acc.find(item => item.name === group.name)) {
    //     acc.push(group);
    //   }
    //   return acc;
    // }, []);
    const uniqueGroupList = Array.from(new Set(groupsList));   


    
    return (
      <div>
        {uniqueGroupList.map((group) => (
          <div key={group.id}>
            <h4>{group.name}</h4>
            <p>
              {group.members.map((member, index) => (
                <span key={member}>
                  {member}
                  {index !== group.members.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    );
  };
  