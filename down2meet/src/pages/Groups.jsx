
import BodyHeader from '../components/BodyHeader';
import React from 'react';
import { AddGroup } from '../components/addGroup';
import Groups from '../components/Groups';

import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync } from '../redux/user/thunks';

function Group() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        await dispatch(getSessionUserAsync());
        // await dispatch(getPostsAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostsAndUsers();
  }, [dispatch]);

  return (
    <>
      <div className="Body-Left">
        <Navbar />
      </div>
      <div className="Body-Middle">
        <div className="Groups">
          <BodyHeader title={"Groups"} />
          <div><AddGroup/></div> 
          <div><Groups/></div>
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

export default Group;