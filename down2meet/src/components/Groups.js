// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { getUserGroupsAsync } from '../redux/user/thunks';
// import service from '../redux/user/service'; // Replace this with the actual user service file import

// export default function Groups(props) {
//   const groupsList = useSelector(state => state.users.groupList);
//   const uniqueGroupList = Array.from(new Set(groupsList));
//   const currentUser = useSelector((state) => state.users.user);
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(true);
//   const [groupNames, setFriendNames] = useState([]);

//   useEffect(() => {
//     dispatch(getUserGroupsAsync(currentUser.user_id))
//       .then(() => setIsLoading(false))
//       .catch((error) => {
//         console.error("Error fetching groups:", error);
//         setIsLoading(false);
//       });
//   }, [dispatch, currentUser.user_id]);

//   useEffect(() => {
//     // Fetch and resolve all user names asynchronously
//     Promise.all(uniqueGroupList.map(group => getGroupMembersNames(group.members)))
//       .then(names => setFriendNames(names))
//       .catch(error => console.error(error));
//   }, [groupsList]);

//   // Function to fetch names of group members based on their user IDs
//   const getGroupMembersNames = async (userIds) => {
//     try {
//       const userNames = await Promise.all(userIds.map(userid => service.getOneUser(userid).then(user => user.name)));
//       return userNames;
//     } catch (error) {
//       console.log(error.message);
//       return [];
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }


//   return (
//     <div>
//       {uniqueGroupList.map((group) => (
//         <div key={group.id}>
//           <h4>{group.name}</h4>
//           <p>
//             {groupNames[group.id]?.map((name, index) => (
//               <span key={name}>
//                 {name}
//                 {index !== groupNames[group.id].length - 1 && <br />}
//               </span>
//             ))}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }



// // import { useSelector, useDispatch } from 'react-redux';
// // import { useEffect, useState } from 'react';
// // import { getUserGroupsAsync } from '../redux/user/thunks';

// // export default function Groups(props) {
// //   const groupsList = useSelector(state => state.users.groupList);
// //   const currentUser = useSelector((state) => state.users.user);
// //   const dispatch = useDispatch();

// //   const [isLoading, setIsLoading] = useState(true);
// //   const [groupNames, setFriendNames] = useState([]);

// //   // Create a new array containing only unique groups based on group.name
// //   const uniqueGroupList = Array.from(new Set(groupsList));

// //   useEffect(() => {
// //     dispatch(getUserGroupsAsync(currentUser.user_id))
// //       .then(() => setIsLoading(false))
// //       .catch((error) => {
// //         console.error("Error fetching groups:", error);
// //         setIsLoading(false);
// //       });
// //   }, [dispatch, currentUser.user_id]);

// //   useEffect(() => {
// //   // Fetch and resolve all user names asynchronously
// //   Promise.all(uniqueGroupList.map(group => getUserNameByID(group)))
// //     .then(names => setFriendNames(names))
// //     .catch(error => console.error(error));
// //   }, []);

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   const getUserNameByID = async (userid) => {
// //     try {
// //       const user = await service.getOneUser(userid);

// //       return user.name;
// //     } catch (error) {
// //       console.log(error.message);
// //       return;
// //     }
// //   };
  
// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       {uniqueGroupList.map((group) => (
// //         <div key={group.id}>
// //           <h4>{group.name}</h4>
// //           <p>
// //             {group.members.map((member, index) => (
// //               <span key={member}>
// //                 {member}
// //                 {index !== group.members.length - 1 && <br />}
// //               </span>
// //             ))}
// //           </p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserGroupsAsync } from '../redux/user/thunks';
import service from '../redux/user/service';

export default function Groups(props) {
  const groupsList = useSelector(state => state.users.groupList);
  const currentUser = useSelector((state) => state.users.user);
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
  }, [dispatch, currentUser.user_id]);

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
      console.log(error.message);
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




