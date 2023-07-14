import { NavLink } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import logo from '../assets/D2MLogo.png';
import logo1265 from '../assets/logo-notext.png';
import { GoogleLogin } from '@react-oauth/google';
import '../css/navigation.css';
import { useDispatch, useSelector } from 'react-redux';
//import { updateUserProfile } from '../actions/actions';
import { addUsersAsync, getOneUserAsync } from '../redux/user/thunks';
import { setUserNotFound } from '../redux/user/reducer';


export default function Navbar() {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const [dummyUser, setDummyUser] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);

    const isUserNotFound = useSelector(state => state.isUserNotFound);
  
    useEffect(() => {
      if (isUserNotFound) {
        setUserEmail('');
      }
    }, [isUserNotFound]);

    // when users successfully login
    const responseMessage = async(response) => {
      const idToken = response.credential;
      const encodedPayload = idToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));

      const name = decodedPayload.name;
      const email = decodedPayload.email;
      const picture = decodedPayload.picture;

      console.log("Hey, " + name);

      const user = {
        user_id: email,
        name: name,
        picture: picture,
        friends: [],
        groups: [],
        events: [],
        availability: false,
      }

      setUserEmail(email);
      setDummyUser(user);
      dispatch(getOneUserAsync(userEmail)).then(() => {
        console.log(isUserNotFound);
      });
      
      
      //dispatch(updateUserProfile(user));
      //console.log(response);
    };
    // when users don't successfully login
    const errorMessage = (error) => {
        console.log(error);
         // Show the pop-up when there's an error
      };


      const handleCreateAccount = () => {
        const user = dummyUser;
    
        dispatch(addUsersAsync(user));
        dispatch(setUserNotFound(false));
        setAccountCreated(true);
        // .then(() => {
        //   dispatch(getOneUserAsync(userEmail));
        //   setAccountCreated(true);
        //   setTimeout(() => {
        //     setAccountCreated(false);
        //   }, 5000); // Set the timer for 5 seconds
        // });
      };
    
    const mobileButton = () => {
      console.log("hi");
    };
    

    return (
        <nav className="Navbar">
            <div className="topnav">
                        <a href="/" className="brand-logo">
                            <img src={logo} alt="Logo" className="logo-image" />
                        </a>
                        <a onClick={mobileButton} className="brand-logo2">
                            <img src={logo1265} alt="Logo" className="logo-image2" />
                        </a>
                        

                        <div className="Navbar-line">
                        </div>

                        <div className="Navbar-Links">
                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="/">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-house"></i>
                            </div>
                            <p>Home</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="/Profile">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <p>Profile</p>
                        </NavLink>
                        
                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="/Friends">
                            <div className="Social-Icon">
                            <i class="fa-solid fa-user-group"></i>
                            </div>
                            <p>Friends</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="/Events">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-calendar-days"></i>
                            </div>
                            <p>Events</p> 
                        </NavLink>
                
                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="/Groups">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-people-group"></i>
                            </div>
                            <p>Groups</p>
                        </NavLink>

                        <NavLink className="Social-Option"
                        activeClassName="Social-Option-Active"
                        exact
                        to="">
                            <div className="Social-Icon">
                                <i className="fa-solid fa-bell"></i>
                            </div>
                            <p>Notifications</p>
                        </NavLink>
                        </div>

                            {/* Pop-up */}

            </div>
            <div className="botnav">
                {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button"/>
            </div>
            {dummyUser && !accountCreated && (
      <div className="popup">
        <div className="popup-content">
          <h2>Create Account</h2>
          <p>No user account found. Please create an account.</p>
          <button onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>
    )}
    {accountCreated && (
      <div className="popup">
        <div className="popup-content">
          <h2>Account is created and Signed in</h2>
          <p>Your account has been successfully created and signed in.</p>
        </div>
      </div>
    )}
         </nav>
    );
}