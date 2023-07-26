import React, {useEffect} from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { useDispatch} from 'react-redux';
import { getOneUserAsync, addUsersAsync, getSessionUserAsync } from '../redux/user/thunks';
// import { loginUserAsync } from '../redux/loginOut/thunks';
// import { setUser } from '../redux/user/reducer';
// import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';

export default function LoginPage() {
  //const dispatch = useDispatch();

  // const navigate = useNavigate();

  // const responseMessage = async (response) => {
  //   console.log(response)
  //   try {
  //     const idToken = response.credential; // Verify the structure of the response object
  //     if (!idToken) {
  //       throw new Error('No idToken found in the response');
  //     }


  //     const encodedPayload = idToken.split('.')[1];
  //     const decodedPayload = JSON.parse(atob(encodedPayload));
  //     const name = decodedPayload.name;
  //     const email = decodedPayload.email;
  //     const picture = decodedPayload.picture;

  //     console.log('Hey, ' + name);

  //     const user = {
  //       user_id: email,
  //       name: name,
  //       picture: picture,
  //       friends: [],
  //       groups: [],
  //       events: [],
  //       availability: false,
  //     };

  //     // Attempt to retrieve user information
  //     dispatch(getOneUserAsync(email))
  //       .then((action) => {
  //         if (action.type === 'users/getOneUserAsync/fulfilled') {
  //           const existingUser = action.payload;
  //           console.log('Existing user found:', existingUser);
  //           dispatch(setUser(existingUser));
  //           navigate('/Home');
  //         } else if (action.type === 'users/getOneUserAsync/rejected') {
  //           console.log('User not found. Creating account...');
  //           dispatch(addUsersAsync(user))
  //             .then(() => {
  //               console.log('Account created successfully');
  //               dispatch(getOneUserAsync(email)).then((action) => {
  //                 console.log(action);
  //                 if (action.type === 'users/getOneUserAsync/fulfilled') {
  //                   const existingUser = action.payload;
  //                   console.log('Existing user found:', existingUser);
  //                   dispatch(setUser(existingUser));
  //                   navigate('/Home');
  //                 } else {
  //                   console.log('User still not found after account creation');
  //                 }
  //               });
  //             })
  //             .catch((error) => {
  //               console.log('Account creation failed:', error);
  //             });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log('User information retrieval failed:', error);
  //       });
  //   } catch (error) {
  //     console.log('Error occurred during authentication:', error);
  //   }
  
  // };

  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin} className='google-login-button'> Login with Google</button>
      <a href="http://localhost:3001/auth/google">Login</a>
      {/* <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
        className="google-login-button"
        buttonText="Sign in with Google"
      /> */}
    </div>
  );
}
