//require('dotenv').config();

const logoutUser = async() => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/auth/logout`,
    {
        method:"GET",
        credentials: 'include',

    });

  if (res.status >= 400) {
    throw new Error("Logout failed");
  }

  console.log("Logout successful");
  window.location.href = '/';

}

// const loginUser = async() => {
//     const res = await fetch(`${process.env.REACT_APP_URL3001}/auth/google`,
//     {
//         method:"GET",
//     });

//   if (res.status >= 400) {
//     throw new Error("Login failed");
//   }
//   console.log("Login successful");
// }

export default {
    logoutUser
}