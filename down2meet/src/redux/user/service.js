import { setUser } from "./reducer";


const getUsers = async () => {
    const res = await fetch(`http://localhost:3001/users`,
    {
        method: "GET",
        credentials: 'include'
    });
    const data = await res.json();
    return data;
}

const getOneUser = async (userID) => {
    console.log(userID);
    const res = await fetch(`http://localhost:3001/users/${userID}`,
    {
        method: "GET",
        credentials: 'include'
    });
    const data = await res.json();

    // console.log(res.status);
    if (!res.ok) {
        throw new Error("User not found."); // Throw an error if the response is not successful
      }
    

    //TODO !!!!!!!!!!
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const addUsers = async (user) => {
    const res = await fetch(`http://localhost:3001/users`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: 'include'
    });
    console.log("account added");
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteUsers = async (userID) => {
    const res = await fetch(`http://localhost:3001/users/${userID}`,
    {
        method: "DELETE",
        credentials: 'include'
    });
    const data = await res.text();
    return data;
}

const addUserPost = async (userID, postID) => {
    const res = await fetch(`http://localhost:3001/users/${userID}/posts/${postID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      credentials: 'include'
    });
  
    if (res.status >= 400) {
      const data = await res.json();
      throw new Error(data.errors);
    }
  
    console.log("Post added successfully");
  };

  const getSessionUser = async () => {
    const res = await fetch(`http://localhost:3001/session`,
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
    });
    const data = await res.json();
    console.log(data);

    //TODO !!!!!!!!!!
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const logoutUser = async() => {
    const res = await fetch(`http://localhost:3001/auth/logout`,
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

async function addFriend(userId, friendId) {
    const response = await fetch(`/users/${userId}/addFriend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ friendId })
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
  }
  
  async function removeFriend(userId, friendId) {
    const response = await fetch(`/users/${userId}/removeFriend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ friendId })
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
  }

  const getFriends = async (user_id) => {
    const res = await fetch(`http://localhost:3001/users/${user_id}/friends`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}
  

export default {
    getUsers, addUsers, deleteUsers, getOneUser, addUserPost, getSessionUser, logoutUser, addFriend, removeFriend, getFriends
}