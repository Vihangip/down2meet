

const getUsers = async () => {
    const res = await fetch(`https://down2meet.onrender.com/users`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}

const getOneUser = async (userID) => {
    const res = await fetch(`https://down2meet.onrender.com/users/${userID}`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();

    if (!res.ok) {
        throw new Error("User not found."); // Throw an error if the response is not successful
      }
    

    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const addUsers = async (user) => {
    const res = await fetch(`https://down2meet.onrender.com/users`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });
    console.log("account added");
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteUsers = async (userID) => {
    const res = await fetch(`https://down2meet.onrender.com/users/${userID}`,
    {
        method: "DELETE",
        credentials: 'include',
    });
    const data = await res.text();
    return data;
}

const getFriends = async (user_id) => {
  const res = await fetch(`https://down2meet.onrender.com/users/${user_id}/friends`,
  {
      method: "GET",
      credentials: 'include',
  });
  const data = await res.json();
  return data;
}

const getHangouts = async (user_id) => {
  const res = await fetch(`https://down2meet.onrender.com/users/${user_id}/hangouts`,
  {
      method: "GET",
      credentials: 'include',
  });
  const data = await res.json();
  console.log("hangouts from service: " + data);
  return data;
}

const addUserPost = async (userID, postID) => {
    const res = await fetch(`https://down2meet.onrender.com/users/${userID}/posts/${postID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({}),
    });
  
    if (res.status >= 400) {
      const data = await res.json();
      throw new Error(data.errors);
    }
  
    console.log("Post added successfully");
  };

  const addUserEvent = async (userID, eventID) => {
    const res = await fetch(`https://down2meet.onrender.com/users/${userID}/events/${eventID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({}),
    });
  
    if (res.status >= 400) {
      const data = await res.json();
      throw new Error(data.errors);
    }
  
    console.log("Event added successfully");
  }

  const getSessionUser = async () => {
    const res = await fetch(`https://down2meet.onrender.com/session`,
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
    });
    const data = await res.json();
    // console.log(data);
    localStorage.setItem('user', JSON.stringify(data));
    //TODO !!!!!!!!!!
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

async function addFriend(userId, friendId) {
    const response = await fetch(`https://down2meet.onrender.com/users/${userId}/addFriend`, {
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
    const response = await fetch(`https://down2meet.onrender.com/users/${userId}/removeFriend`, {
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

  

export default {
    getUsers, addUsers, deleteUsers, getOneUser, addUserPost, addUserEvent, getSessionUser, getFriends, getHangouts, addFriend, removeFriend, getFriends
}