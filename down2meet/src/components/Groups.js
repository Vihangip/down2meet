


import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserGroupsAsync } from '../redux/user/thunks';
import service from '../redux/user/service';

export default function Groups(props) {
  const groupsList = useSelector(state => state.users.groupList);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    dispatch(getUserGroupsAsync(currentUser.user_id))
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching groups:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    // Fetch and resolve all user names asynchronously for each group's members
    Promise.all(groupsList.map(group => getGroupData(group)))
      .then(data => setGroupData(data))
      .catch(error => console.error(error));
  }, [groupsList]);

  // Function to fetch data for each group (including member names) based on group object
  const getGroupData = async (group) => {
    try {
      // Fetch the member names based on their user IDs
      const memberNames = await Promise.all(group.members.map(userid => service.getOneUser(userid).then(user => user.name)));
      return { ...group, members: memberNames };
    } catch (error) {
      return group;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {groupData.map((group) => (
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
}




