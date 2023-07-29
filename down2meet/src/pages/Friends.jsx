import React from 'react';
import BodyHeader from '../components/BodyHeader';
import { useEffect } from 'react';
import { setUser } from '../redux/user/reducer';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync, getFriendsAsync } from '../redux/user/thunks';


import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';

import Friend from '../components/Friend';


function Friends() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser)); // Initialize the user state with the stored data
        } else {
        await dispatch(getSessionUserAsync());
        //const user = useSelector(state => state.users.user);
        // await dispatch(getPostsAsync());
        }
        await dispatch(getFriendsAsync(JSON.parse(localStorage.getItem('user')).user_id));
        
        console.log("Friends, getFriendsAsync");
        console.log("storedUser: ", storedUser);
        console.log("sessionUser: ", )
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <>
    <div className="Body-Left">
      <Navbar />
    </div>
    <div className="Body-Middle">
    <div className="Friends">
    <BodyHeader title={"Friends"}/>

      <div className="FriendsPage">
        <div>
      {/* {sortedData.map((friend, index) => ( */}
        <Friend
          // key={index}
          // name={friend.name}
          // profilepic={friend.profilepic}
          // availability={friend.availability}
          // onRemove={() => handleRemoveFriend(index)}
        />
      {/* ))} */}
      </div>
    </div>
    </div>
    </div>
      <div className="Body-Right">
        <ButtonAvailable />
        <Search />
        {/* <ActiveUsers /> */}
        </div>
      </>
  );
}

export default Friends;

