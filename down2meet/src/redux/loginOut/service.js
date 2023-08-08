

const logoutUser = async() => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/auth/logout`,
    {
        method:"GET",
        credentials: 'include',

    });

  if (res.status >= 400) {
    throw new Error("Logout failed");
  }

  window.location.href = '/';

}

export default {
    logoutUser
}