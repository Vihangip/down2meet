import { NavLink } from "react-router-dom";
import React, {useState} from 'react';
import logo from '../assets/D2MLogo.png';
import logo1265 from '../assets/logo-notext.png';
import { GoogleLogin } from '@react-oauth/google';
import '../css/navigation.css';
import { useDispatch } from 'react-redux';
//import { updateUserProfile } from '../actions/actions';
import { addUsersAsync, getOneUserAsync } from '../redux/user/thunks';


export default function Navbar() {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [dummyUser, setDummyUser] = useState('');


    // when users successfully login
    const responseMessage = (response) => {
      const idToken = response.credential;
      const encodedPayload = idToken.split('.')[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));

      const name = decodedPayload.name;
      const email = decodedPayload.email;
      const picture = "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
      // decodedPayload.picture;

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

      setEmail(email);
      setDummyUser(user);
      dispatch(getOneUserAsync(email));
      //dispatch(updateUserProfile(user));
      //console.log(response);
    };
    // when users don't successfully login
    const errorMessage = (error) => {
        console.log(error);
        setShowPopup(true); // Show the pop-up when there's an error
      };

    const handleSignInClick = () => {
        setShowPopup(false); // Hide the pop-up when user clicks on "Sign In"
      };

    const handleCreateAccountClick = () => {
        dispatch(addUsersAsync(dummyUser)).then(() => {
            dispatch(getOneUserAsync(email));
        }); // Dispatch the action to create the user account
        setShowPopup(false); // Hide the pop-up when user clicks on "Create Account"
      };

    

    return (
        <nav className="Navbar">
            <div className="topnav">
                        <a href="/" className="brand-logo">
                            <img src={logo} alt="Logo" className="logo-image" />
                        </a>
                        <a href="/" className="brand-logo2">
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
                {showPopup && (
                    <div className="popup">
                    <div className="popup-content">
                        <h2>User Not Found</h2>
                        <p>No user account found. Please create an account.</p>
                        <button onClick={handleSignInClick}>Sign In</button>
                        <button onClick={handleCreateAccountClick}>Create Account</button>
                    </div>
                    </div>
                )}
            </div>
            <div className="botnav">
                {/* using tutorial for GoogleLogin from: https://blog.logrocket.com/guide-adding-google-login-react-app/ */}
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button"/>
            </div>
         </nav>
    );
}