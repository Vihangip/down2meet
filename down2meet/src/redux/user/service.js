//require('dotenv').config();

const getUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}

const getOneUser = async (userID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userID}`,
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
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteUsers = async (userID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userID}`,
    {
        method: "DELETE",
        credentials: 'include',
    });
    const data = await res.text();
    return data;
}

const getFriends = async (user_id) => {
  const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${user_id}/friends`,
  {
      method: "GET",
      credentials: 'include',
  });
  const data = await res.json();
  return data;
}

const getHangouts = async (user_id) => {
  const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${user_id}/hangouts`,
  {
      method: "GET",
      credentials: 'include',
  });
  const data = await res.json();
  return data;
}

const addUserPost = async (userID, postID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userID}/posts/${postID}`, {
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
  
  };

  const addUserEvent = async (userID, eventID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userID}/events/${eventID}`, {
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
  
  }

  const getSessionUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/session`,
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
    });
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data));
    //TODO !!!!!!!!!!
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

async function addFriend(userId, friendId) {
    const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${userId}/addFriend`, {
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
    const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${userId}/removeFriend`, {
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



    const getUserGroup = async (user_id) => {
        const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${user_id}/groups`,
        {
            method: "GET",
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    }

    const addUserGroup = async (group) => {
      const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${group.user_id}/addGroup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(group),
        credentials: 'include',

      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    };

    const removeHangoutsForFriends = async (post_id) => {
        const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${post_id}/remove-from-hangouts`, {
          method: "PUT",
          credentials: 'include',
        });
    
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
    
        const data = await res.text();
        return data;
      
    };


    const saveApprovedFriends = async (userId, approvedFriends) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userId}/approvedFriends`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ friendsIds: approvedFriends }),
        });
        const data = await res.json();
        console.log('Response:', data); // Log the response data
    
        if (res.status >= 400) {
          throw new Error(data.errors);
        }
    
        return data;
      } catch (error) {
        console.error('Error calling saveApprovedFriends:', error); // Log the error details
        throw error;
      }
    };

    const getApprovedFriends = async (userId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL3001}/users/${userId}/approvedfriends`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (response.status >= 400) {
          throw new Error('Error fetching approved friends');
        }
        
        const data = await response.json();
        return data; // Assuming data contains the approved friends
      } catch (error) {
        console.error('Error fetching approved friends:', error);
        throw error;
      }
};

const getUserByUserId = async (user_id) => {
  console.log(user_id);
  const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${user_id}`, {
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
};

    
    const addParticipantToPost = async (postID, userID) => {
      const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${postID}/addParticipant/${userID}`,
      {
          method: "GET",
          credentials: 'include',
      });
      const data = await res.text();
      return data;
  }
  
  const removeParticipantFromPost = async (postID, userID) => {
      const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${postID}/removeParticipant/${userID}`,
      {
          method: "GET",
          credentials: 'include',
      });
      const data = await res.text();
      return data;
  }

  const getAvailability = async (userID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userID}/availability`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.text();
    return data;
}

const changeUserAvailability = async (userID, availability) => {
  const res = await fetch(`${process.env.REACT_APP_URL3001}/users/${userID}/availability`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ availability }),
  });
  if (!res.ok) {
    // Handle error
    console.error('Error updating user availability');
  } 
  const data = await res.text();
  console.log("server data : "+ data);
  return data;
}
  

export default {
    getUsers, addUsers, deleteUsers, getOneUser, addUserPost, getSessionUser, addFriend, removeFriend, 
    getUserGroup, addUserGroup, getHangouts, addUserEvent, getFriends, removeHangoutsForFriends, addParticipantToPost, removeParticipantFromPost,
    getAvailability, changeUserAvailability, saveApprovedFriends, getApprovedFriends, getUserByUserId
}