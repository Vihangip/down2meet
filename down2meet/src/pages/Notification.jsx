import React from 'react';
import Navbar from '../components/Navbar';
import ButtonAvailable from '../components/ButtonAvailable';
import Search from '../components/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSessionUserAsync } from '../redux/user/thunks';


export default function Notifications() {

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
        <div>
          <h1>Welcome to the Notifications Page</h1>
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
