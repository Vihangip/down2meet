import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { getOneUserAsync, addUsersAsync } from '../redux/user/thunks';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    const idToken = response.credential;
    const encodedPayload = idToken.split('.')[1];
    const decodedPayload = JSON.parse(atob(encodedPayload));

    const name = decodedPayload.name;
    const email = decodedPayload.email;
    const picture = decodedPayload.picture;

    console.log('Hey, ' + name);

    const user = {
      user_id: email,
      name: name,
      picture: picture,
      friends: [],
      groups: [],
      events: [],
      availability: false,
    };

    // Attempt to retrieve user information
    dispatch(getOneUserAsync(email))
      .then((action) => {
        if (action.type === 'users/getOneUserAsync/fulfilled') {
          // User information retrieval successful
          const existingUser = action.payload;
          console.log('Existing user found:', existingUser);
          navigate('/Home');
          // Proceed with sign-in or other necessary logic
        } else if (action.type === 'users/getOneUserAsync/rejected') {
          // User information retrieval unsuccessful
          console.log('User not found. Creating account...');
          // Dispatch the addUsersAsync action to add the user to the database
          dispatch(addUsersAsync(user))
            .then(() => {
              // Account creation successful
              console.log('Account created successfully');
              dispatch(getOneUserAsync(email));
              navigate('/Home');
              // Proceed with sign-in or other necessary logic
            })
            .catch((error) => {
              // Account creation unsuccessful
              console.log('Account creation failed:', error);
              // Handle account creation error and inform the user
            });
        }
      })
      .catch((error) => {
        console.log('User information retrieval failed:', error);
        // Handle user information retrieval error, if necessary
      });
  };

  const errorMessage = (error) => {
    console.log(error);
    // Show the pop-up when there's an error
  };

  return (
    <div>
      <h1>Login Page</h1>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
        className="google-login-button"
        buttonText="Sign in with Google"
      />
    </div>
  );
}
